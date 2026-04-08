// // "use client";

// // import type React from "react";

// // import { useState } from "react";
// // import Link from "next/link";
// // import { useParams } from "next/navigation";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { z } from "zod";
// // import { motion } from "framer-motion";
// // import {
// //   ArrowLeft,
// //   Clock,
// //   Upload,
// //   AlertTriangle,
// //   HelpCircle,
// //   X,
// //   FileTextIcon,
// //   CheckCircle2,
// // } from "lucide-react";

// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Label } from "@/components/ui/label";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import {
// //   Form,
// //   FormControl,
// //   FormField,
// //   FormItem,
// //   FormLabel,
// //   FormMessage,
// // } from "@/components/ui/form";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import Image from "next/image";

// // // Schéma de validation du formulaire
// // const formSchema = z.object({
// //   nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
// //   prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
// //   email: z.string().email("Email invalide"),
// //   telephone: z
// //     .string()
// //     .min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
// //   adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
// //   codePostal: z.string().min(5, "Le code postal doit contenir 5 caractères"),
// //   ville: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
// //   motif: z.string().min(1, "Le motif est requis"),
// //   commentaire: z.string().optional(),
// // });

// // type FormValues = z.infer<typeof formSchema>;

// // export default function ServiceDetail() {
// //   const params = useParams();
// //   const serviceId = params.id as string;
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [files, setFiles] = useState<File[]>([]);

// //   // Mock data pour le service
// //   const service = {
// //     id: serviceId,
// //     title: "Demande d'acte de naissance",
// //     description:
// //       "Obtenez facilement une copie ou un extrait de votre acte de naissance délivré par votre ville de naissance. Ce document est nécessaire pour diverses formalités administratives (passeport, mariage, etc.).",
// //     duree: "48 heures",
// //     conditions: [
// //       "Être né(e) dans la commune du Plateau",
// //       "Être majeur ou représentant légal",
// //       "Document disponible sous 3 jours ouvrés",
// //     ],
// //     documents: [
// //       "Copie d'une pièce d'identité",
// //       "Justificatif de domicile",
// //       "Livret de famille (si applicable)",
// //       "Adresse (mail ou numéro de téléphone) valide",
// //     ],
// //   };

// //   const form = useForm<FormValues>({
// //     resolver: zodResolver(formSchema),
// //     defaultValues: {
// //       nom: "",
// //       prenom: "",
// //       email: "",
// //       telephone: "",
// //       adresse: "",
// //       codePostal: "",
// //       ville: "",
// //       motif: "",
// //       commentaire: "",
// //     },
// //   });

// //   const onSubmit = (data: FormValues) => {
// //     setIsSubmitting(true);
// //     setTimeout(() => {
// //       console.log("Form data:", data);
// //       console.log("Files:", files);
// //       setIsSubmitting(false);
// //       window.location.href = "/dashboard/client/mes-demandes";
// //     }, 1500);
// //   };

// //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const selectedFiles = Array.from(event.target.files || []);
// //     setFiles((prev) => [...prev, ...selectedFiles]);
// //   };

// //   const removeFile = (index: number) => {
// //     setFiles((prev) => prev.filter((_, i) => i !== index));
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.6,
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0 },
// //   };

// //   return (
// //     <div className="bg-white   min-h-screen">
// //       <motion.div
// //         className=" "
// //         initial="hidden"
// //         animate="visible"
// //         variants={containerVariants}
// //       >
// //         <motion.div
// //           className=" rounded-lg overflow-hidden"
// //           variants={itemVariants}
// //         >
// //          <div className="relative w-full py-10 h-[500px] md:h-[600px] lg:h-[750px] flex flex-col justify-center items-center text-center overflow-hidden border-b border-white mb-7">
// //   {/* Background image */}
// //    <video
// //     autoPlay
// //     loop
// //     muted
// //     playsInline
// //     className="absolute inset-0 w-full h-full object-cover z-0"
// //   >
// //     <source src="/videos/blue-digital.mp4" type="video/mp4" />
// //     Votre navigateur ne supporte pas la vidéo HTML5.
// //   </video>

