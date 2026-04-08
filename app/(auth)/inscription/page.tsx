"use client"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRegisterMutation } from "@/hooks/auth/use-auth-mutations"
import { zodResolver } from "@hookform/resolvers/zod"
import { differenceInYears } from "date-fns"
import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, Check, CheckCircle, ChevronLeft, ChevronRight, Loader2, MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"
import { z } from "zod"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { countries } from "@/lib/countries"

// ─── Types ────────────────────────────────────────────────────────────────────
type CityOption = { value: string; label: string }

// ─── Zod Schema ───────────────────────────────────────────────────────────────
const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/

const formSchema = z
  .object({
    // Step 1
    firstName: z
      .string()
      .min(2, "Le prénom doit contenir au moins 2 caractères")
      .regex(nameRegex, "Le prénom ne doit pas contenir de chiffres ou caractères spéciaux"),

    lastName: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères")
      .regex(nameRegex, "Le nom ne doit pas contenir de chiffres ou caractères spéciaux"),

    birthDate: z
      .string()
      .min(1, "La date de naissance est requise")
      .refine((val) => {
        if (!val) return false
        const age = differenceInYears(new Date(), new Date(val))
        return age >= 18
      }, "Vous devez avoir au moins 18 ans")
      .refine((val) => {
        if (!val) return false
        const age = differenceInYears(new Date(), new Date(val))
        return age <= 120
      }, "Date de naissance invalide"),

    birthPlace: z
      .string()
      .min(2, "Le lieu de naissance est requis")
      .regex(nameRegex, "Le lieu de naissance ne doit pas contenir de chiffres ou caractères spéciaux"),

    // Step 2
    nationality: z.string().min(1, "La nationalité est requise"),
    city: z.string().min(1, "La commune est requise"),

    // Step 3
    email: z.string().email("Adresse email invalide"),

    phone: z
      .string()
      .regex(
        /^(\+225|00225)?[0-9]{10}$/,
        "Numéro invalide — format attendu : 0700000000 ou +2250700000000"
      ),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(/[A-Z]/, "Au moins une majuscule requise")
      .regex(/[0-9]/, "Au moins un chiffre requis")
      .regex(/[^a-zA-Z0-9]/, "Au moins un caractère spécial requis"),

    confirmPassword: z.string().min(1, "La confirmation du mot de passe est requise"),

    // Step 4
    idType: z.string().min(1, "Le type de pièce d'identité est requis"),

    idNumber: z
      .string()
      .min(8, "Le numéro de pièce doit contenir au moins 8 caractères")
      .max(20, "Le numéro de pièce est trop long"),

    // Step 5
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
    acceptDataPolicy: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter la politique de confidentialité",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

// ─── Steps config ─────────────────────────────────────────────────────────────
const steps = [
  {
    id: 1,
    title: "Informations personnelles",
    description: "Vos informations de base",
    fields: ["firstName", "lastName", "birthDate", "birthPlace"] as const,
  },
  {
    id: 2,
    title: "Localisation",
    description: "Nationalité et commune",
    fields: ["nationality", "city"] as const,
  },
  {
    id: 3,
    title: "Contacts & Sécurité",
    description: "Email, téléphone et mot de passe",
    fields: ["email", "phone", "password", "confirmPassword"] as const,
  },
  {
    id: 4,
    title: "Justificatifs",
    description: "Pièce d'identité",
    fields: ["idType", "idNumber"] as const,
  },
  {
    id: 5,
    title: "Validation",
    description: "Consentements finaux",
    fields: ["acceptTerms", "acceptDataPolicy"] as const,
  },
]

type FormValues = z.infer<typeof formSchema>
type FieldName = keyof FormValues

// ─── Component ────────────────────────────────────────────────────────────────
export default function InscriptionPage() {
  const router = useRouter()
  const registerMutation = useRegisterMutation()
  const { toast } = useToast()

  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  // City state
  const [cities, setCities] = useState<CityOption[]>([])
  const [loadingCities, setLoadingCities] = useState(false)
  const [citiesError, setCitiesError] = useState("")

  // Reactive step validity for button disable
  const [isStepValid, setIsStepValid] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      birthDate: "",
      birthPlace: "",
      nationality: "",
      city: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      idType: "",
      idNumber: "",
      acceptTerms: false,
      acceptDataPolicy: false,
    },
  })

  const { formState } = form

  // Watch all form values reactively
  const watchedValues = useWatch({ control: form.control })

  // ── Recompute step validity on every change ──────────────────────────────────
  useEffect(() => {
    const currentStepFields = steps.find((s) => s.id === currentStep)?.fields ?? []

    const hasNoErrors = currentStepFields.every(
      (field) => !formState.errors[field as FieldName]
    )

    const allFilled = currentStepFields.every((field) => {
      const value = watchedValues[field as FieldName]
      if (typeof value === "boolean") return value === true
      return value !== "" && value !== undefined && value !== null
    })

    setIsStepValid(hasNoErrors && allFilled)
  }, [watchedValues, formState.errors, currentStep])

  // ── Fetch cities from CountriesNow API ───────────────────────────────────────
  const fetchCities = useCallback(
    async (countryLabelEn: string) => {
      setLoadingCities(true)
      setCitiesError("")
      setCities([])
      form.setValue("city", "")

      try {
        const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: countryLabelEn }),
        })

        if (!res.ok) throw new Error("Réponse API invalide")

        const data = await res.json()

        if (data.error || !data.data || data.data.length === 0) {
          setCitiesError("Aucune ville trouvée pour ce pays.")
          return
        }

        const formatted: CityOption[] = (data.data as string[])
          .sort((a, b) => a.localeCompare(b))
          .map((city) => ({
            value: city.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
            label: city,
          }))

        setCities(formatted)
      } catch (e) {
        console.error("Erreur chargement villes:", e)
        setCitiesError("Impossible de charger les villes. Veuillez réessayer.")
      } finally {
        setLoadingCities(false)
      }
    },
    [form]
  )

  // ── Step navigation ──────────────────────────────────────────────────────────
  const nextStep = async () => {
    const currentStepFields = steps.find((s) => s.id === currentStep)?.fields ?? []
    const isValid = await form.trigger(currentStepFields as FieldName[])
    if (isValid && currentStep < steps.length) {
      setCurrentStep((s) => s + 1)
      toast({ title: "Étape suivante", description: "Veuillez remplir la prochaine étape" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1)
  }

  const isStepCompleted = (stepId: number) => {
    const stepFields = steps.find((s) => s.id === stepId)?.fields ?? []
    return stepFields.every((field) => {
      const value = form.getValues(field as FieldName)
      if (typeof value === "boolean") return value === true
      return value !== "" && value !== undefined
    })
  }

  // ── Submit ───────────────────────────────────────────────────────────────────
  async function onSubmit(values: FormValues) {
    setError("")
    try {
      const response = await registerMutation.mutateAsync(values)

      sessionStorage.setItem(
        "pendingRegistration",
        JSON.stringify({
          // @ts-ignore
          email: response.email,
          // @ts-ignore
          userId: response.userId,
        })
      )

      toast({ title: "Succès", description: "Inscription réussie !" })
      setTimeout(() => router.push("/verification-otp"), 3000)
    } catch (err: any) {
      console.error(err)
      const msg = err?.message || "Une erreur est survenue lors de l'inscription."
      setError(msg)
      toast({ title: "Erreur", description: msg, variant: "destructive" })
    }
  }

  // ── Password strength ────────────────────────────────────────────────────────
  const passwordValue = form.watch("password")

  const getPasswordStrength = (pwd: string) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^a-zA-Z0-9]/.test(pwd)) score++
    return score
  }

  const pwdStrength = getPasswordStrength(passwordValue)
  const pwdStrengthLabel = ["", "Faible", "Moyen", "Bon", "Fort"][pwdStrength]
  const pwdStrengthColor = ["", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-500"][pwdStrength]

  // ── Render step content ──────────────────────────────────────────────────────
  const renderStepContent = () => {
    switch (currentStep) {

      // ── Step 1 : Infos personnelles ──────────────────────────────────────────
      case 1:
        return (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nom *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Prénom *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Date de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                          .toISOString()
                          .split("T")[0]}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Lieu de naissance *</FormLabel>
                    <FormControl>
                      <Input {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      // ── Step 2 : Localisation ────────────────────────────────────────────────
      case 2:
        return (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Nationalité *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        const selected = countries.find((c) => c.value === value)
                        if (selected?.labelEn) fetchCities(selected.labelEn)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Sélectionnez votre nationalité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {countries.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Commune / Ville *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loadingCities || cities.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:opacity-60 disabled:cursor-not-allowed">
                          {loadingCities ? (
                            <span className="flex items-center gap-2 text-gray-400">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Chargement...
                            </span>
                          ) : (
                            <SelectValue
                              placeholder={
                                citiesError
                                  ? "Erreur de chargement"
                                  : cities.length === 0
                                  ? "Sélectionnez d'abord un pays"
                                  : "Sélectionnez votre ville"
                              }
                            />
                          )}
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-60">
                        {cities.length > 0 ? (
                          cities.map((city) => (
                            <SelectItem key={city.value} value={city.value}>
                              {city.label}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-3 text-sm text-gray-400 text-center flex items-center justify-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {citiesError || "Sélectionnez d'abord un pays"}
                          </div>
                        )}
                      </SelectContent>
                    </Select>

                    {citiesError && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {citiesError}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {loadingCities && (
              <motion.div
                className="flex items-center gap-2 text-sm text-blue-500 bg-blue-50 px-3 py-2 rounded-lg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Récupération des villes en cours...
              </motion.div>
            )}

            {!loadingCities && cities.length > 0 && (
              <motion.div
                className="flex items-center gap-2 text-xs text-green-600 bg-green-50 px-3 py-2 rounded-lg"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <Check className="w-3 h-3" />
                {cities.length} ville{cities.length > 1 ? "s" : ""} disponible{cities.length > 1 ? "s" : ""}
              </motion.div>
            )}
          </motion.div>
        )

      // ── Step 3 : Contacts & Sécurité ─────────────────────────────────────────
      case 3:
        return (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Email *</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Téléphone mobile *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="0700000000 ou +2250700000000"
                        {...field}
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>

                    {/* Password strength bar */}
                    {passwordValue && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                i <= pwdStrength ? pwdStrengthColor : "bg-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${
                          pwdStrength <= 1 ? "text-red-500" :
                          pwdStrength === 2 ? "text-orange-500" :
                          pwdStrength === 3 ? "text-yellow-600" :
                          "text-green-600"
                        }`}>
                          Force : {pwdStrengthLabel}
                        </p>
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Confirmer mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Password requirements checklist */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 space-y-1.5">
              <p className="text-xs font-medium text-gray-600 mb-2">Le mot de passe doit contenir :</p>
              {[
                { rule: /.{8,}/, label: "Au moins 8 caractères" },
                { rule: /[A-Z]/, label: "Au moins une majuscule" },
                { rule: /[0-9]/, label: "Au moins un chiffre" },
                { rule: /[^a-zA-Z0-9]/, label: "Au moins un caractère spécial (ex: @, !, #)" },
              ].map(({ rule, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    rule.test(passwordValue) ? "bg-green-500" : "bg-gray-200"
                  }`}>
                    {rule.test(passwordValue) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-xs transition-colors duration-200 ${
                    rule.test(passwordValue) ? "text-green-600 line-through" : "text-gray-400"
                  }`}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )

      // ── Step 4 : Justificatifs ────────────────────────────────────────────────
      case 4:
        return (
          <motion.div className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Type de pièce d'identité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
                        <SelectItem value="passeport">Passeport</SelectItem>
                        <SelectItem value="permis">Permis de conduire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-normal">Numéro de pièce *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Min. 8 caractères"
                        className="py-3 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      // ── Step 5 : Validation ───────────────────────────────────────────────────
      case 5:
        return (
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        J'accepte les conditions générales d'utilisation *
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        En cochant cette case, vous acceptez nos conditions d'utilisation
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptDataPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-lg transition-all duration-200 hover:bg-gray-50">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm font-normal">
                        Je consens au traitement de mes données personnelles *
                      </FormLabel>
                      <p className="text-xs text-gray-500">
                        Conformément au RGPD, nous traitons vos données pour la création de votre compte
                      </p>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <>
      <div className="">
        <div className="relative z-10 pt-48 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.h1
              className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Inscrivez-vous pour rejoindre l'Espace Citoyen
            </motion.h1>
          </div>
        </div>

        <div className="flex justify-center px-4 pb-8">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mx-4">
              {/* Progress Indicator */}
              <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div className="flex items-center justify-between mb-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <motion.div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                          currentStep === step.id
                            ? "bg-blue-500 text-white"
                            : isStepCompleted(step.id)
                              ? "bg-green-500 text-white"
                              : currentStep > step.id
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {currentStep > step.id || isStepCompleted(step.id)
                          ? <Check className="w-5 h-5" />
                          : step.id}
                      </motion.div>
                      {index < steps.length - 1 && (
                        <div className={`w-12 h-1 mx-2 transition-all duration-300 ${currentStep > step.id ? "bg-green-500" : "bg-gray-200"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {steps.find((s) => s.id === currentStep)?.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {steps.find((s) => s.id === currentStep)?.description}
                  </p>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-50 text-red-500 p-3 rounded-md mb-6 text-sm flex items-center gap-2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </motion.div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[170px]"
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <motion.div
                    className="flex justify-between pt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 bg-transparent transition-all duration-200 hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid}
                        className="flex items-center gap-2 text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-blue-500"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStepValid || registerMutation.isPending}
                        className="flex items-center gap-2 bg-green-500 hover:bg-green-600 transition-all duration-200 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-green-500"
                      >
                        {registerMutation.isPending ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Création en cours...
                          </>
                        ) : (
                          <>
                            Créer mon compte
                            <Check className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </motion.div>
                </form>
              </Form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-black">
                  Vous avez déjà un compte ?{" "}
                  <Link href="/connexion" className="text-black font-bold underline hover:text-blue-600 transition-colors">
                    Connectez-vous
                  </Link>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Alert */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <AlertDialogTitle>Inscription réussie !</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)}>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertDialogTitle>Erreur d'inscription</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(false)}>Réessayer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}