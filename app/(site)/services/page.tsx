// // "use client";

// // import type React from "react";

// // import Link from "next/link";
// // import { FileText, Search, ChevronDown } from "lucide-react";
// // import { useState, useMemo } from "react";
// // import { motion } from "framer-motion";
// // import {
// //   DropdownMenu,
// //   DropdownMenuContent,
// //   DropdownMenuItem,
// //   DropdownMenuTrigger,
// // } from "@/components/ui/dropdown-menu";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import ServiceCard from "@/components/service-card";
// // import Image from "next/image";
// // import { useRouter } from "next/navigation";

// // export default function Services() {
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [selectedFilter, setSelectedFilter] = useState("Tous");

// //   // Catégories de services
// //   const categories = [
// //     {
// //       id: "etat-civil",
// //       title: "État civil",
// //       services: [
// //         {
// //           id: "acte-naissance",
// //           title: "Acte de naissance",
// //           description: "Demander une copie d'acte de naissance",
// //         },
// //         {
// //           id: "acte-mariage",
// //           title: "Acte de mariage",
// //           description: "Demander une copie d'acte de mariage",
// //         },
// //         {
// //           id: "acte-deces",
// //           title: "Acte de décès",
// //           description: "Demander une copie d'acte de décès",
// //         },
// //         {
// //           id: "certificat-residence",
// //           title: "Certificat de résidence",
// //           description: "Obtenir un certificat de résidence",
// //         },
// //         {
// //           id: "acte-naissance",
// //           title: "Acte de naissance",
// //           description: "Demander une copie d'acte de naissance",
// //         },
// //         {
// //           id: "acte-mariage",
// //           title: "Acte de mariage",
// //           description: "Demander une copie d'acte de mariage",
// //         },
// //       ],
// //     },

// //   ];

// //   // Logique de filtrage et recherche
// //   const filteredCategories = useMemo(() => {
// //     let filtered = categories;

// //     // Filtrage par catégorie
// //     if (selectedFilter !== "Tous") {
// //       filtered = categories.filter((category) => {
// //         const filterMap: { [key: string]: string } = {
// //           "État civil": "etat-civil",
// //           "Documents administratifs": "documents-administratifs",
// //           Urbanisme: "urbanisme-logement",
// //           Environnement: "environnement-proprete",
// //           Éducation: "education-jeunesse",
// //         };
// //         return category.id === filterMap[selectedFilter];
// //       });
// //     }

// //     // Recherche par terme
// //     if (searchTerm.trim()) {
// //       filtered = filtered
// //         .map((category) => ({
// //           ...category,
// //           services: category.services.filter(
// //             (service) =>
// //               service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //               service.description
// //                 .toLowerCase()
// //                 .includes(searchTerm.toLowerCase())
// //           ),
// //         }))
// //         .filter((category) => category.services.length > 0);
// //     }

// //     return filtered;
// //   }, [searchTerm, selectedFilter, categories]);

// //   const handleSearch = () => {
// //     console.log("Recherche:", searchTerm);
// //   };

// //   const handleKeyPress = (e: React.KeyboardEvent) => {
// //     if (e.key === "Enter") {
// //       handleSearch();
// //     }
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         duration: 0.6,
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 },
// //     },
// //   };

// //   const serviceVariants = {
// //     hidden: { opacity: 0, scale: 0.9 },
// //     visible: {
// //       opacity: 1,
// //       scale: 1,
// //       transition: { duration: 0.3 },
// //     },
// //     hover: {
// //       scale: 1.02,
// //       transition: { duration: 0.2 },
// //     },
// //   };
// //   const router = useRouter();
// //   return (
// //     <div className="min-h-screen ">
// //       <motion.div
// //         className="   "
// //         initial="hidden"
// //         animate="visible"
// //         variants={containerVariants}
// //       >
// //         <motion.section
// //           className="relative text-white pt-64 pb-40  px-6 overflow-hidden"
// //           variants={itemVariants}
// //         >
// //           {/* Image de fond */}
// //           <Image
// //             src="/images/service2.svg" // ← Remplace par ton image réelle
// //             alt="Image de fond section services"
// //             fill
// //             className="object-cover  z-0"
// //             priority
// //           />