// //   {/* Overlay */}
// //   <div className="absolute inset-0 bg-gradient-to-t  to-primary/60 from-primary/60  z-10" />

// //   {/* Foreground content */}
// //   <div className="relative z-10 px-4 pt-10 md:px-72">
// //     <FileTextIcon className="h-20 w-20 text-white mb-4 mx-auto" />
// //     <motion.h1
// //       className="text-2xl md:text-7xl font-bold text-white mb-4"
// //       variants={itemVariants}
// //     >
// //       {service.title}
// //     </motion.h1>
// //     <motion.p
// //       className="text-white/80 lg:px-20 text-3xl mb-4"
// //       variants={itemVariants}
// //     >
// //       {service.description}
// //     </motion.p>
// //   </div>
// // </div>


// //           <div className="grid md:grid-cols-3 gap-20 p-20">
// //             <motion.div className="md:col-span-2 px-10 bg-white p-10 shadow-lg rounded-xl border" variants={itemVariants}>
              

// //               <Form {...form}>
// //                 <form
// //                   onSubmit={form.handleSubmit(onSubmit)}
// //                   className="space-y-6"
// //                 >
// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <FormField
// //                       control={form.control}
// //                       name="nom"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Nom</FormLabel>
// //                           <FormControl>
// //                             <Input placeholder="Votre nom" {...field} />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />

// //                     <FormField
// //                       control={form.control}
// //                       name="prenom"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Prénom</FormLabel>
// //                           <FormControl>
// //                             <Input placeholder="Votre prénom" {...field} />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                   </div>

// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <FormField
// //                       control={form.control}
// //                       name="email"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Email</FormLabel>
// //                           <FormControl>
// //                             <Input
// //                               type="email"
// //                               placeholder="votre@email.com"
// //                               {...field}
// //                             />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />

// //                     <FormField
// //                       control={form.control}
// //                       name="telephone"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Téléphone</FormLabel>
// //                           <FormControl>
// //                             <Input
// //                               type="tel"
// //                               placeholder="0123456789"
// //                               {...field}
// //                             />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                   </div>

// //                   <FormField
// //                     control={form.control}
// //                     name="adresse"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Adresse</FormLabel>
// //                         <FormControl>
// //                           <Input
// //                             placeholder="Votre adresse complète"
// //                             {...field}
// //                           />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <div className="grid md:grid-cols-2 gap-4">
// //                     <FormField
// //                       control={form.control}
// //                       name="codePostal"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Code postal</FormLabel>
// //                           <FormControl>
// //                             <Input placeholder="00000" {...field} />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />

// //                     <FormField
// //                       control={form.control}
// //                       name="ville"
// //                       render={({ field }) => (
// //                         <FormItem>
// //                           <FormLabel>Ville</FormLabel>
// //                           <FormControl>
// //                             <Input placeholder="Votre ville" {...field} />
// //                           </FormControl>
// //                           <FormMessage />
// //                         </FormItem>
// //                       )}
// //                     />
// //                   </div>

// //                   {/* <FormField
// //                     control={form.control}
// //                     name="motif"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Motif de la demande</FormLabel>
// //                         <Select onValueChange={field.onChange} defaultValue={field.value}>
// //                           <FormControl>
// //                             <SelectTrigger>
// //                               <SelectValue placeholder="Sélectionnez un motif" />
// //                             </SelectTrigger>
// //                           </FormControl>
// //                           <SelectContent>
// //                             <SelectItem value="passeport">Demande de passeport</SelectItem>
// //                             <SelectItem value="mariage">Mariage</SelectItem>
// //                             <SelectItem value="succession">Succession</SelectItem>
// //                             <SelectItem value="autre">Autre</SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   />

