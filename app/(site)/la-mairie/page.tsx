// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// export default function LaMairie() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   return (
//     <div>
//       <section className="relative overflow-hidden min-h-[60vh] flex items-center justify-center">
//         {/* Image de fond avec overlay */}
//         <div className="absolute inset-0">
//           <Image
//             src="/images/abidjan.svg"
//             alt="Vue aérienne de la ville"
//             width={800}
//             height={400}
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-[#0D4C8EB2]/70"></div>
//         </div>

//         {/* Contenu */}
//         <div className="relative z-10 py-16 px-6 text-center text-white">
//           <div className="max-w-4xl mx-auto space-y-6">
//             <h2 className="text-4xl md:text-5xl font-bold">
//               La Mairie du Plateau
//             </h2>
//             <p className="text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto">
//               Une équipe engagée, une gouvernance connectée
//             </p>
//           </div>
//         </div>
//       </section>

//       <section className="py-8">
//         <div className="container-custom">
//           <div className="grid md:grid-cols-2 gap-12">
//             <div>
//               <p className="text-secondary font-bold md:text-5xl  text-2xl">
//                 Une mairie proche de ses citoyens
//               </p>
//               <p className="text-xl text-black font-light mt-7 leading-10 opacity-70 mb-4">
//                 Située au cœur du quartier d’affaires d’Abidjan, la Mairie du
//                 Plateau joue un rôle clé dans la gestion de la commune. Elle
//                 incarne l’administration de proximité, en lien direct avec les
//                 citoyens, les entreprises et les institutions.
//               </p>
//               <div className="bg-primary p-6 rounded mt-4 text-white space-y-4">
//                 <p>Adresse : Rue des banques, Plateau, Abidjan</p>
//                 <p>Téléphone : +225 27 20 33 20 37</p>
//                 <p>Email : contact@mairieplateau.net</p>
//               </div>
//             </div>
//             <div>
//               <Image
//                 src="/placeholder.svg?height=200&width=500"
//                 alt="Mairie du Plateau"
//                 width={500}
//                 height={200}
//                 className="rounded-lg object-cover "
//               />
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="py-8">
//         <div className="container-custom">
//           <div className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-lg">
//             <Image
//               src="/images/maire.svg"
//               alt="Le Maire"
//               width={260}
//               height={260}
//               className="rounded-full"
//             />
//             <div>
//               <h2 className="text-4xl font-semibold text-secondary mb-4">
//                 Mot du Maire
//               </h2>
//               <p className=" text-black text-lg leading-10 mb-4">
//                 Le Plateau est une des communes de la ville d’Abidjan, elle est
//                 entourée par la commune de Yopougon à l’ouest, au sud par
//                 la lagune Ébrié, la commune de Treichville. En tant que quartier
//                 d’affaires, il rassemble la majeure partie des activités
//                 administratives et commerciales de la ville. La plupart des
//                 grandes firmes ivoiriennes ont leur siège social au Plateau. Il
//                 est également doté d’un marché très animé.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className="py-12  bg-[#F5F5F5]">
//         <div className=" mx-auto">
//           {/* Titre et description */}
//           <div className=" mb-12 container-custom">
//             <h2 className="text-2xl text-center md:text-5xl font-bold text-primary mb-6">
//               Une commune chargée d'histoire
//             </h2>
//             <p className="text-xl text-black font-light mt-7 leading-10 opacity-70 mb-4">
//               La Commune du Plateau est l’une des plus anciennes et
//               prestigieuses d’Abidjan. Depuis sa création, elle a connu une
//               évolution remarquable, devenant un centre névralgique de la vie
//               politique, économique et culturelle de la Côte d’Ivoire.
//             </p>
//           </div>

//           {/* Timeline */}
//           <div className="mb-12 container-custom">
//             <div className="relative">
//               {/* Ligne de connexion */}
//               <div className="absolute top-8 left-8 right-8 h-0.5 bg-green-600 hidden md:block"></div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
//                 {/* 1934 */}
//                 <div className="text-center">
//                   <span className="text-primary font-bold mb-10">1904</span>
//                   <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"></div>
//                   <h3 className=" text-black mb-2 ">
//                     Fondation du <br />
//                     Plateau
//                   </h3>
//                 </div>

//                 {/* 1960 */}
//                 <div className="text-center">
//                   <span className="text-primary font-bold mb-10">1956</span>
//                   <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"></div>
//                   <h3 className=" text-black mb-2 ">
//                     Création de la <br /> mairie
//                   </h3>
//                 </div>

//                 {/* 1983 */}
//                 <div className="text-center">
//                   <span className="text-primary font-bold mb-10">2001</span>
//                   <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"></div>
//                   <h3 className=" text-black mb-2 ">
//                     Nouveau plan de <br /> développement
//                   </h3>
//                 </div>

//                 {/* 2010 */}
//                 <div className="text-center">
//                   <span className="text-primary font-bold mb-10">2020</span>
//                   <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 relative z-10"></div>
//                   <h3 className=" text-black mb-2 ">
//                     Digitalisation des <br /> services
//                   </h3>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Carrousel d'images */}
//           <div className="relative mt-20">
//             <div className="overflow-hidden rounded-lg">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//               >
//                 <div className="w-full flex-shrink-0">
//                   <Image
//                     src="/images/abidjan.svg"
//                     alt="Vue panoramique du Plateau - Image 1"
//                     width={1200}
//                     height={400}
//                     className="w-full h-[700px] object-cover"
//                   />
//                 </div>
//                 <div className="w-full flex-shrink-0">
//                   <Image
//                     src="https://pouvoirsafrique.com/pouvoirsafrique/uploads/images/2024/05/10/10252.png"
//                     alt="Vue panoramique du Plateau - Image 2"
//                     width={1200}
//                     height={400}
//                     className="w-full h-[700px] object-cover"
//                   />
//                 </div>
//                 <div className="w-full flex-shrink-0">
//                   <Image
//                     src="https://www.atterrir.com/wp-content/uploads/2024/01/Cote-dIvoire-A-la-decouverte-dune-perle-dAfrique-de-louest-.jpg"
//                     alt="Vue panoramique du Plateau - Image 3"
//                     width={1200}
//                     height={400}
//                     className="w-full h-[700px] object-cover"
//                   />
//                 </div>
//                 <div className="w-full flex-shrink-0">
//                   <Image
//                     src="https://www.cermf.org/file/si583539/abidjan-fi25834868x670.png"
//                     alt="Vue panoramique du Plateau - Image 4"
//                     width={1200}
//                     height={400}
//                     className="w-full h-[700px] object-cover"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Indicateurs de carrousel */}
//             <div className="flex justify-center mt-10 space-x-2">
//               {[0, 1, 2, 3].map((index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentSlide(index)}
//                   className={`w-3 h-3 rounded-full transition-colors ${
//                     currentSlide === index
//                       ? "bg-blue-600"
//                       : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Statistiques */}
//       <section className="py-12 px-6 bg-gray-50">
//         <div className="max-w-4xl mx-auto">
//           <div className="grid md:grid-cols-3 gap-6">
//             {/* 22 000 habitants */}
//             <div className="bg-white border-2 border-green-600 rounded-xl p-8 text-center">
//               <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">22 000</div>
//               <div className="text-blue-800 font-medium text-lg">habitants</div>
//             </div>

//             {/* 17 services municipaux */}
//             <div className="bg-green-600 rounded-xl p-8 text-center text-white">
//               <div className="text-4xl md:text-5xl font-bold mb-2">17</div>
//               <div className="font-medium text-lg">services municipaux</div>
//             </div>

//             {/* +150 agents mobilisés */}
//             <div className="bg-white border-2 border-green-600 rounded-xl p-8 text-center">
//               <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">+150</div>
//               <div className="text-blue-800 font-medium text-lg">
//                 agents
//                 <br />
//                 mobilisés
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Section Votre Conseil Municipal */}
//       <section className="bg-primary text-white py-12 px-6 mt-8">
//         <div className="max-w-4xl mx-auto text-center">
//           <div className="space-y-4 mb-8">
//             <h2 className="text-3xl md:text-5xl font-bold">
//               Votre Conseil Municipal
//             </h2>
//             <p className="text-blue-100 text-lg">
//               Le Conseil Municipal élu en 2023
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3  gap-6 mb-16">
//             {/* Jacques Ehouo - Maire */}
//             <div>
//               <div className="bg-white  px-4 py-16 rounded text-center"></div>
//               <h3 className="font-bold text-white mt-4 mb-1 text-xl">
//                 Jacques Ehouo
//               </h3>
//               <p className="text-white text-lg">Le Maire</p>
//             </div>