// //           {/* Overlay sombre */}
// //           {/* <div className="absolute inset-0 bg-gradient-to-t  to-primary/70 from-primary/70  z-10" /> */}

// //           {/* Contenu au premier plan */}
// //           <div className="relative z-10 max-w-4xl mx-auto text-center">
// //             <motion.h1
// //               className="text-3xl md:text-[68px] font-bold pb-10 "
// //               variants={itemVariants}
// //             >
// //               Tous les services en ligne
// //             </motion.h1>
// //             <motion.p
// //               className="text-white pb-12 text-3xl"
// //               variants={itemVariants}
// //             >
// //               Faites désormais vos demandes directement <br /> ici sans vous
// //               déplacer
// //             </motion.p>

// //             {/* Barre de recherche et filtre */}
// //             <motion.div
// //               className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
// //               variants={itemVariants}
// //             >
// //               {/* Recherche */}
// //               <div className="flex flex-1 rounded border  border-white">
// //                 <Input
// //                   type="text"
// //                   placeholder="Rechercher une démarche..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   onKeyPress={handleKeyPress}
// //                   className="flex-1 text-gray-800 border-0  rounded placeholder:text-gray-400 focus:ring-2 focus:ring-white/20"
// //                 />
// //                 <Button
// //                   onClick={handleSearch}
// //                   className="bg-white text-blue-800  hover:bg-gray-100 px-4 h-full rounded-l-none border-l border-gray-200"
// //                 >
// //                   <Search className="h-4 w-4" />
// //                 </Button>
// //               </div>

// //               {/* Filtre */}
// //               <DropdownMenu>
// //                 <DropdownMenuTrigger asChild>
// //                   <Button
// //                     variant="outline"
// //                     className="bg-transparent border py-7 rounded border-white text-white hover:bg-white hover:text-blue-800 px-6"
// //                   >
// //                     Filtre par
// //                     <ChevronDown className="ml-2 h-4 w-4" />
// //                   </Button>
// //                 </DropdownMenuTrigger>
// //                 <DropdownMenuContent className="w-48 bg-white rounded">
// //                   <DropdownMenuItem onClick={() => setSelectedFilter("Tous")}>
// //                     Tous les services
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem
// //                     onClick={() => setSelectedFilter("État civil")}
// //                   >
// //                     État civil
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem
// //                     onClick={() =>
// //                       setSelectedFilter("Documents administratifs")
// //                     }
// //                   >
// //                     Documents administratifs
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem
// //                     onClick={() => setSelectedFilter("Urbanisme")}
// //                   >
// //                     Urbanisme & Logement
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem
// //                     onClick={() => setSelectedFilter("Éducation")}
// //                   >
// //                     Éducation & Jeunesse
// //                   </DropdownMenuItem>
// //                   <DropdownMenuItem
// //                     onClick={() => setSelectedFilter("Environnement")}
// //                   >
// //                     Environnement & Propreté
// //                   </DropdownMenuItem>
// //                 </DropdownMenuContent>
// //               </DropdownMenu>
// //             </motion.div>

// //             {/* Affichage du filtre sélectionné */}
// //             {selectedFilter !== "Tous" && (
// //               <motion.div
// //                 className="mt-4"
// //                 initial={{ opacity: 0, scale: 0.9 }}
// //                 animate={{ opacity: 1, scale: 1 }}
// //               >
// //                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white">
// //                   Filtre: {selectedFilter}
// //                   <button
// //                     onClick={() => setSelectedFilter("Tous")}
// //                     className="ml-2 hover:bg-white/20 rounded-full p-1"
// //                   >
// //                     ×
// //                   </button>
// //                 </span>
// //               </motion.div>
// //             )}
// //           </div>
// //         </motion.section>