// //                   <FormField
// //                     control={form.control}
// //                     name="commentaire"
// //                     render={({ field }) => (
// //                       <FormItem>
// //                         <FormLabel>Commentaire (optionnel)</FormLabel>
// //                         <FormControl>
// //                           <Textarea placeholder="Informations complémentaires..." className="resize-none" {...field} />
// //                         </FormControl>
// //                         <FormMessage />
// //                       </FormItem>
// //                     )}
// //                   /> */}

// //                   <div>
// //                     <Label className="text-base font-medium">
// //                       Joindre vos documents
// //                     </Label>
// //                     <div className="mt-2">
// //                       <div className="flex items-center justify-center w-full">
// //                         <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded cursor-pointer  hover:bg-gray-100">
// //                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
// //                             <Upload className="w-8 h-8 mb-4 text-gray-500" />
// //                             <p className="mb-2 text-sm text-gray-500">
// //                               <span className="font-semibold">
// //                                 Cliquez pour télécharger
// //                               </span>{" "}
// //                               ou glissez-déposez
// //                             </p>
// //                             <p className="text-xs text-gray-500">
// //                               PDF, JPG ou PNG (MAX. 5MB)
// //                             </p>
// //                           </div>
// //                           <input
// //                             type="file"
// //                             className="hidden"
// //                             multiple
// //                             accept=".pdf,.jpg,.jpeg,.png"
// //                             onChange={handleFileUpload}
// //                           />
// //                         </label>
// //                       </div>

// //                       {files.length > 0 && (
// //                         <div className="mt-4">
// //                           <h4 className="text-sm font-medium mb-2">
// //                             Fichiers sélectionnés:
// //                           </h4>
// //                           <div className="space-y-2">
// //                             {files.map((file, index) => (
// //                               <motion.div
// //                                 key={index}
// //                                 initial={{ opacity: 0, x: -20 }}
// //                                 animate={{ opacity: 1, x: 0 }}
// //                                 className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
// //                               >
// //                                 <span className="text-sm truncate max-w-xs">
// //                                   {file.name}
// //                                 </span>
// //                                 <Button
// //                                   type="button"
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => removeFile(index)}
// //                                   className="text-red-500 hover:text-red-700"
// //                                 >
// //                                   <X className="h-4 w-4" />
// //                                 </Button>
// //                               </motion.div>
// //                             ))}
// //                           </div>
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>

// //                   <Button
// //                     type="submit"
// //                     className="w-full bg-primary py-6 text-white text-lg rounded hover:bg-primary"
// //                     disabled={isSubmitting}
// //                   >
// //                     {isSubmitting
// //                       ? "Soumission en cours..."
// //                       : "Soumettre ma demande"}
// //                   </Button>
// //                 </form>
// //               </Form>
// //             </motion.div>

// //             <motion.div className="space-y-10" variants={itemVariants}>
// //               <motion.div
// //                 className="flex items-center text-[#EF9213]/80 text-sm"
// //                 variants={itemVariants}
// //               >
// //                 <CheckCircle2 className="mr-2 h-4 w-4" />
// //                 <span>
// //                   <span className="text-[#EF9213] text-xl font-bold">
// //                     Durée estimée :{" "}
// //                   </span>{" "}
// //                  <span className="text-black"> {service.duree}</span>
// //                 </span>
// //               </motion.div>
// //               <Card className="border-none mt-4 p-0">
// //                 <CardHeader className="p-0 my-4">
// //                   <div className="flex items-center ">
// //                     <CheckCircle2 className="mr-2 text-primary h-4 w-4" />
// //                     <CardTitle className="text-black text-xl font-bold p-0">
// //                       Conditions d'accès
// //                     </CardTitle>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent className="p-0 mb-7">
// //                   <ul className="space-y-2 px-4">
// //                     {service.conditions.map((condition, index) => (
// //                       <motion.li
// //                         key={index}
// //                         className="flex items-center gap-2 "
// //                         initial={{ opacity: 0, x: -10 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ delay: index * 0.1 }}
// //                       >
// //                         <div className="bg-gray-500 p-1 rounded-full "></div>
// //                         <span>{condition}</span>
// //                       </motion.li>
// //                     ))}
// //                   </ul>
// //                 </CardContent>
// //               </Card>
// //               <Card className="rounded-xl">
// //                 <CardHeader className="bg-[#EF9213] rounded-t-xl p-4">
// //                   <CardTitle className="text-white">
// //                     Pièces à fournir
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="bg-gray-50 border border-[#EF9213] rounded-b-xl">
// //                   <ul className="space-y-2 py-4">
// //                     {service.documents.map((doc, index) => (
// //                       <motion.li
// //                         key={index}
// //                         className="flex items-center gap-2 text-sm"
// //                         initial={{ opacity: 0, x: -10 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         transition={{ delay: index * 0.1 }}
// //                       >
// //                         <div className="bg-gray-500 p-1 rounded-full "></div>
// //                         <span>{doc}</span>
// //                       </motion.li>
// //                     ))}
// //                   </ul>
// //                 </CardContent>
// //               </Card>

