// // import Link from "next/link";
// // import Image from "next/image";
// // import { ArrowRight } from "lucide-react";
// // import { Button } from "@/components/ui/button";

// // export default function Home() {
// //   return (
// //     <div>
// //       {/* Hero Section */}
// //       <section className="bg-[#D9D9D9] min-h-[60vh] flex items-center justify-center py-12 text-center">
// //         <div className="">
// //           <h1 className="text-3xl md:text-6xl  font-extrabold text-primary mb-6">
// //             BIENVENUE DANS <br /> VOTRE COMMUNE
// //           </h1>
// //         </div>
// //       </section>

// //       {/* Stats Section */}
// //       <section className="py-12 ">
// //         <div className="flex justify-center space-y-4 flex-col items-center">
// //           <Image
// //             src="/images/folder.svg"
// //             alt="Logo Commune du Plateau"
// //             width={500}
// //             height={500}
// //             className="rounded-full "
// //           />
// //           <p className="text-secondary font-bold md:text-5xl text-center text-2xl">
// //             Vos démarches, simples et <br /> rapides
// //           </p>
// //           <p className="text-2xl text-black font-light text-center opacity-70">
// //             Faites vos demandes sans vous déplacer : état civil, <br />{" "}
// //             rendez-vous, réservations, signalements...
// //           </p>
// //         </div>
// //         <div className="md:px-4 px-4 mt-10 flex justify-center items-center">
// //           <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
// //             <div className="bg-primary lg:px-20 px-4 py-7 lg:py-5 rounded-xl text-white text-center">
// //               <div className="text-2xl font-normal  ">
// //                 Demander un acte
// //                 <br />
// //                 de naissance
// //               </div>
// //             </div>
// //             <div className="bg-primary lg:px-20 px-4 py-7 lg:py-5 rounded-xl text-white text-center">
// //               <div className="text-2xl font-normal  ">
// //                 Prendre rendez-vous
// //                 <br />à la mairie
// //               </div>
// //             </div>
// //             <div className="bg-primary lg:px-20 px-4 py-7 lg:py-5 rounded-xl text-white text-center">
// //               <div className="text-2xl font-normal  ">
// //                 Déposer un <br /> dossier
// //               </div>
// //             </div>
// //             <div className="bg-primary lg:px-20 px-4 py-7 lg:py-5 rounded-xl text-white text-center">
// //               <div className="text-2xl font-normal  ">
// //                 Signaler un <br /> problème
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       {/* Band Section */}
// //       <section className="bg-secondary py-7 flex items-center gap-x-7 justify-center lg:px-16 px-4">
// //         <p className="text-white text-2xl">1.4 Millions d’Habitants</p>
// //         <div className="h-3 w-3 rounded-full bg-white"></div>
// //         <p className="text-white text-2xl">100Km2</p>
// //         <div className="h-3 w-3 rounded-full bg-white"></div>
// //         <p className="text-white text-2xl">8,9 % d’emploi</p>
// //       </section>
// //       {/* News Section */}
// //       <section className="py-8">
// //         <div className="container-custom">
// //           <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg">
// //             <Image
// //               src="/images/maire.svg"
// //               alt="Le Maire"
// //               width={260}
// //               height={260}
// //               className="rounded-full"
// //             />
// //             <div>
// //               <h2 className="text-4xl font-semibold text-secondary mb-4">
// //                 Mot du Maire
// //               </h2>
// //               <p className=" text-black text-lg leading-10 mb-4">
// //                 Le Plateau est une des communes de la ville d’Abidjan, elle est
// //                 entourée par la commune de Yopougon à l’ouest, au sud par
// //                 la lagune Ébrié, la commune de Treichville. En tant que quartier
// //                 d’affaires, il rassemble la majeure partie des activités
// //                 administratives et commerciales de la ville. La plupart des
// //                 grandes firmes ivoiriennes ont leur siège social au Plateau. Il
// //                 est également doté d’un marché très animé.
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="py-12 bg-[#F5F5F5]">
// //         <div className="container-custom space-y-7">
// //           <h2 className="lg:text-5xl text-2xl font-extrabold text-center text-primary ">
// //             À la une du plateau
// //           </h2>
// //           <p className="text-2xl  text-black font-light text-center opacity-70">
// //             Restez informé de la vie locale et des décisions municipales.
// //           </p>
// //           <div className="grid md:grid-cols-3 gap-6 ">
// //             <div className=" overflow-hidden ">
// //               <Image
// //                 src="/images/actu1.svg"
// //                 alt="Actualité"
// //                 width={400}
// //                 height={200}
// //                 className="w-full h-48 object-cover rounded-xl shadow"
// //               />
// //               <div className="py-4">
// //                 <h3 className="font-bold text-secondary text-lg mb-2">
// //                   Rénovation du centre-ville
// //                 </h3>
// //                 <p className="font-semibold text-lg mb-3">
// //                   Les travaux de rénovation du centre-ville débuteront le mois
// //                   prochain pour une durée de 6 mois.
// //                 </p>