// //        <motion.div className="relative overflow-hidden">
// //   {/* Vidéo de fond */}
// //   <video
// //     autoPlay
// //     loop
// //     muted
// //     playsInline
// //     className="absolute inset-0 w-full h-full object-cover z-0"
// //   >
// //     <source src="/videos/blue-digital.mp4" type="video/mp4" />
// //     Votre navigateur ne supporte pas la vidéo HTML5.
// //   </video>

// //   {/* Overlay si besoin */}
// //   {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}

// //   {/* Contenu principal */}
// //   <motion.div
// //     className="relative z-[1] p-10  lg:max-w-8xl mx-auto"
// //     variants={itemVariants}
// //   >
// //     {filteredCategories.length === 0 ? (
// //       <motion.div
// //         className="p-12 text-center"
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //       >
// //         <p className="text-gray-100 text-lg">
// //           Aucun service trouvé pour votre recherche.
// //         </p>
// //       </motion.div>
// //     ) : (
// //       filteredCategories.map((category, categoryIndex) => (
// //         <motion.div
// //           key={category.id}
// //           className="mb-8 p-7"
// //           variants={itemVariants}
// //           custom={categoryIndex}
// //         >
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
// //             {category.services.map((service, serviceIndex) => (
// //               <motion.div
// //                 onClick={() => router.push(`/services/${service.id}`)}
// //                 key={service.id}
// //                 className="group bg-white cursor-pointer rounded-xl border-2 border-blue-800 p-4 hover:bg-[#EF9213]"
// //                 variants={serviceVariants}
// //                 whileHover="hover"
// //                 custom={serviceIndex}
// //               >
// //                 <div className="flex items-center mb-2">
// //                   <motion.div
// //                     className="bg-primary p-7 rounded-[10px] mr-3 group-hover:bg-white"
// //                     whileHover={{ rotate: 360 }}
// //                     transition={{ duration: 0.5 }}
// //                   >
// //                     <FileText
// //                       size={40}
// //                       className="text-white group-hover:text-[#EF9213]"
// //                     />
// //                   </motion.div>
// //                   <h3 className="font-bold text-xl text-black group-hover:text-white">
// //                     {service.title}
// //                   </h3>
// //                 </div>

// //                 <p className="text-black pb-20 text-lg mb-3 py-4 group-hover:text-white">
// //                   {service.description}
// //                 </p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </motion.div>
// //       ))
// //     )}
// //   </motion.div>
// // </motion.div>

// //       </motion.div>
// //       <ServiceCard />
// //     </div>
// //   );
// // }
// "use client"
// import type React from "react"
// import { FileText, Search, ChevronDown } from "lucide-react"
// import { useState, useMemo } from "react"
// import { motion } from "framer-motion"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// // import ServiceCard from "@/components/service-card"; // Assuming this is an external component
// import Image from "next/image"
// import { useRouter } from "next/navigation"
// import ServiceCard from "@/components/service-card"
// // import OrganizationGrid from "@/components/organistaion-grid"; // Assuming this is an external component

// export default function Services() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedFilter, setSelectedFilter] = useState("Tous")

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   }

//   const serviceVariants = {
//     hidden: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: { duration: 0.3 },
//     },
//     hover: {
//       scale: 1.02,
//       transition: { duration: 0.2 },
//     },
//   }

//   // Catégories de services
//   const categories = [
//     {
//       id: "etat-civil",
//       title: "État civil",
//       services: [
//         {
//           id: "acte-naissance",
//           title: "Acte de naissance",
//           description: "Demander une copie d'acte de naissance",
//         },
//         {
//           id: "acte-mariage",
//           title: "Acte de mariage",
//           description: "Demander une copie d'acte de mariage",
//         },
//         {
//           id: "acte-deces",
//           title: "Acte de décès",
//           description: "Demander une copie d'acte de décès",
//         },
//         {
//           id: "certificat-residence",
//           title: "Certificat de résidence",
//           description: "Obtenir un certificat de résidence",
//         },
//         {
//           id: "acte-naissance",
//           title: "Acte de naissance",
//           description: "Demander une copie d'acte de naissance",
//         },
//         {
//           id: "acte-mariage",
//           title: "Acte de mariage",
//           description: "Demander une copie d'acte de mariage",
//         },
//       ],
//     },
//   ]