// //               <Card className="rounded-xl">
               
// //                 <CardContent className="border-l-[16px] rounded-l-xl border-r border-t border-b border-red-600">
// //                   <motion.p
// //                     className="flex items-center gap-2 py-2 text-lg text-red-600"
// //                     initial={{ opacity: 0, x: -10 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                   >
// //                     <span>
// //                       Pour une demande urgente, rendez-vous directement à la
// //                       mairie muni de vos documents.
// //                     </span>
// //                   </motion.p>
// //                 </CardContent>
// //               </Card>
             

              
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </motion.div>
// //     </div>
// //   );
// // }
// "use client"
// import type React from "react"
// import { useState } from "react"
// import Link from "next/link"
// import { useParams } from "next/navigation"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { motion } from "framer-motion"
// import { ArrowLeft, Clock, Upload, X, FileTextIcon, CheckCircle2 } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { getServiceById } from "@/lib/services-data"

// // Schéma de validation du formulaire
// const formSchema = z.object({
//   nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
//   prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
//   email: z.string().email("Email invalide"),
//   telephone: z.string().min(10, "Le numéro de téléphone doit contenir au moins 10 caractères"),
//   adresse: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
//   codePostal: z.string().min(5, "Le code postal doit contenir 5 caractères"),
//   ville: z.string().min(2, "La ville doit contenir au moins 2 caractères"),
//   motif: z.string().min(1, "Le motif est requis"),
//   commentaire: z.string().optional(),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function ServiceDetail() {
//   const params = useParams()
//   const serviceId = params.id as string
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const [files, setFiles] = useState<File[]>([])

//   // Récupérer le service depuis les données
//   const service = getServiceById(serviceId)

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       nom: "",
//       prenom: "",
//       email: "",
//       telephone: "",
//       adresse: "",
//       codePostal: "",
//       ville: "",
//       motif: "",
//       commentaire: "",
//     },
//   })

//   const onSubmit = (data: FormValues) => {
//     setIsSubmitting(true)
//     setTimeout(() => {
//       console.log("Form data:", data)
//       console.log("Files:", files)
//       setIsSubmitting(false)
//       setIsSubmitted(true)
//     }, 2000)
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFiles = Array.from(event.target.files || [])
//     setFiles((prev) => [...prev, ...selectedFiles])
//   }

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   }

//   // Si le service n'existe pas
//   if (!service) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-4">Service non trouvé</h1>
//           <p className="text-gray-600 mb-4">Le service demandé n'existe pas.</p>
//           <Link href="/services">
//             <Button className="bg-primary text-white">
//               <ArrowLeft className="mr-2 h-4 w-4" />
//               Retour aux services
//             </Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   // Message de succès après soumission
//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen pt-40 bg-white">
//         <motion.div
//           className="container mx-auto px-4 py-20"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="max-w-2xl mx-auto text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//               className="mb-8"
//             >
//               <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto mb-4" />
//             </motion.div>

//             <motion.h1
//               className="text-4xl font-bold text-gray-800 mb-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.3 }}
//             >
//               Demande envoyée avec succès !
//             </motion.h1>