// //               </div>
// //             </div>

// //             <div className=" overflow-hidden ">
// //               <Image
// //                 src="/images/actu2.svg"
// //                 alt="Actualité"
// //                 width={400}
// //                 height={200}
// //                 className="w-full h-48 object-cover rounded-xl shadow"
// //               />
// //               <div className="py-4">
// //                 <h3 className="font-bold text-secondary text-lg mb-2">
// //                   Rénovation du centre-ville
// //                 </h3>
// //                 <p className="font-semibold text-lg mb-3">
// //                   Les travaux de rénovation du centre-ville débuteront le mois
// //                   prochain pour une durée de 6 mois.
// //                 </p>

// //               </div>
// //             </div>
// //             <div className=" overflow-hidden ">
// //               <Image
// //                 src="/images/actu3.svg"
// //                 alt="Actualité"
// //                 width={400}
// //                 height={200}
// //                 className="w-full h-48 object-cover rounded-xl shadow"
// //               />
// //               <div className="py-4">
// //                 <h3 className="font-bold text-secondary text-lg mb-2">
// //                   Rénovation du centre-ville
// //                 </h3>
// //                 <p className="font-semibold text-lg mb-3">
// //                   Les travaux de rénovation du centre-ville débuteront le mois
// //                   prochain pour une durée de 6 mois.
// //                 </p>

// //               </div>
// //             </div>
// //           </div>

// //           <div className="text-center mt-8">
// //             <Link href="/actualites" className="btn-secondary text-lg">
// //               Voir toutes les actualités
// //             </Link>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="my-10 mx-2">
// //         <div className="container-custom mx-auto bg-primary relative  text-white py-12 md:p-6 rounded-2xl mb-8">
// //           <div className="grid lg:grid-cols-4 gap-8 items-center">
// //             <div className="space-y-6 p-10 col-span-3 w-full">
// //               <div className="space-y-4 ">
// //                 <h1 className="text-4xl md:text-5xl font-bold">
// //                   Mon espace citoyen
// //                 </h1>
// //                 <p className="text-lg text-blue-100 leading-relaxed">
// //                   Un espace personnel pour suivre vos demandes,
// //                   <br />
// //                   recevoir des messages, et interagir avec votre mairie.
// //                 </p>
// //               </div>

// //               <div className="flex md:flex-col flex-col gap-5">
// //                 <Button
// //                   variant="outline"
// //                   size="lg"
// //                   className="bg-transparent w-full max-w-xs border rounded border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-base font-medium"
// //                 >
// //                   Se connecter
// //                 </Button>
// //                 <Button
// //                   size="lg"
// //                   className="bg-secondary w-full max-w-xs rounded hover:bg-secondary/80 text-white px-8 py-3 text-base font-medium"
// //                 >
// //                   Créer mon compte
// //                 </Button>
// //               </div>
// //             </div>