//             {/* Jean Doe - Maire Adjoint */}
//             <div>
//               <div className="bg-white  px-4 py-16 rounded text-center"></div>
//               <h3 className="font-bold text-white mt-4 mb-1 text-xl">
//                 Jean Doe
//               </h3>
//               <p className="text-white text-lg">Le Maire Adjoint</p>
//             </div>

//             {/* Koffi Akissi - Conseiller */}
//             <div>
//               <div className="bg-white  px-4 py-16 rounded text-center"></div>
//               <h3 className="font-bold text-white mt-4 mb-1 text-xl">
//                 Koffi Akissi
//               </h3>
//               <p className="text-white text-lg">Le Conseiller</p>
//             </div>
//           </div>

//           <Button
//             variant="outline"
//             className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-800 px-10 text-lg rounded-xl py-7"
//           >
//             Voir l'organigramme complet
//           </Button>
//         </div>
//       </section>

//       {/* Section Nos valeurs */}
//       <section className="py-12 px-6 bg-white">
//         <div className="max-w-6xl mx-auto">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
//               Nos valeurs
//             </h2>
//             <p className="text-xl text-black font-light mt-7 leading-10 opacity-70 mb-4">
//               La mairie du Plateau défend une vision moderne, inclusive et
//               citoyenne fondée sur :
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-6">
//             {/* Première ligne */}
//             <div className="bg-primary  text-white px-6 py-10 rounded text-center">
//               <div className="mb-4">
//                 <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded"></div>
//                 </div>
//               </div>
//               <h3 className="font-bold text-xl">Transparence</h3>
//             </div>