//             <motion.p
//               className="text-xl text-gray-600 mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4 }}
//             >
//               Votre demande pour "{service.title}" a été transmise à nos services.
//             </motion.p>

//             <motion.div
//               className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.5 }}
//             >
//               <h3 className="font-semibold text-blue-800 mb-2">Prochaines étapes :</h3>
//               <ul className="text-left text-blue-700 space-y-2">
//                 <li className="flex items-center">
//                   <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" />
//                   Vous recevrez un email de confirmation sous 24h
//                 </li>
//                 <li className="flex items-center">
//                   <Clock className="h-4 w-4 mr-2 text-blue-500" />
//                   Délai de traitement estimé : {service.duree}
//                 </li>
//                 <li className="flex items-center">
//                   <FileTextIcon className="h-4 w-4 mr-2 text-blue-500" />
//                   Suivi possible dans votre espace personnel
//                 </li>
//               </ul>
//             </motion.div>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4 justify-center"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <Link href="/dashboard/client/mes-demandes">
//                 <Button className="bg-primary text-white px-8 py-3">Suivre ma demande</Button>
//               </Link>
//               <Link href="/services">
//                 <Button variant="outline" className="px-8 py-3 bg-transparent">
//                   Autres services
//                 </Button>
//               </Link>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white min-h-screen">
//       <motion.div className="" initial="hidden" animate="visible" variants={containerVariants}>
//         <motion.div className="rounded-lg overflow-hidden" variants={itemVariants}>
//           <div className="relative w-full py-10 h-[500px] md:h-[600px] lg:h-[750px] flex flex-col justify-center items-center text-center overflow-hidden border-b border-white mb-7">
//             {/* Background video */}
//             <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
//               <source src="/videos/blue-digital.mp4" type="video/mp4" />
//               Votre navigateur ne supporte pas la vidéo HTML5.
//             </video>
//             {/* Overlay */}
//             <div className="absolute inset-0 bg-gradient-to-t to-primary/60 from-primary/60 z-10" />
//             {/* Foreground content */}
//             <div className="relative z-10 px-4 pt-10 md:px-72">
//               <FileTextIcon className="h-20 w-20 text-white mb-4 mx-auto" />
//               <motion.h1 className="text-2xl md:text-7xl font-bold text-white mb-4" variants={itemVariants}>
//                 {service.title}
//               </motion.h1>
//               <motion.p className="text-white/80 lg:px-20 text-3xl mb-4" variants={itemVariants}>
//                 {service.description}
//               </motion.p>
//             </div>
//           </div>

//           <div className="grid md:grid-cols-3 gap-20 p-20">
//             <motion.div
//               className="md:col-span-2 px-10 bg-white p-10 shadow-lg rounded-xl border"
//               variants={itemVariants}
//             >
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                   <div className="grid md:grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="nom"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Nom</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Votre nom" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="prenom"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Prénom</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Votre prénom" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="email"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Email</FormLabel>
//                           <FormControl>
//                             <Input type="email" placeholder="votre@email.com" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="telephone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Téléphone</FormLabel>
//                           <FormControl>
//                             <Input type="tel" placeholder="0123456789" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="adresse"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Adresse</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Votre adresse complète" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div className="grid md:grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="codePostal"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Code postal</FormLabel>
//                           <FormControl>
//                             <Input placeholder="00000" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="ville"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Ville</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Votre ville" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>