// //             <div className="flex justify-center md:absolute bottom-0 right-0 lg:justify-end">
// //               <div className="relative">
// //                 <Image
// //                   src="/images/man.svg"
// //                   alt="Professionnel travaillant sur ordinateur"
// //                   width={500}
// //                   height={500}
// //                   className="rounded-lg object-cover"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       <section className="relative overflow-hidden py-7">
// //         {/* Image de fond avec overlay */}
// //         <div className="absolute inset-0">
// //           <Image
// //             src="/images/abidjan.svg"
// //             alt="Vue aérienne de la ville"
// //             width={800}
// //             height={400}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-[#0D4C8EB2]/70"></div>
// //         </div>

// //         {/* Contenu */}
// //         <div className="relative z-10 py-16 px-6 text-center text-white">
// //           <div className="max-w-4xl mx-auto space-y-6">
// //             <h2 className="text-4xl md:text-5xl font-bold">
// //               Le Plateau à portée de clic
// //             </h2>
// //             <p className="text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
// //               Visualisez les services municipaux, les projets
// //               <br />
// //               en cours et les équipements de proximité.
// //             </p>

// //             <div className="pt-4">
// //               <Button
// //                 size="lg"
// //                 className="bg-white text-secondary  rounded px-8 py-3 text-base font-medium"
// //               >
// //                 Tout savoir sur la mairie
// //                 <ArrowRight className="ml-2 h-5 w-5" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </section>
// //       {/* Services Section */}
// //     </div>
// //   );
// // }

// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { ArrowRight } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { motion } from "framer-motion"
// import PageLoader from "@/components/page-loader"
// import HeroSection from "@/components/layout/hero-section"
// import CarouselComponent from "@/components/carousel-home"
// // import PageLoader from "@/components/page-loader"

// const fadeInUp = {
//   initial: { opacity: 0, y: 60 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.6 },
// }

// const staggerContainer = {
//   animate: {
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// }

// const scaleIn = {
//   initial: { opacity: 0, scale: 0.8 },
//   animate: { opacity: 1, scale: 1 },
//   transition: { duration: 0.5 },
// }

// export default function Home() {
//   return (
//     <PageLoader title="Commune du Plateau">
//       <div>
//         {/* Hero Section */}
//         {/* <motion.section
//           className="bg-[#D9D9D9] min-h-[60vh] flex items-center justify-center py-12 text-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <div className="">
//             <motion.h1
//               className="text-3xl md:text-6xl font-extrabold text-primary mb-6"
//               initial={{ opacity: 0, y: 50 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               BIENVENUE DANS <br /> VOTRE COMMUNE
//             </motion.h1>
//           </div>
//         </motion.section> */}
//         <HeroSection />

//         {/* Stats Section */}

//         {/* Band Section */}

//         {/* News Section */}
//         <motion.section
//           className="py-8 mt-28"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="container-custom">
//             <motion.div
//               className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6 }}
//             >
//               {/* <motion.div
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               > */}
//                 <Image src="/images/maire.svg" alt="Le Maire" width={260} height={260} className="rounded-full" />
//               {/* </motion.div> */}
//               <motion.div
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <h2 className="text-4xl font-semibold text-secondary mb-4">Mot du Maire</h2>
//                 <p className="text-black text-lg leading-10 mb-4">
//                   Le Plateau est une des communes de la ville d'Abidjan, elle est entourée par la commune de Yopougon à
//                   l'ouest, au sud par la lagune Ébrié, la commune de Treichville. En tant que quartier d'affaires, il
//                   rassemble la majeure partie des activités administratives et commerciales de la ville. La plupart des
//                   grandes firmes ivoiriennes ont leur siège social au Plateau. Il est également doté d'un marché très
//                   animé.
//                 </p>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.section>
//  <motion.section
//           className="relative overflow-hidden py-2"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Image de fond avec overlay */}
//           <div className="absolute inset-0">
//             <Image
//               src="/images/home-slide-bg.svg"
//               alt="Vue aérienne de la ville"
//               width={400}
//               height={200}
//               className="w-full h-[full] object-cover"
//             />
//             <div className="absolute inset-0 bg-[#34A853]/60"></div>
//           </div>

