// "use client"

// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent } from "@/components/ui/card"
// import { User, Mail, Phone, Briefcase, Building, CreditCard } from "lucide-react"
// import { useProfile } from "@/hooks"

// interface PersonalInfoStepProps {
//   data: any
//   onChange: (data: any) => void
// }

// export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
//   const handleChange = (field: string, value: string) => {
//     onChange({ [field]: value })
//   }
// const { data: profileData } = useProfile()
//   //@ts-ignore
//   const userEmail = profileData?.email??""
//   return (
//     <div className="space-y-6">
//       <div className="text-center mb-6">
//         <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
//           <User className="w-8 h-8 text-primary" />
//         </div>
//         <h3 className="text-lg font-semibold text-foreground">Vos informations personnelles</h3>
//         <p className="text-muted-foreground">Ces informations nous permettront de vous identifier et vous contacter</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <User className="w-5 h-5 text-primary" />
//               <Label htmlFor="nom" className="font-medium">
//                 Nom *
//               </Label>
//             </div>
//             <Input
//               id="nom"
//               value={data.nom || ""}
//               onChange={(e) => handleChange("nom", e.target.value)}
//               placeholder="Votre nom de famille"
//               className="border-primary/20 focus:border-primary"
//               disabled={data}
//             />
//           </CardContent>
//         </Card>

//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <User className="w-5 h-5 text-primary" />
//               <Label htmlFor="prenom" className="font-medium">
//                 Prénom *
//               </Label>
//             </div>
//             <Input
//               id="prenom"
//               value={data.prenom || ""}
//               onChange={(e) => handleChange("prenom", e.target.value)}
//               placeholder="Votre prénom"
//               className="border-primary/20 focus:border-primary"
//               disabled={data}
//             />
//           </CardContent>
//         </Card>

//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <Mail className="w-5 h-5 text-primary" />
//               <Label htmlFor="email" className="font-medium">
//                 Email *
//               </Label>
//             </div>
//             <Input
//               id="email"
//               type="email"
//               value={ data.email || ""}
//               onChange={(e) => handleChange("email", e.target.value)}
//               placeholder="votre.email@exemple.com"
//               className="border-primary/20 focus:border-primary"
//               disabled={data.email?true:false}
//             />
//           </CardContent>
//         </Card>

//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <Phone className="w-5 h-5 text-primary" />
//               <Label htmlFor="telephone" className="font-medium">
//                 Téléphone *
//               </Label>
//             </div>
//             <Input
//               id="telephone"
//               value={data.telephone || ""}
//               onChange={(e) => handleChange("telephone", e.target.value)}
//               placeholder="+225 XX XX XX XX XX"
//               className="border-primary/20 focus:border-primary"
//             />
//           </CardContent>
//         </Card>

//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <Briefcase className="w-5 h-5 text-primary" />
//               <Label htmlFor="profession" className="font-medium">
//                 Profession *
//               </Label>
//             </div>
//             <Input
//               id="profession"
//               value={data.profession || ""}
//               onChange={(e) => handleChange("profession", e.target.value)}
//               placeholder="Votre profession"
//               className="border-primary/20 focus:border-primary"
//             />
//           </CardContent>
//         </Card>

//         <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//           <CardContent className="p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <Building className="w-5 h-5 text-primary" />
//               <Label htmlFor="institution" className="font-medium">
//                 Institution *
//               </Label>
//             </div>
//             <Input
//               id="institution"
//               value={data.institution || ""}
//               onChange={(e) => handleChange("institution", e.target.value)}
//               placeholder="Votre institution ou entreprise"
//               className="border-primary/20 focus:border-primary"
//             />
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="border-primary/20 hover:border-primary/40 transition-colors">
//         <CardContent className="p-4">
//           <div className="flex items-center gap-3 mb-3">
//             <CreditCard className="w-5 h-5 text-primary" />
//             <Label htmlFor="nationalId" className="font-medium">
//               Numéro d'identité *
//             </Label>
//           </div>
//           <Input
//             id="nationalId"
//             value={data.nationalId || ""}
//             onChange={(e) => handleChange("nationalId", e.target.value)}
//             placeholder="Votre numéro de carte d'identité ou passeport"
//             className="border-primary/20 focus:border-primary"
//           />
//         </CardContent>
//       </Card>
//     </div>
//   )
// }