//                   <FormField
//                     control={form.control}
//                     name="motif"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Motif de la demande</FormLabel>
//                         <Select onValueChange={field.onChange} defaultValue={field.value}>
//                           <FormControl>
//                             <SelectTrigger>
//                               <SelectValue placeholder="Sélectionnez un motif" />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value="passeport">Demande de passeport</SelectItem>
//                             <SelectItem value="mariage">Mariage</SelectItem>
//                             <SelectItem value="succession">Succession</SelectItem>
//                             <SelectItem value="autre">Autre</SelectItem>
//                           </SelectContent>
//                         </Select>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="commentaire"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Commentaire (optionnel)</FormLabel>
//                         <FormControl>
//                           <Textarea placeholder="Informations complémentaires..." className="resize-none" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <div>
//                     <Label className="text-base font-medium">Joindre vos documents</Label>
//                     <div className="mt-2">
//                       <div className="flex items-center justify-center w-full">
//                         <label className="flex flex-col items-center justify-center w-full h-32 border border-gray-300 border-dashed rounded cursor-pointer hover:bg-gray-100">
//                           <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                             <Upload className="w-8 h-8 mb-4 text-gray-500" />
//                             <p className="mb-2 text-sm text-gray-500">
//                               <span className="font-semibold">Cliquez pour télécharger</span> ou glissez-déposez
//                             </p>
//                             <p className="text-xs text-gray-500">PDF, JPG ou PNG (MAX. 5MB)</p>
//                           </div>
//                           <input
//                             type="file"
//                             className="hidden"
//                             multiple
//                             accept=".pdf,.jpg,.jpeg,.png"
//                             onChange={handleFileUpload}
//                           />
//                         </label>
//                       </div>
//                       {files.length > 0 && (
//                         <div className="mt-4">
//                           <h4 className="text-sm font-medium mb-2">Fichiers sélectionnés:</h4>
//                           <div className="space-y-2">
//                             {files.map((file, index) => (
//                               <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
//                               >
//                                 <span className="text-sm truncate max-w-xs">{file.name}</span>
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => removeFile(index)}
//                                   className="text-red-500 hover:text-red-700"
//                                 >
//                                   <X className="h-4 w-4" />
//                                 </Button>
//                               </motion.div>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   <Button
//                     type="submit"
//                     className="w-full bg-primary py-6 text-white text-lg rounded hover:bg-primary"
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Soumission en cours..." : "Soumettre ma demande"}
//                   </Button>
//                 </form>
//               </Form>
//             </motion.div>

//             <motion.div className="space-y-10" variants={itemVariants}>
//               <motion.div className="flex items-center text-[#EF9213]/80 text-sm" variants={itemVariants}>
//                 <CheckCircle2 className="mr-2 h-4 w-4" />
//                 <span>
//                   <span className="text-[#EF9213] text-xl font-bold">Durée estimée : </span>{" "}
//                   <span className="text-black"> {service.duree}</span>
//                 </span>
//               </motion.div>

//               <Card className="border-none mt-4 p-0">
//                 <CardHeader className="p-0 my-4">
//                   <div className="flex items-center ">
//                     <CheckCircle2 className="mr-2 text-primary h-4 w-4" />
//                     <CardTitle className="text-black text-xl font-bold p-0">Conditions d'accès</CardTitle>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="p-0 mb-7">
//                   <ul className="space-y-2 px-4">
//                     {service.conditions.map((condition, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center gap-2 "
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                       >
//                         <div className="bg-gray-500 p-1 rounded-full "></div>
//                         <span>{condition}</span>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="rounded-xl">
//                 <CardHeader className="bg-[#EF9213] rounded-t-xl p-4">
//                   <CardTitle className="text-white">Pièces à fournir</CardTitle>
//                 </CardHeader>
//                 <CardContent className="bg-gray-50 border border-[#EF9213] rounded-b-xl">
//                   <ul className="space-y-2 py-4">
//                     {service.documents.map((doc, index) => (
//                       <motion.li
//                         key={index}
//                         className="flex items-center gap-2 text-sm"
//                         initial={{ opacity: 0, x: -10 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                       >
//                         <div className="bg-gray-500 p-1 rounded-full "></div>
//                         <span>{doc}</span>
//                       </motion.li>
//                     ))}
//                   </ul>
//                 </CardContent>
//               </Card>