//           {/* Contenu */}
//          <CarouselComponent />
//         </motion.section>
//         <motion.section
//           className="py-12 bg-[#F5F5F5]"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="container-custom space-y-7">
//             <motion.h2 className="lg:text-5xl text-2xl font-extrabold text-center text-primary" {...fadeInUp}>
//               À la une du plateau
//             </motion.h2>
//             <motion.p
//               className="text-2xl text-black font-light text-center opacity-70"
//               {...fadeInUp}
//               transition={{ delay: 0.2, duration: 0.6 }}
//             >
//               Restez informé de la vie locale et des décisions municipales.
//             </motion.p>
//             <motion.div
//               className="grid md:grid-cols-3 gap-6"
//               variants={staggerContainer}
//               initial="initial"
//               whileInView="animate"
//               viewport={{ once: true }}
//             >
//               {[
//                 { src: "/images/actu1.svg", title: "Rénovation du centre-ville" },
//                 { src: "/images/actu2.svg", title: "Rénovation du centre-ville" },
//                 { src: "/images/actu3.svg", title: "Rénovation du centre-ville" },
//               ].map((item, index) => (
//                 <motion.div
//                   key={index}
//                   className="overflow-hidden"
//                   variants={scaleIn}
//                   whileHover={{ y: -10, transition: { duration: 0.3 } }}
//                 >
//                   <Image
//                     src={item.src || "/placeholder.svg"}
//                     alt="Actualité"
//                     width={400}
//                     height={200}
//                     className="w-full h-48 object-cover rounded-xl shadow"
//                   />
//                   <div className="py-4">
//                     <h3 className="font-bold text-secondary text-lg mb-2">{item.title}</h3>
//                     <p className="font-semibold text-lg mb-3">
//                       Les travaux de rénovation du centre-ville débuteront le mois prochain pour une durée de 6 mois.
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             <motion.div
//               className="text-center mt-8"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.8 }}
//             >
//               <Link href="/actualites" className="btn-primary text-lg">
//                 Voir toutes les actualités
//               </Link>
//             </motion.div>
//           </div>
//         </motion.section>

//         <motion.section
//           className="my-10 mx-2"
//           initial={{ opacity: 0, scale: 0.95 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           <div className="container-custom mx-auto bg-primary relative text-white py-12 md:p-6 rounded-2xl mb-8">
//             <div className="grid lg:grid-cols-4 gap-8 items-center">
//               <motion.div
//                 className="space-y-6 p-10 col-span-3 w-full"
//                 initial={{ opacity: 0, x: -50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <div className="space-y-4">
//                   <h1 className="text-4xl md:text-5xl font-bold">Mon espace citoyen</h1>
//                   <p className="text-lg text-blue-100 leading-relaxed">
//                     Un espace personnel pour suivre vos demandes,
//                     <br />
//                     recevoir des messages, et interagir avec votre mairie.
//                   </p>
//                 </div>

//                 <motion.div
//                   className="flex md:flex-col flex-col gap-5"
//                   variants={staggerContainer}
//                   initial="initial"
//                   whileInView="animate"
//                   viewport={{ once: true }}
//                 >
//                   <motion.div variants={scaleIn}>
//                     <Button
//                       variant="outline"
//                       size="lg"
//                       className="bg-transparent w-full max-w-xs border rounded border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-base font-medium"
//                     >
//                       Se connecter
//                     </Button>
//                   </motion.div>
//                   <motion.div variants={scaleIn}>
//                     <Button
//                       size="lg"
//                       className="bg-secondary w-full max-w-xs rounded hover:bg-secondary/80 text-white px-8 py-3 text-base font-medium"
//                     >
//                       Créer mon compte
//                     </Button>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 className="flex justify-center md:absolute bottom-0 right-0 lg:justify-end"
//                 initial={{ opacity: 0, x: 50 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.3 }}
//               >
//                 <div className="relative">
//                   <Image
//                     src="/images/man.svg"
//                     alt="Professionnel travaillant sur ordinateur"
//                     width={500}
//                     height={500}
//                     className="rounded-lg object-cover"
//                   />
//                 </div>
//               </motion.div>
//             </div>
//           </div>
//         </motion.section>