//   // Logique de filtrage et recherche
//   const filteredCategories = useMemo(() => {
//     let filtered = categories
//     // Filtrage par catégorie
//     if (selectedFilter !== "Tous") {
//       filtered = categories.filter((category) => {
//         const filterMap: { [key: string]: string } = {
//           "État civil": "etat-civil",
//           "Documents administratifs": "documents-administratifs",
//           Urbanisme: "urbanisme-logement",
//           Environnement: "environnement-proprete",
//           Éducation: "education-jeunesse",
//         }
//         return category.id === filterMap[selectedFilter]
//       })
//     }
//     // Recherche par terme
//     if (searchTerm.trim()) {
//       filtered = filtered
//         .map((category) => ({
//           ...category,
//           services: category.services.filter(
//             (service) =>
//               service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//               service.description.toLowerCase().includes(searchTerm.toLowerCase()),
//           ),
//         }))
//         .filter((category) => category.services.length > 0)
//     }
//     return filtered
//   }, [searchTerm, selectedFilter, categories])

//   const handleSearch = () => {
//     console.log("Recherche:", searchTerm)
//   }

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       handleSearch()
//     }
//   }

//   const router = useRouter()

//   return (
//     <div className="min-h-screen ">
//       <motion.div className=" " initial="hidden" animate="visible" variants={containerVariants}>
//         <motion.section className="relative text-white pt-64 pb-56 px-6 overflow-hidden" variants={itemVariants}>
//           {/* Image de fond */}
//           <Image
//             src="/images/service2.svg" // ← Remplace par ton image réelle
//             alt="Image de fond section services"
//             fill
//             className="object-cover z-0"
//             priority
//           />
//           {/* Overlay sombre */}
//           <div className="absolute inset-0 bg-gradient-to-t to-primary/40 from-primary/40 z-10" />
//           {/* Contenu au premier plan */}
//           <div className="relative z-10 max-w-6xl mx-auto text-center">
//             <motion.h1 className="text-4xl md:text-7xl pt-7 font-bold mb-4" variants={itemVariants}>
//               Tous les services en ligne
//             </motion.h1>
//             <motion.p className="text-white pb-12 text-3xl" variants={itemVariants}>
//               Faites désormais vos demandes directement <br /> ici sans vous déplacer
//             </motion.p>
//             {/* Barre de recherche et filtre */}
//             <motion.div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto" variants={itemVariants}>
//               {/* Recherche */}
//               <div className="flex flex-1 rounded border border-white">
//                 <Input
//                   type="text"
//                   placeholder="Rechercher une démarche..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   className="flex-1 text-gray-800 border-0 rounded placeholder:text-gray-400 focus:ring-2 focus:ring-white/20"
//                 />
//                 <Button
//                   onClick={handleSearch}
//                   className="bg-white text-blue-800 hover:bg-gray-100 px-4 h-full rounded-l-none border-l border-gray-200"
//                 >
//                   <Search className="h-4 w-4" />
//                 </Button>
//               </div>
//               {/* Filtre */}
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button
//                     variant="outline"
//                     className="bg-transparent border py-7 rounded border-white text-white hover:bg-white hover:text-blue-800 px-6"
//                   >
//                     Filtre par
//                     <ChevronDown className="ml-2 h-4 w-4" />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent className="w-48 bg-white rounded">
//                   <DropdownMenuItem onClick={() => setSelectedFilter("Tous")}>Tous les services</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSelectedFilter("État civil")}>État civil</DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSelectedFilter("Documents administratifs")}>
//                     Documents administratifs
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSelectedFilter("Urbanisme")}>
//                     Urbanisme & Logement
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSelectedFilter("Éducation")}>
//                     Éducation & Jeunesse
//                   </DropdownMenuItem>
//                   <DropdownMenuItem onClick={() => setSelectedFilter("Environnement")}>
//                     Environnement & Propreté
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </motion.div>
//             {/* Affichage du filtre sélectionné */}
//             {selectedFilter !== "Tous" && (
//               <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
//                 <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white">
//                   Filtre: {selectedFilter}
//                   <button onClick={() => setSelectedFilter("Tous")} className="ml-2 hover:bg-white/20 rounded-full p-1">
//                     ×
//                   </button>
//                 </span>
//               </motion.div>
//             )}
//           </div>
//         </motion.section>
//         <motion.div className="relative overflow-hidden">
//           {/* Vidéo de fond */}
//           <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
//             <source src="/videos/blue-digital.mp4" type="video/mp4" />
//             Votre navigateur ne supporte pas la vidéo HTML5.
//           </video>
//           {/* Overlay si besoin */}
//           {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}
//           {/* Contenu principal */}
//           <motion.div className="relative z-[1] p-10 lg:max-w-8xl mx-auto" variants={itemVariants}>
//             {filteredCategories.length === 0 ? (
//               <motion.div className="p-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <p className="text-gray-100 text-lg">Aucun service trouvé pour votre recherche.</p>
//               </motion.div>
//             ) : (
//               filteredCategories.map((category, categoryIndex) => (
//                 <motion.div
//                   key={category.id}
//                   className="mb-8 p-7"
//                   variants={containerVariants} // Use containerVariants for staggering children
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true, amount: 0.2 }}
//                   custom={categoryIndex}
//                 >
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {category.services.map((service, serviceIndex) => (
//                       <motion.div
//                         onClick={() => window.location.href = `/services/${service.id}`}
//                         key={service.id}
//                         className="group bg-white cursor-pointer rounded-xl border-2 border-blue-800 p-4 hover:bg-[#EF9213]"
//                         variants={serviceVariants}
//                         whileHover="hover"
//                         custom={serviceIndex}
//                       >
//                         <div className="flex items-center mb-2">
//                           <motion.div
//                             className="bg-primary p-7 rounded-[10px] mr-3 group-hover:bg-white"
//                             whileHover={{ rotate: 360 }}
//                             transition={{ duration: 0.5 }}
//                           >
//                             <FileText size={40} className="text-white group-hover:text-[#EF9213]" />
//                           </motion.div>
//                           <h3 className="font-bold text-xl text-black group-hover:text-white">{service.title}</h3>
//                         </div>
//                         <p className="text-black pb-20 text-lg mb-3 py-4 group-hover:text-white">
//                           {service.description}
//                         </p>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </motion.div>
//               ))
//             )}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//        <ServiceCard /> 
//     </div>
//   )
// }
"use client"
import type React from "react"
import { FileText, Search, ChevronDown } from "lucide-react"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ServiceCard from "@/components/service-card"
import { servicesData } from "@/lib/services-data"

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("Tous")
  const router = useRouter()

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const serviceVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
  }

  // Logique de filtrage et recherche
  const filteredCategories = useMemo(() => {
    let filtered = servicesData

    // Filtrage par catégorie
    if (selectedFilter !== "Tous") {
      const filterMap: { [key: string]: string } = {
        "État civil": "etat-civil",
        "Documents administratifs": "documents-administratifs",
        Urbanisme: "urbanisme-logement",
        Environnement: "environnement-proprete",
        Éducation: "education-jeunesse",
        "Services généraux": "services-generaux",
      }
      filtered = servicesData.filter((category) => {
        return category.id === filterMap[selectedFilter]
      })
    }

    // Recherche par terme
    if (searchTerm.trim()) {
      filtered = filtered
        .map((category) => ({
          ...category,
          services: category.services.filter(
            (service) =>
              service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              service.description.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
        }))
        .filter((category) => category.services.length > 0)
    }

    return filtered
  }, [searchTerm, selectedFilter])

  const handleSearch = () => {
    console.log("Recherche:", searchTerm)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen">
      <motion.div className="" initial="hidden" animate="visible" variants={containerVariants}>
        <motion.section className="relative text-white pt-64 pb-56 px-6 overflow-hidden" variants={itemVariants}>
          {/* Image de fond */}
          <Image
            src="/images/service2.svg"
            alt="Image de fond section services"
            fill
            className="object-cover z-0"
            priority
          />
          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-t to-primary/40 from-primary/40 z-10" />
          {/* Contenu au premier plan */}
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.h1 className="text-4xl md:text-7xl pt-7 font-bold mb-4" variants={itemVariants}>
              Tous les services en ligne
            </motion.h1>
            <motion.p className="text-white pb-12 text-3xl" variants={itemVariants}>
              Faites désormais vos demandes directement <br /> ici sans vous déplacer
            </motion.p>
            {/* Barre de recherche et filtre */}
            <motion.div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto" variants={itemVariants}>
              {/* Recherche */}
              <div className="flex flex-1 rounded border border-white">
                <Input
                  type="text"
                  placeholder="Rechercher une démarche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 text-gray-800 border-0 rounded placeholder:text-gray-400 focus:ring-2 focus:ring-white/20"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-white text-blue-800 hover:bg-gray-100 px-4 h-full rounded-l-none border-l border-gray-200"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              {/* Filtre */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-transparent border py-7 rounded border-white text-white hover:bg-white hover:text-blue-800 px-6"
                  >
                    Filtre par
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white rounded">
                  <DropdownMenuItem onClick={() => setSelectedFilter("Tous")}>Tous les services</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("État civil")}>État civil</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("Documents administratifs")}>
                    Documents administratifs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("Urbanisme")}>
                    Urbanisme & Logement
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("Éducation")}>
                    Éducation & Jeunesse
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("Environnement")}>
                    Environnement & Propreté
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedFilter("Services généraux")}>
                    Services généraux
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
            {/* Affichage du filtre sélectionné */}
            {selectedFilter !== "Tous" && (
              <motion.div className="mt-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white/20 text-white">
                  Filtre: {selectedFilter}
                  <button onClick={() => setSelectedFilter("Tous")} className="ml-2 hover:bg-white/20 rounded-full p-1">
                    ×
                  </button>
                </span>
              </motion.div>
            )}
          </div>
        </motion.section>

        <motion.div className="relative overflow-hidden">
          {/* Vidéo de fond */}
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
            <source src="/videos/blue-digital.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo HTML5.
          </video>

          {/* Contenu principal */}
          <motion.div className="relative z-[1] p-10 lg:max-w-8xl mx-auto" variants={itemVariants}>
            {filteredCategories.length === 0 ? (
              <motion.div className="p-12 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <p className="text-gray-100 text-lg">Aucun service trouvé pour votre recherche.</p>
              </motion.div>
            ) : (
              filteredCategories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  className="mb-8 p-7"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  custom={categoryIndex}
                >
                  <h2 className="text-3xl font-bold text-white mb-6 text-center">{category.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.services.map((service, serviceIndex) => (
                      <motion.div
                        onClick={() => router.push(`/services/${service.id}`)}
                        key={service.id}
                        className="group bg-white cursor-pointer rounded-xl border-2 border-blue-800 p-4 hover:bg-[#EF9213]"
                        variants={serviceVariants}
                        whileHover="hover"
                        custom={serviceIndex}
                      >
                        <div className="flex items-center mb-2">
                          <motion.div
                            className="bg-primary p-7 rounded-[10px] mr-3 group-hover:bg-white"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <FileText size={40} className="text-white group-hover:text-[#EF9213]" />
                          </motion.div>
                          <h3 className="font-bold text-xl text-black group-hover:text-white">{service.title}</h3>
                        </div>
                        <p className="text-black pb-20 text-lg mb-3 py-4 group-hover:text-white">
                          {service.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </motion.div>
      <ServiceCard />
    </div>
  )
}