//             <div className="bg-primary  text-white px-6 py-10 rounded text-center">
//               <div className="mb-4">
//                 <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded-full"></div>
//                 </div>
//               </div>
//              <h3 className="font-bold text-xl">Innovation</h3>
//             </div>

//             <div className="bg-primary  text-white px-6 py-10 rounded text-center">
//               <div className="mb-4">
//                 <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded"></div>
//                 </div>
//               </div>
//              <h3 className="font-bold text-xl">Proximité</h3>
//             </div>

//             {/* Deuxième ligne - centrée */}
//             <div className="md:col-start-1 bg-primary  text-white p-6 rounded-lg text-center">
//               <div className="mb-4">
//                 <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded"></div>
//                 </div>
//               </div>
//              <h3 className="font-bold text-xl">Développement durable</h3>
//             </div>

//             <div className="bg-primary  text-white px-6 py-10 rounded text-center">
//               <div className="mb-4">
//                 <div className="w-12 h-12 bg-white/20 rounded-full mx-auto flex items-center justify-center">
//                   <div className="w-6 h-6 bg-white rounded"></div>
//                 </div>
//               </div>
//              <h3 className="font-bold text-xl">Respect des institutions</h3>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Section Infos utiles */}
//       <section className="py-12 px-6 bg-gray-50">
//         <div className="max-w-6xl mx-auto">
//           <div className="grid lg:grid-cols-2 gap-8 items-start">
//             <div>
//               <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
//                 Infos utiles
//               </h2>

//               <div className="space-y-6">
//                 {/* Horaires */}
//                 <div>
//                   <div className="space-y-2 text-gray-700">
//                     <p className="text-xl">
//                       <span className="font-semibold">Lundi - Vendredi :</span>{" "}
//                       8h00 - 17h00
//                     </p>
//                     <p className="text-xl">
//                       <span className="font-semibold">Samedi :</span> 8h00 - 12h00
//                       (sauf jours fériés)
//                     </p>
//                   </div>
//                 </div>

//                 {/* Téléchargements */}
//                 <div>
//                   <h3 className="font-bold text-xl mb-3">
//                     Téléchargement :
//                   </h3>
//                   <ul className="space-y-2 text-lg px-4">
//                     <li>
//                       <a
//                         href="#"
//                         className="text-primary underline  hover:text-blue-800 flex items-center gap-2"
//                       >
//                         <span className="w-2 h-2 bg-primary rounded-full"></span>
//                         Brochure de présentation (PDF)
//                       </a>
//                     </li>
//                     <li>
//                       <a
//                         href="#"
//                         className="text-primary underline hover:text-blue-800 flex items-center gap-2"
//                       >
//                         <span className="w-2 h-2 bg-primary rounded-full"></span>
//                         Carte des services administratifs
//                       </a>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>

//             {/* Image des buildings */}
//             <div className="flex justify-center lg:justify-end">
//               <Image
//                  src="/images/la-tour.svg"
//                 alt="Gratte-ciels modernes"
//                 width={400}
//                 height={400}
//                 className="rounded-xl object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//     </div>
//   );
// }

"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageLoader from "@/components/page-loader";
import MunicipalCouncilCarousel from "@/components/municipal-council-carousel";
import AnimatedTimeline from "@/components/animation-timeline";
import ValuesSection from "@/components/values-section";
import InfiniteCarousel from "@/components/smooth-carousel";
import StatsSection from "@/components/stats-section";
import MairieSection from "@/components/mairie-section";
import { useLandmarksQuery } from "@/hooks/places/use-places-queries";
// import PageLoader from "@/components/page-loader"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 },
};