//         <motion.section
//           className="relative overflow-hidden py-7"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//         >
//           {/* Image de fond avec overlay */}
//           <div className="absolute inset-0">
//             <Image
//               src="/images/abidjan.svg"
//               alt="Vue aérienne de la ville"
//               width={800}
//               height={400}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-[#0D4C8EB2]/70"></div>
//           </div>

//           {/* Contenu */}
//           <div className="relative z-10 py-16 px-6 text-center text-white">
//             <motion.div
//               className="max-w-4xl mx-auto space-y-6"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.h2
//                 className="text-4xl md:text-5xl font-bold"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.2 }}
//               >
//                 Le Plateau à portée de clic
//               </motion.h2>
//               <motion.p
//                 className="text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 Visualisez les services municipaux, les projets
//                 <br />
//                 en cours et les équipements de proximité.
//               </motion.p>

//               <motion.div
//                 className="pt-4"
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.6, delay: 0.6 }}
//               >
//                 <Button size="lg" className="bg-secondary text-white hover:bg-secondary rounded px-8 py-3 text-base font-medium">
//                   Tout savoir sur la mairie
//                   <ArrowRight className="ml-2 h-5 w-5" />
//                 </Button>
//               </motion.div>
//             </motion.div>
//           </div>
//         </motion.section>
//       </div>
//     </PageLoader>
//   )
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import PageLoader from "@/components/page-loader";
import HeroSection from "@/components/layout/hero-section";
import CarouselComponent from "@/components/carousel-home";
import DotsAnimation from "@/components/gradient";
import { useRestaurantsQuery } from "@/hooks/places/use-places-queries";
import { useCommuniques } from "@/hooks/communiques/use-communiques-queries";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getImageUrl } from "@/lib/api/client";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("all")
    const [selectedPeriod, setSelectedPeriod] = useState("all")
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6
   const router = useRouter()
   const { data: restaurantsData, isLoading: restaurantsLoading } = useRestaurantsQuery({ limit: 8 })
    const {
       data: communiquesData,
       isLoading,
       error,
     } = useCommuniques({
       page: currentPage,
       limit: itemsPerPage,
       search: searchTerm || undefined,
       type: selectedCategory !== "all" ? selectedCategory : undefined,
     })
  return (
    
      <div>
        {/* Hero Section */}
        <HeroSection />

        {/* Stats Section */}

        {/* Band Section */}

        {/* News Section */}
        <motion.section
          className="py-20 mt-28"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-4 lg:px-20">
            <motion.div
              className="flex flex-col md:flex-row items-center gap-6 lg:gap-20 bg-white p-6 "
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Image animée au survol */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="rounded-lg overflow-hidden"
              >
                <Image
                  src="https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1215,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2021/09/29/jad20210929-ass-ci-jacquesehouo.jpg"
                  alt="Le Maire"
                  width={2000}
                  height={2000}
                  className="rounded-[8px]"
                />
              </motion.div>

              {/* Bloc texte animé au survol */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{
                  scale: 1.02,
                  // boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                  transition: { type: "spring", stiffness: 250 },
                }}
                className="transition-all max-w-5xl"
              >
                <h2 className="text-7xl font-semibold text-secondary mb-4">
                  Mot du Maire
                </h2>
                <p className="text-black text-2xl leading-[50px] mb-4">
                  Le Plateau est une des communes de la ville d'Abidjan, elle
                  est entourée par la commune de Yopougon à l'ouest, au sud par
                  la lagune Ébrié, la commune de Treichville. En tant que
                  quartier d'affaires, il rassemble la majeure partie des
                  activités administratives et commerciales de la ville. La
                  plupart des grandes firmes ivoiriennes ont leur siège social
                  au Plateau. Il est également doté d'un marché très animé.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <h2 className="text-5xl font-semibold text-center text-secondary my-10">
          Découvrez nos plus beaux atouts.
        </h2>
        <motion.section
          className="relative overflow-hidden py-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/home-slide-bg.svg"
              alt="Vue aérienne de la ville"
              width={400}
              height={200}
              className="w-full h-[full] object-cover"
            />
            <div className="absolute inset-0 bg-[#34A853]/60"></div>
          </div>
          {/* Contenu */}

          <CarouselComponent 
        restaurantsData={restaurantsData?.data} 
        restaurantsLoading={restaurantsLoading}
      />
        </motion.section>
 {/* <motion.section
          className="py-12 bg-[#F5F5F5]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <DotsAnimation />
          <div className="lg:px-28 px-7 space-y-7">
            <motion.h2
              className="lg:text-5xl text-2xl font-extrabold text-center text-primary"
              {...fadeInUp}
            >
              À la une du plateau
            </motion.h2>
            <motion.p
              className="text-2xl text-black font-light text-center opacity-70"
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Restez informé de la vie locale et des décisions municipales.
            </motion.p>
            <motion.div
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              // viewport={{ once: true }}
            >
              <div>
                <motion.div
                  className="overflow-hidden rounded-xl p-16 flex justify-center items-center bg-red-600"
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Image
                    src="/images/a.svg"
                    alt="Actualité"
                    width={100}
                    height={100}
                    className="w-40  object-contain rounded-xl "
                  />
                </motion.div>
                <div className="py-4">
                  <h3 className="font-bold text-red-500 text-xl mb-2">
                    ALerte
                  </h3>
                  <p className="font-semibold text-2xl mb-3">
                    Coupure d’eau mardi - <br /> Quartier Banque
                  </p>
                </div>
              </div>
              <div>
                <motion.div
                  className="overflow-hidden rounded-xl p-16 flex justify-center items-center bg-green-600"
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Image
                    src="/images/b.svg"
                    alt="Actualité"
                    width={100}
                    height={100}
                    className="w-40  object-contain rounded-xl "
                  />
                </motion.div>
                <div className="py-4">
                  <h3 className="font-bold text-green-500 text-xl mb-2">
                    Evenements
                  </h3>
                  <p className="font-semibold text-2xl mb-3">
                    Forum emploi jeunes – 8 juin, Place Lagune
                  </p>
                </div>
              </div>
              <div>
                <motion.div
                  className="overflow-hidden rounded-xl p-16 flex justify-center items-center bg-white border border-[#EF9213]"
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Image
                    src="/images/c.svg"
                    alt="Actualité"
                    width={100}
                    height={100}
                    className="w-40  object-contain rounded-xl "
                  />
                </motion.div>
                <div className="py-4">
                  <h3 className="font-bold text-[#EF9213] text-xl mb-2">
                    Projet
                  </h3>
                  <p className="font-semibold text-2xl mb-3">
                    Travaux rue du Commerce dès le 15 juin
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="text-center mt-8 "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Button
                variant="outline"
                className="text-lg text-white px-8 py-7 font-medium rounded-[7px] border bg-primary hover:bg-primary hover:text-white"
              >
                <div onClick={() => (window.location.href = "/actualites")}>
                  Voir toutes les actualités
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.section> */}
       
<motion.section
      className="py-12 bg-[#F5F5F5]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <DotsAnimation />
      <div className="lg:px-28 px-7 space-y-7">
        <motion.h2
          className="lg:text-5xl text-2xl font-extrabold text-center text-primary"
          {...fadeInUp}
        >
          À la une du plateau
        </motion.h2>
        <motion.p
          className="text-2xl text-black font-light text-center opacity-70"
          {...fadeInUp}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Restez informé de la vie locale et des décisions municipales.
        </motion.p>

        {isLoading && <p className="text-center">Chargement...</p>}
        {error && <p className="text-center text-red-500">Erreur lors du chargement</p>}

        {!isLoading && !error && (
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
          >
            {communiquesData?.data?.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => router.push(`/actualites/${item.id}`)}
              >
                <motion.div
                  className="overflow-hidden rounded-xl p-0 flex justify-center items-center bg-white border border-gray-200"
                  variants={scaleIn}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Image
                    src={getImageUrl(item.poster) || "/placeholder.svg"}
                    alt={item.title}
                    width={100}
                    height={100}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                </motion.div>
                <div className="py-4">
                  <h3 className="font-bold text-primary text-xl mb-2 line-clamp-1">
                    {new Date(item.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <p className="font-semibold text-2xl mb-3 line-clamp-2">
                    {item.title}
                  </p>
                  <p className="text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            variant="outline"
            className="text-lg text-white px-8 py-7 font-medium rounded-[7px] border bg-primary hover:bg-primary hover:text-white"
            onClick={() => router.push("/actualites")}
          >
            Voir toutes les actualités
          </Button>
        </motion.div>
      </div>
    </motion.section>

        <motion.section
          className="my-20 mx-2"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="container-custom mx-auto relative text-white  py-12 md:p-6 rounded-2xl mb-8 overflow-hidden">
            {/* Image de fond */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/service.svg" // remplace par ton image
                alt="Fond citoyen"
                fill
                className="object-cover"
              />
              {/* Overlay foncé */}
              <div className="absolute inset-0 bg-[#0D4C8E]/90 "></div>
            </div>

            <div className="relative z-10 grid lg:grid-cols-4 gap-8 items-center">
              <motion.div
                className="space-y-6 p-10 col-span-3 w-full"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl font-bold">
                    Mon espace citoyen
                  </h1>
                  <p className="text-lg text-blue-100 leading-relaxed">
                    Un espace personnel pour suivre vos demandes,
                    <br />
                    recevoir des messages, et interagir avec votre mairie.
                  </p>
                </div>
                <motion.div
                  className="flex md:flex-col flex-col gap-5"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div variants={scaleIn}>
                    <Button
                      onClick={() => (window.location.href = "/connexion")}
                      variant="outline"
                      size="lg"
                      className="bg-transparent w-full max-w-xs border rounded border-white text-white hover:bg-white hover:text-blue-800 px-8 py-3 text-base font-medium"
                    >
                      Se connecter
                    </Button>
                  </motion.div>
                  <motion.div variants={scaleIn}>
                    <Button
                      onClick={() => (window.location.href = "/inscription")}
                      size="lg"
                      className="bg-secondary w-full max-w-xs rounded hover:bg-secondary/80 text-white px-8 py-3 text-base font-medium"
                    >
                      Créer mon compte
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                className="lg:flex justify-center items-center lg:items-start hidden lg:absolute bottom-0 top-1 right-0 lg:justify-end"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="relative">
                  <Image
                    src="/images/man.svg"
                    alt="Professionnel travaillant sur ordinateur"
                    width={600}
                    height={600}
                    className="rounded-lg object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="relative overflow-hidden py-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Vidéo de fond avec overlay */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/bg-home-mairie.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la vidéo.
            </video>
            <div className="absolute inset-0 bg-[#0D4C8EB2]/70" />
          </div>

          {/* Contenu */}
          <div className="relative z-10 py-16 px-6 text-center text-white">
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2
                className="text-4xl md:text-5xl font-bold"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Le Plateau à portée de clic
              </motion.h2>
              <motion.p
                className="text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Visualisez les services municipaux, les projets
                <br />
                en cours et les équipements de proximité.
              </motion.p>
              <motion.div
                className="pt-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Button
                  size="lg"
                  onClick={() => (window.location.href = "/la-mairie")}
                  className="bg-secondary text-white hover:bg-secondary rounded px-8 py-4 text-lg font-medium"
                >
                  Tout savoir sur la mairie
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>
   
  );
}
