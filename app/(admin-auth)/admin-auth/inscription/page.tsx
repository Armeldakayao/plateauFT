"use client"
import { z } from "zod"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  ChevronRight,
  ChevronLeft,
  Check,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  Settings,
  Upload,
  Loader2,
  MapPin,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useRegisterMutation } from "@/hooks/auth/use-auth-mutations"
import { differenceInYears } from "date-fns"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { countries } from "@/lib/countries"
import { useToast } from "@/hooks/use-toast"
import { BackgroundAnimated } from "../layout"

// ─── Types ────────────────────────────────────────────────────────────────────
type CityOption = { value: string; label: string }

// ─── Zod Schema (same strict rules as InscriptionPage) ───────────────────────
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

type FormValues = z.infer<typeof formSchema>
type FieldName = keyof FormValues

// ─── Steps config ─────────────────────────────────────────────────────────────
const steps = [
  {
    id: 1,
    title: "Informations personnelles",
    description: "Vos informations de base",
    fields: ["firstName", "lastName", "birthDate", "birthPlace"] as const,
    icon: Users,
  },
  {
    id: 2,
    title: "Localisation",
    description: "Nationalité et commune",
    fields: ["nationality", "city"] as const,
    icon: Settings,
  },
  {
    id: 3,
    title: "Contacts & Sécurité",
    description: "Email, téléphone et mot de passe",
    fields: ["email", "phone", "password", "confirmPassword"] as const,
    icon: Shield,
  },
  {
    id: 4,
    title: "Justificatifs",
    description: "Pièce d'identité",
    fields: ["idType", "idNumber"] as const,
    icon: Upload,
  },
  {
    id: 5,
    title: "Validation",
    description: "Consentements finaux",
    fields: ["acceptTerms", "acceptDataPolicy"] as const,
    icon: CheckCircle,
  },
]

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

  // Reactive step validity
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
      const response = await registerMutation.mutateAsync({
        ...values,
        // @ts-ignore
        role: "admin",
      })

      sessionStorage.setItem(
        "pendingAdminRegistration",
        JSON.stringify({
          // @ts-ignore
          email: response.email,
          // @ts-ignore
          userId: response.userId,
        })
      )

      toast({ title: "Succès", description: "Inscription réussie !" })
      setTimeout(() => router.push("/admin-auth/verification-otp"), 3000)
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
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Nom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Votre nom de famille"
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Prénom *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Votre prénom"
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Date de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                          .toISOString()
                          .split("T")[0]}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthPlace"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Lieu de naissance *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ville de naissance"
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>
          </motion.div>
        )

      // ── Step 2 : Localisation ────────────────────────────────────────────────
      case 2:
        return (
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Nationalité *</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value)
                        const selected = countries.find((c) => c.value === value)
                        if (selected?.labelEn) fetchCities(selected.labelEn)
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
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
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Commune / Ville *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={loadingCities || cities.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed">
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
                      <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {citiesError}
                      </p>
                    )}
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {loadingCities && (
              <motion.div
                className="flex items-center gap-2 text-sm text-indigo-300 bg-indigo-500/20 px-3 py-2 rounded-lg border border-indigo-400/30"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              >
                <Loader2 className="w-4 h-4 animate-spin" />
                Récupération des villes en cours...
              </motion.div>
            )}

            {!loadingCities && cities.length > 0 && (
              <motion.div
                className="flex items-center gap-2 text-xs text-emerald-300 bg-emerald-500/20 px-3 py-2 rounded-lg border border-emerald-400/30"
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
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Email *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        {...field}
                        placeholder="votre@email.com"
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Téléphone mobile *</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="0700000000 ou +2250700000000"
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>

                    {/* Password strength bar */}
                    {passwordValue && (
                      <div className="mt-2 space-y-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                                i <= pwdStrength ? pwdStrengthColor : "bg-white/20"
                              }`}
                            />
                          ))}
                        </div>
                        <p className={`text-xs font-medium ${
                          pwdStrength <= 1 ? "text-red-400" :
                          pwdStrength === 2 ? "text-orange-400" :
                          pwdStrength === 3 ? "text-yellow-400" :
                          "text-emerald-400"
                        }`}>
                          Force : {pwdStrengthLabel}
                        </p>
                      </div>
                    )}

                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Confirmer mot de passe *</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
            </div>

            {/* Password requirements checklist */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 space-y-1.5">
              <p className="text-xs font-medium text-white/80 mb-2">Le mot de passe doit contenir :</p>
              {[
                { rule: /.{8,}/, label: "Au moins 8 caractères" },
                { rule: /[A-Z]/, label: "Au moins une majuscule" },
                { rule: /[0-9]/, label: "Au moins un chiffre" },
                { rule: /[^a-zA-Z0-9]/, label: "Au moins un caractère spécial (ex: @, !, #)" },
              ].map(({ rule, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    rule.test(passwordValue) ? "bg-emerald-500" : "bg-white/20"
                  }`}>
                    {rule.test(passwordValue) && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={`text-xs transition-colors duration-200 ${
                    rule.test(passwordValue) ? "text-emerald-400 line-through" : "text-white/50"
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
          <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Type de pièce d'identité *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cni">Carte Nationale d'Identité</SelectItem>
                        <SelectItem value="passeport">Passeport</SelectItem>
                        <SelectItem value="permis">Permis de conduire</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">Numéro de pièce *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Min. 8 caractères"
                        className="h-12 bg-white/80 backdrop-blur-sm border-slate-200 rounded-xl transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
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
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-6 border border-slate-200 rounded-2xl transition-all duration-200 hover:bg-slate-50 bg-white/60 backdrop-blur-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel className="text-sm font-medium text-white">
                        J'accepte les conditions générales d'utilisation *
                      </FormLabel>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        En cochant cette case, vous acceptez nos conditions d'utilisation et notre politique de service
                      </p>
                      <FormMessage className="text-red-400" />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acceptDataPolicy"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 space-y-0 p-6 border border-slate-200 rounded-2xl transition-all duration-200 hover:bg-slate-50 bg-white/60 backdrop-blur-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="mt-1 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
                      />
                    </FormControl>
                    <div className="space-y-2 leading-none">
                      <FormLabel className="text-sm font-medium text-white">
                        Je consens au traitement de mes données personnelles *
                      </FormLabel>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Conformément au RGPD, nous traitons vos données pour la création de votre compte et
                        l'amélioration de nos services
                      </p>
                      <FormMessage className="text-red-400" />
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
      <div className="min-h-screen relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 z-0">
          <BackgroundAnimated />
        </div>

        {/* Header Section */}
        <div className="relative z-10 pt-8 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Panneau d'Administration</h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Créez votre compte administrateur pour accéder à l'Espace Admin
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Form Container */}
        <div className="relative z-10 flex justify-center px-4 pb-12">
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
              {/* Enhanced Progress Indicator */}
              <motion.div className="mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <div className="flex items-center justify-between mb-8">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.id} className="flex items-center">
                        <motion.div
                          className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                            currentStep === step.id
                              ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg"
                              : isStepCompleted(step.id) || currentStep > step.id
                                ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg"
                                : "bg-slate-100 text-slate-400 border-2 border-slate-200"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {currentStep > step.id || isStepCompleted(step.id) ? (
                            <Check className="w-6 h-6" />
                          ) : (
                            <Icon className="w-6 h-6" />
                          )}

                          {currentStep === step.id && (
                            <motion.div
                              className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              style={{ zIndex: -1, opacity: 0.3 }}
                            />
                          )}
                        </motion.div>

                        {index < steps.length - 1 && (
                          <div className="flex-1 mx-4">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                currentStep > step.id
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                  : "bg-slate-200"
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {steps.find((s) => s.id === currentStep)?.title}
                  </h2>
                  <p className="text-white/70">{steps.find((s) => s.id === currentStep)?.description}</p>
                </div>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-500/10 border border-red-400/30 text-red-300 p-4 rounded-xl mb-8 text-sm flex items-center gap-3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-[200px]"
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <motion.div
                    className="flex justify-between pt-8 border-t border-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2 h-12 px-6 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-slate-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Précédent
                    </Button>

                    {currentStep < steps.length ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid}
                        className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white transition-all duration-200 hover:scale-105 shadow-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStepValid || registerMutation.isPending}
                        className="flex items-center gap-2 h-12 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105 shadow-lg rounded-xl disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                className="mt-8 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="text-sm text-white">
                  Vous avez déjà un compte ?{" "}
                  <Link
                    href="/admin-auth/connexion"
                    className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors underline decoration-2 underline-offset-2"
                  >
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