export default function LaMairie() {
  const [currentSlide, setCurrentSlide] = useState(0);
const { data: landmarksData, isLoading: landmarksLoading } = useLandmarksQuery({ limit: 8 })

  return (
    <div title="La Mairie du Plateau">
      <div>
        <motion.section
          className="relative hidden  overflow-hidden h-[650px] pt-44  lg:flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Image de fond avec overlay */}
          <div className="absolute inset-0">
            <Image
              src="/images/maire-bg.svg"
              alt="Vue aérienne de la ville"
              width={800}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1A6BAF]/50"></div>
          </div>

          {/* Contenu */}
          <div className="relative z-10 py-32 px-6 flex   text-white">
            <motion.div
              className="max-w-4xl mx-auto space-y-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.h2
                className="text-4xl md:text-7xl pt-20 font-bold"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                La Mairie du Plateau
              </motion.h2>
              <motion.p
                className="text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Une équipe engagée, une gouvernance connectée
              </motion.p>
            </motion.div>
            <Image
              src="/images/maire2.svg"
              alt="Logo de la Mairie du Plateau"
              width={1500}
              height={1500}
              className=" bottom-4 top-1  right-4 w-[600px] h-[500px] object-contain"
            />
          </div>
        </motion.section>
        <motion.section
  className="relative overflow-hidden min-h-[650px] pt-32 flex lg:hidden items-center justify-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  {/* Image de fond avec overlay */}
  <div className="absolute inset-0">
    <Image
      src="/images/maire-bg.svg"
      alt="Vue aérienne de la ville"
      fill
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-[#1A6BAF]/50" />
  </div>

  {/* Contenu */}
  <div className="relative z-10 px-4 py-20 md:py-32 flex flex-col-reverse md:flex-row items-center justify-between gap-8 text-white w-full max-w-7xl">
    {/* Texte */}
    <motion.div
      className="md:max-w-2xl text-center md:text-left space-y-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <motion.h2
        className="text-5xl  md:text-6xl font-bold"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        La Mairie du Plateau
      </motion.h2>
      <motion.p
        className="text-2xl sm:text-xl md:text-2xl text-blue-100 leading-relaxed"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Une équipe engagée, une gouvernance connectée
      </motion.p>
    </motion.div>

    {/* Image logo */}
    <div className="flex-shrink-0 hidden">
      <Image
        src="/images/maire2.svg"
        alt="Logo de la Mairie du Plateau"
        width={500}
        height={500}
        className="w-[300px] h-[250px] md:w-[500px] md:h-[400px] object-contain"
      />
    </div>
  </div>
</motion.section>


      <MairieSection/>

        <motion.section
          className="py-12 bg-[#F5F5F5]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mx-auto">
            {/* Titre et description */}

            {/* Timeline */}
            <AnimatedTimeline />
                        <h1 className="text-3xl text-center md:text-5xl font-bold text-primary my-16">Endroits mythiques</h1>
             <InfiniteCarousel 
          landmarks={landmarksData?.data} 
          landmarksLoading={landmarksLoading}
        />
            {/* Carrousel d'images */}
          </div>
        </motion.section>

        {/* Section Statistiques */}
        <StatsSection />

        {/* Section Votre Conseil Municipal */}

        <MunicipalCouncilCarousel />

        {/* Section Nos valeurs */}
        <ValuesSection />

        {/* Section Infos utiles */}

        <motion.section
          className="pb-12 px-6 bg-gray-50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="pt-10"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-6">
                  Infos utiles
                </h2>

                <div className="space-y-6">
                  {/* Horaires */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <div className="space-y-2 text-gray-700">
                      <p className="text-xl">
                        <span className="font-semibold">
                          Lundi - Vendredi :
                        </span>{" "}
                        8h00 - 17h00
                      </p>
                      <p className="text-xl">
                        <span className="font-semibold">Samedi :</span> 8h00 -
                        12h00 (sauf jours fériés)
                      </p>
                    </div>
                  </motion.div>

                  {/* Téléchargements */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h3 className="font-bold text-xl mb-3">Téléchargement :</h3>
                    <ul className="space-y-2 text-lg px-4">
                      <li>
                        <a
                          href="#"
                          className="text-primary underline hover:text-blue-800 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Brochure de présentation (PDF)
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-primary underline hover:text-blue-800 flex items-center gap-2"
                        >
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Carte des services administratifs
                        </a>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>

              {/* Image des buildings */}
              <motion.div
                className="flex justify-center lg:justify-end w-full h-[400px]" // on fixe la hauteur pour la map
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <iframe
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.999364772175!2d2.294481315674927!3d48.858370079287754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdd5d0a5e5d%3A0xf2f4a8e7ebddc3d4!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1690240000000!5m2!1sfr!2sfr"
                  width="500"
                  height="500"
                  style={{ border: 0, borderRadius: "0.75rem" }}
                  //@ts-ignore
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