//               <Card className="rounded-xl">
//                 <CardContent className="border-l-[16px] rounded-l-xl border-r border-t border-b border-red-600">
//                   <motion.p
//                     className="flex items-center gap-2 py-2 text-lg text-red-600"
//                     initial={{ opacity: 0, x: -10 }}
//                     animate={{ opacity: 1, x: 0 }}
//                   >
//                     <span>Pour une demande urgente, rendez-vous directement à la mairie muni de vos documents.</span>
//                   </motion.p>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Clock, FileTextIcon, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getServiceById } from "@/lib/services-data"


export default function ServiceDetail() {
  const params = useParams()
  const serviceId = params.id as string
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  // Récupérer le service depuis les données
  const service = getServiceById(serviceId)

  const onSubmit = (data: any, submittedFiles: File[]) => {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log("Form data:", data)
      console.log("Files:", submittedFiles)
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    setFiles((prev) => [...prev, ...selectedFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  // Si le service n'existe pas
  if (!service) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service non trouvé</h1>
          <p className="text-gray-600 mb-4">Le service demandé n'existe pas.</p>
          <Link href="/services">
            <Button className="bg-primary text-white">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux services
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  // Message de succès après soumission
  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-40 bg-white">
        <motion.div
          className="container mx-auto px-4 py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              <CheckCircle2 className="h-24 w-24 text-green-500 mx-auto mb-4" />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Demande envoyée avec succès !
            </motion.h1>
            <motion.p
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Votre demande pour &quot;{service.title}&quot; a été transmise à nos services.
            </motion.p>
            <motion.div
              className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-blue-800 mb-2">Prochaines étapes :</h3>
              <ul className="text-left text-blue-700 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-blue-500" />
                  Vous recevrez un email de confirmation sous 24h
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Délai de traitement estimé : {service.duree}
                </li>
                <li className="flex items-center">
                  <FileTextIcon className="h-4 w-4 mr-2 text-blue-500" />
                  Suivi possible dans votre espace personnel
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/dashboard/client/mes-demandes">
                <Button className="bg-primary text-white px-8 py-3">Suivre ma demande</Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" className="px-8 py-3 bg-transparent">
                  Autres services
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    )
  }

 const renderForm = () => {
  const cardStyle =
    "bg-blue-50 lg:p-10 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300";
  const titleStyle = "text-2xl font-bold mb-4 flex items-center gap-2";
  const subtitleStyle = "mb-4 text-gray-700 leading-relaxed";
  const detailStyle = "mb-6 text-gray-600 text-base leading-relaxed";
  const linkStyle =
    "inline-block bg-primary text-white px-6 py-3 rounded-xl text-lg font-medium hover:bg-primary/90 transition-colors duration-300";

  switch (serviceId) {
    case "rendez-vous":
    case "demander-rendez-vous":
      return (
        <div className={cardStyle}>
          <p className={titleStyle}>📅 Formulaire de demande de rendez-vous</p>
          <p className={subtitleStyle}>
            Pour prendre rendez-vous, veuillez vous connecter sur votre espace personnel.
          </p>
          <p className={detailStyle}>
            Ce service vous permet de fixer un rendez-vous avec nos équipes en quelques clics.
            Une fois la demande envoyée, vous recevrez une confirmation ainsi que toutes les
            informations nécessaires (date, heure, lieu et documents à préparer).
          </p>
          <p className="text-xl font-semibold mb-6">ou cliquez sur le lien ci-dessous :</p>
          <Link className={linkStyle} href="/dashboard/client/new-request/rdv">
            Faire ma demande de rendez-vous
          </Link>
        </div>
      );

    case "mariage":
    case "acte-mariage":
      return (
        <div className={cardStyle}>
          <p className={titleStyle}>💍 Formulaire de demande de mariage</p>
          <p className={subtitleStyle}>
            Pour faire une demande de mariage, veuillez vous connecter sur votre espace personnel.
          </p>
          <p className={detailStyle}>
            Ce service vous guide dans toutes les démarches nécessaires à la préparation
            de votre mariage civil. Vous pourrez déposer vos pièces justificatives en ligne,
            suivre l’avancement de votre dossier et être informé de chaque étape.
          </p>
          <p className="text-xl font-semibold mb-6">ou cliquez sur le lien ci-dessous :</p>
          <Link className={linkStyle} href="/dashboard/client/new-request/mariage">
            Faire ma demande de mariage
          </Link>
        </div>
      );

    case "partenariat":
    case "demander-partenariat":
      return (
        <div className={cardStyle}>
          <p className={titleStyle}>🤝 Formulaire de demande de partenariat</p>
          <p className={subtitleStyle}>
            Pour faire une demande de partenariat, veuillez vous connecter sur votre espace personnel.
          </p>
          <p className={detailStyle}>
            Vous êtes une entreprise, une association ou un particulier souhaitant collaborer
            avec nous ? Ce formulaire vous permet de présenter votre projet et vos attentes.
            Nos équipes analyseront votre demande et vous contacteront rapidement pour discuter
            des modalités de partenariat.
          </p>
          <p className="text-xl font-semibold mb-6">ou cliquez sur le lien ci-dessous :</p>
          <Link className={linkStyle} href="/dashboard/client/new-request/partenariat">
            Faire ma demande de partenariat
          </Link>
        </div>
      );

    default:
      return (
        <p className="text-red-500 text-lg font-semibold">
          Formulaire non disponible pour ce service.
        </p>
      );
  }
};



  return (
    <div className="bg-white min-h-screen">
      <motion.div className="" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.div className="rounded-lg overflow-hidden" variants={itemVariants}>
          <div className="relative w-full py-10 h-[500px] md:h-[600px] lg:h-[750px] flex flex-col justify-center items-center text-center overflow-hidden border-b border-white mb-7">
            {/* Background video */}
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
              <source src="/videos/blue-digital.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo HTML5.
            </video>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t to-primary/60 from-primary/60 z-10" />
            {/* Foreground content */}
            <div className="relative z-10 px-4 pt-10 md:px-72">
              <FileTextIcon className="h-20 w-20 text-white mb-4 mx-auto" />
              <motion.h1 className="text-2xl md:text-7xl font-bold text-white mb-4" variants={itemVariants}>
                {service.title}
              </motion.h1>
              <motion.p className="text-white/80 lg:px-20 text-3xl mb-4" variants={itemVariants}>
                {service.description}
              </motion.p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-20 gap-7 lg:p-20 p-7">
            <motion.div
              className="lg:col-span-2 col-1 lg:px-10  p-10  rounded-xl border"
              variants={itemVariants}
            >
              {renderForm()}
            </motion.div>
            <motion.div className="space-y-10" variants={itemVariants}>
              <motion.div className="flex items-center text-[#EF9213]/80 text-sm" variants={itemVariants}>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                <span>
                  <span className="text-[#EF9213] text-xl font-bold">Durée estimée : </span>{" "}
                  <span className="text-black"> {service.duree}</span>
                </span>
              </motion.div>
              <Card className="border-none mt-4 p-0">
                <CardHeader className="p-0 my-4">
                  <div className="flex items-center ">
                    <CheckCircle2 className="mr-2 text-primary h-4 w-4" />
                    <CardTitle className="text-black text-xl font-bold p-0">Conditions d&apos;accès</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-0 mb-7">
                  <ul className="space-y-2 px-4">
                    {service.conditions.map((condition, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 "
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-gray-500 p-1 rounded-full "></div>
                        <span>{condition}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardHeader className="bg-[#EF9213] rounded-t-xl p-4">
                  <CardTitle className="text-white">Pièces à fournir</CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-50 border border-[#EF9213] rounded-b-xl">
                  <ul className="space-y-2 py-4">
                    {service.documents.map((doc, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="bg-gray-500 p-1 rounded-full "></div>
                        <span>{doc}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="rounded-xl">
                <CardContent className="border-l-[16px] rounded-l-xl border-r border-t border-b border-red-600">
                  <motion.p
                    className="flex items-center gap-2 py-2 text-lg text-red-600"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span>Pour une demande urgente, rendez-vous directement à la mairie muni de vos documents.</span>
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