"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Phone, Briefcase, Building, CreditCard } from "lucide-react"
import { useProfile } from "@/hooks"

interface PersonalInfoStepProps {
  data: any
  onChange: (data: any) => void
}

export function PersonalInfoStep({ data, onChange }: PersonalInfoStepProps) {
  const { data: profileData } = useProfile()

  // Synchronise automatiquement data avec le profil
  useEffect(() => {
    if (profileData) {
      onChange({
        ...data,
         //@ts-ignore
        nom: profileData.lastName ?? data.nom,
         //@ts-ignore
        prenom: profileData.firstName ?? data.prenom,
         //@ts-ignore
        email: profileData.email ?? data.email,
         //@ts-ignore
        telephone: profileData.phone ?? data.telephone,
         //@ts-ignore
        nationalId: profileData.idNumber ?? data.nationalId,
        profession: data.profession, // laissé modifiable
        institution: data.institution // laissé modifiable
      })
    }
  }, [profileData])

  const handleChange = (field: string, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Vos informations personnelles</h3>
        <p className="text-muted-foreground">
          Ces informations nous permettront de vous identifier et vous contacter
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* NOM */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="nom" className="font-medium">
                Nom *
              </Label>
            </div>
            <Input
              id="nom"
              value={data.nom || ""}
              onChange={(e) => handleChange("nom", e.target.value)}
              placeholder="Votre nom de famille"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.lastName}
            />
          </CardContent>
        </Card>

        {/* PRENOM */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="prenom" className="font-medium">
                Prénom *
              </Label>
            </div>
            <Input
              id="prenom"
              value={data.prenom || ""}
              onChange={(e) => handleChange("prenom", e.target.value)}
              placeholder="Votre prénom"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.firstName}
            />
          </CardContent>
        </Card>

        {/* EMAIL */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <Label htmlFor="email" className="font-medium">
                Email *
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="votre.email@exemple.com"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.email}
            />
          </CardContent>
        </Card>

        {/* TELEPHONE */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-5 h-5 text-primary" />
              <Label htmlFor="telephone" className="font-medium">
                Téléphone *
              </Label>
            </div>
            <Input
              id="telephone"
              value={data.telephone || ""}
              onChange={(e) => handleChange("telephone", e.target.value)}
              placeholder="+225 XX XX XX XX XX"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.phone}
            />
          </CardContent>
        </Card>

        {/* PROFESSION */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <Label htmlFor="profession" className="font-medium">
                Profession *
              </Label>
            </div>
            <Input
              id="profession"
              value={data.profession || ""}
              onChange={(e) => handleChange("profession", e.target.value)}
              placeholder="Votre profession"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        {/* INSTITUTION */}
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Building className="w-5 h-5 text-primary" />
              <Label htmlFor="institution" className="font-medium">
                Institution *
              </Label>
            </div>
            <Input
              id="institution"
              value={data.institution || ""}
              onChange={(e) => handleChange("institution", e.target.value)}
              placeholder="Votre institution ou entreprise"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>
      </div>

      {/* NATIONAL ID */}
      <Card className="border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <CreditCard className="w-5 h-5 text-primary" />
            <Label htmlFor="nationalId" className="font-medium">
              Numéro d'identité *
            </Label>
          </div>
          <Input
            id="nationalId"
            value={data.nationalId || ""}
            onChange={(e) => handleChange("nationalId", e.target.value)}
            placeholder="Votre numéro de carte d'identité ou passeport"
            className="border-primary/20 focus:border-primary"
             //@ts-ignore
            disabled={!!profileData?.idNumber}
          />
        </CardContent>
      </Card>
    </div>
  )
}
