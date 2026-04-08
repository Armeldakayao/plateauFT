// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Pagination,
// //   PaginationContent,
// //   PaginationItem,
// //   PaginationLink,
// //   PaginationNext,
// //   PaginationPrevious,
// // } from "@/components/ui/pagination";
// // import { Facebook, Instagram, PlayCircle } from "lucide-react";

// // export default function OrganizationGrid() {
// //   const organizationMembers = [
// //     {
// //       id: 1,
// //       imageQuery: "/images/jacques.svg",
// //       name: "Jacques EHOUO",
// //       title: "Le Maire",
// //       social: true,
// //       video: false,
// //     },
// //     {
// //       id: 2,
// //       imageQuery: "/images/r1.svg",
// //       name: "Edward KOUADIO",
// //       title: "Adjoint au Maire",
// //       social: false,
// //       video: false,
// //     },
// //     {
// //       id: 3,
// //       imageQuery: "/images/r2.svg",
// //       name: "Youssouf Jamal",
// //       title: "2e Adjoint au Maire",
// //       social: false,
// //       video: true,
// //     },
// //     {
// //       id: 4,
// //       imageQuery: "/images/r3.svg",
// //       name: "Ursula SANOGO",
// //       title: "Adjoint au Maire",
// //       social: false,
// //       video: false,
// //     },
// //     {
// //       id: 5,
// //       imageQuery: "/images/r4.svg",
// //       name: "Anie KOUADIO",
// //       title: "2e Adjoint au Maire",
// //       social: false,
// //       video: false,
// //     },
// //     {
// //       id: 6,
// //       imageQuery: "/images/r5.svg",
// //       name: "Jean-Claude KOUADIO",
// //       title: "Adjoint au Maire",
// //       social: false,
// //       video: false,
// //     },
// //     {
// //       id: 7,
// //       imageQuery: "/images/r6.svg",
// //       name: "Marie-Thérèse KOUADIO",
// //       title: "2e Adjoint au Maire",
// //       social: false,
// //       video: false,
// //     },
// //   ];

// //   return (
// //     <div className="flex flex-col   p-4 md:p-8">
// //      <div className="px-6 md:px-20 mx-auto w-full space-y-10">
// //   {/* Ligne 1 : Maire (col-span-6) + 2 membres (3 + 3) */}
// //   <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
// //     {/* Maire */}
// //     {organizationMembers[0] && (
// //       <div
// //         key={organizationMembers[0].id}
// //         className="md:col-span-6 bg-transparent border border-gray-50 rounded-[5px] shadow-lg overflow-hidden flex flex-col md:flex-row text-white"
// //       >
// //         <div className="relative w-full md:w-[1000px] aspect-[3/4] md:aspect-auto">
// //           <Image
// //             src={organizationMembers[0].imageQuery}
// //             width={700}
// //             height={700}
// //             alt={organizationMembers[0].name}
// //             className="w-full h-full object-cover"
// //           />
// //         </div>
// //         <div className="p-4 flex flex-col justify-between w-full">
// //             <div></div>
// //           <div className="py-5">
// //             <h3 className="text-2xl font-bold">{organizationMembers[0].name}</h3>
// //             <p className="text-lg text-gray-300 pb-4">{organizationMembers[0].title}</p>
// //           <Button className="w-full bg-secondary hover:bg-secondary text-white font-semibold">
// //             Prendre rdv
// //           </Button>
// //           </div>
// //           {organizationMembers[0].social && (
// //             <div className="flex gap-2 mt-7 justify-end">
// //               <Link href="#" className="text-gray-300 hover:text-white">
// //                 <Facebook className="w-7 h-7" />
// //               </Link>
// //               <Link href="#" className="text-gray-300 hover:text-white">
// //                 <Instagram className="w-7 h-7" />
// //               </Link>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     )}

// //     {/* Membres 1 et 2 */}
// //     {organizationMembers.slice(1, 3).map((member) => (
// //   <div
// //     key={member.id}
// //     className="md:col-span-3 relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col"
// //   >
// //     <Image
// //       src={member.imageQuery}
// //       width={700}
// //       height={700}
// //       alt={member.name}
// //       className="w-full h-full object-cover rounded-[5px]"
// //     />
// //     <div className="p-4 flex flex-col gap-2 ">
// //     <h4 className="font-semibold text-white text-xl">{member.name}</h4>
// //     <p className="text-lg text-white">{member.title}</p>
// //     <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
// //       Prendre RDV
// //     </Button>
// //   </div>
// //   </div>
// // ))}

// //   </div>

// //   {/* Ligne 2 : 4 membres */}
// //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
// //    {organizationMembers.slice(3, 7).map((member) => (
// //   <div
// //     key={member.id}
// //     className="relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col"
// //   >
// //     <Image
// //       src={member.imageQuery}
// //       width={700}
// //       height={700}
// //       alt={member.name}
// //       className="w-full h-full rounded-[5px] object-cover"
// //     />
// //     <div className="p-4 flex flex-col gap-2 ">
// //     <h4 className="font-semibold text-white text-xl">{member.name}</h4>
// //     <p className="text-lg text-white">{member.title}</p>
// //     <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
// //       Prendre RDV
// //     </Button>
// //   </div>
// //   </div>
// // ))}

// //   </div>
// // </div>


// //       <div className="mt-8 max-w-6xl mx-auto w-full">
// //         <Pagination>
// //           <PaginationContent className="flex justify-between w-full">
// //             <PaginationItem>
// //               <PaginationPrevious
// //                 href="#"
// //                 className="text-white hover:bg-[#2a60a8] hover:text-white"
// //               />
// //             </PaginationItem>
// //             <div className="flex gap-2">
// //               <PaginationItem>
// //                 <PaginationLink
// //                   href="#"
// //                   isActive
// //                   className="bg-[#2a60a8] text-white hover:bg-[#3a70b8]"
// //                 >
// //                   01
// //                 </PaginationLink>
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationLink
// //                   href="#"
// //                   className="text-white hover:bg-[#2a60a8] hover:text-white"
// //                 >
// //                   02
// //                 </PaginationLink>
// //               </PaginationItem>
// //               <PaginationItem>
// //                 <PaginationLink
// //                   href="#"
// //                   className="text-white hover:bg-[#2a60a8] hover:text-white"
// //                 >
// //                   03
// //                 </PaginationLink>
// //               </PaginationItem>
// //             </div>
// //             <PaginationItem>
// //               <PaginationNext
// //                 href="#"
// //                 className="text-white hover:bg-[#2a60a8] hover:text-white"
// //               />
// //             </PaginationItem>
// //           </PaginationContent>
// //         </Pagination>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { motion, AnimatePresence } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

// export default function OrganizationGrid() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 7;

//   const allOrganizationMembers = [
//     // Page 1
//     {
//       id: 1,
//       imageQuery: "/images/jacques.svg",
//       name: "Jacques EHOUO",
//       title: "Le Maire",
//       social: true,
//       video: false,
//     },
//     {
//       id: 2,
//       imageQuery: "/images/r1.svg",
//       name: "Edward KOUADIO",
//       title: "Adjoint au Maire",
//       social: false,
//       video: false,
//     },
//     {
//       id: 3,
//       imageQuery: "/images/r2.svg",
//       name: "Youssouf Jamal",
//       title: "2e Adjoint au Maire",
//       social: false,
//       video: true,
//     },
//     {
//       id: 4,
//       imageQuery: "/images/r3.svg",
//       name: "Ursula SANOGO",
//       title: "Adjoint au Maire",
//       social: false,
//       video: false,
//     },
//     {
//       id: 5,
//       imageQuery: "/images/r4.svg",
//       name: "Anie KOUADIO",
//       title: "2e Adjoint au Maire",
//       social: false,
//       video: false,
//     },
//     {
//       id: 6,
//       imageQuery: "/images/r5.svg",
//       name: "Jean-Claude KOUADIO",
//       title: "Adjoint au Maire",
//       social: false,
//       video: false,
//     },
//     {
//       id: 7,
//       imageQuery: "/images/r6.svg",
//       name: "Marie-Thérèse KOUADIO",
//       title: "2e Adjoint au Maire",
//       social: false,
//       video: false,
//     },
//     // Page 2
//     {
//       id: 8,
//       imageQuery: "/images/r7.svg",
//       name: "Paul MARTIN",
//       title: "Conseiller Municipal",
//       social: false,
//       video: false,
//     },
//     {
//       id: 9,
//       imageQuery: "/images/r8.svg",
//       name: "Sophie DUBOIS",
//       title: "Conseillère Municipale",
//       social: true,
//       video: false,
//     },
//     {
//       id: 10,
//       imageQuery: "/images/r9.svg",
//       name: "Michel BERNARD",
//       title: "Conseiller Municipal",
//       social: false,
//       video: true,
//     },
//     {
//       id: 11,
//       imageQuery: "/images/r10.svg",
//       name: "Claire MOREAU",
//       title: "Conseillère Municipale",
//       social: false,
//       video: false,
//     },
//     {
//       id: 12,
//       imageQuery: "/images/r11.svg",
//       name: "Antoine LEROY",
//       title: "Conseiller Municipal",
//       social: false,
//       video: false,
//     },
//     {
//       id: 13,
//       imageQuery: "/images/r12.svg",
//       name: "Isabelle PETIT",
//       title: "Conseillère Municipale",
//       social: true,
//       video: false,
//     },
//     {
//       id: 14,
//       imageQuery: "/images/r13.svg",
//       name: "François GARCIA",
//       title: "Conseiller Municipal",
//       social: false,
//       video: false,
//     },
//     // Page 3
//     {
//       id: 15,
//       imageQuery: "/images/r14.svg",
//       name: "Nathalie ROUX",
//       title: "Conseillère Municipale",
//       social: false,
//       video: false,
//     },
//     {
//       id: 16,
//       imageQuery: "/images/r15.svg",
//       name: "David SIMON",
//       title: "Conseiller Municipal",
//       social: false,
//       video: true,
//     },
//     {
//       id: 17,
//       imageQuery: "/images/r16.svg",
//       name: "Céline MICHEL",
//       title: "Conseillère Municipale",
//       social: true,
//       video: false,
//     },
//     {
//       id: 18,
//       imageQuery: "/images/r17.svg",
//       name: "Olivier LAURENT",
//       title: "Conseiller Municipal",
//       social: false,
//       video: false,
//     },
//     {
//       id: 19,
//       imageQuery: "/images/r18.svg",
//       name: "Valérie LEFEBVRE",
//       title: "Conseillère Municipale",
//       social: false,
//       video: false,
//     },
//     {
//       id: 20,
//       imageQuery: "/images/r19.svg",
//       name: "Thierry MOREAU",
//       title: "Conseiller Municipal",
//       social: false,
//       video: false,
//     },
//     {
//       id: 21,
//       imageQuery: "/images/r20.svg",
//       name: "Patricia GIRARD",
//       title: "Conseillère Municipale",
//       social: true,
//       video: false,
//     },
//   ];

//   const totalPages = Math.ceil(allOrganizationMembers.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const currentMembers = allOrganizationMembers.slice(startIndex, startIndex + itemsPerPage);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//     exit: {
//       opacity: 0,
//       transition: {
//         staggerChildren: 0.05,
//         staggerDirection: -1,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: {
//       opacity: 0,
//       y: 30,
//       scale: 0.9,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         ease: [0.6, -0.05, 0.01, 0.99],
//       },
//     },
//     exit: {
//       opacity: 0,
//       y: -30,
//       scale: 0.9,
//       transition: {
//         duration: 0.3,
//       },
//     },
//   };

//   const mayorCardVariants = {
//     hidden: {
//       opacity: 0,
//       x: -50,
//       scale: 0.95,
//     },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       transition: {
//         duration: 0.8,
//         ease: [0.6, -0.05, 0.01, 0.99],
//       },
//     },
//     exit: {
//       opacity: 0,
//       x: -50,
//       scale: 0.95,
//       transition: {
//         duration: 0.4,
//       },
//     },
//   };

//   const hoverVariants = {
//     hover: {
//       y: -8,
//       scale: 1.02,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   const mayorHoverVariants = {
//     hover: {
//       y: -5,
//       transition: {
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     },
//   };

//   const imageVariants = {
//     hover: {
//       scale: 1.1,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const mayorImageVariants = {
//     hover: {
//       scale: 1.05,
//       transition: {
//         duration: 0.4,
//         ease: "easeOut",
//       },
//     },
//   };

//   const buttonVariants = {
//     hover: {
//       scale: 1.05,
//       transition: {
//         duration: 0.2,
//       },
//     },
//     tap: {
//       scale: 0.95,
//     },
//   };

//   const socialIconVariants = {
//     hover: {
//       y: -3,
//       scale: 1.1,
//       color: "#3b82f6",
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const paginationVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.5,
//         delay: 0.8,
//       },
//     },
//   };

//   const pageButtonVariants = {
//     inactive: {
//       scale: 1,
//       backgroundColor: "transparent",
//       color: "#ffffff",
//     },
//     active: {
//       scale: 1.1,
//       backgroundColor: "#2a60a8",
//       color: "#ffffff",
//     },
//     hover: {
//       scale: 1.05,
//       backgroundColor: "#2a60a8",
//       y: -2,
//       transition: {
//         duration: 0.2,
//       },
//     },
//   };

//   return (
//     <div className="flex flex-col p-4 md:p-8">
//       <AnimatePresence mode="wait">
//         <motion.div
//           key={currentPage}
//           className="px-6 md:px-20 mx-auto w-full space-y-10"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//         >
//           {/* Ligne 1 : Maire (col-span-6) + 2 membres (3 + 3) */}
//           <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
//             {/* Maire */}
//             {currentMembers[0] && (
//               <motion.div
//                 variants={mayorCardVariants}
//                 whileHover="hover"
//                 className="md:col-span-6 bg-transparent border border-gray-50 rounded-[5px] shadow-lg overflow-hidden flex flex-col md:flex-row text-white cursor-pointer"
//               >
//                 <motion.div
//                   variants={mayorHoverVariants}
//                   className="relative w-full md:w-[1000px] aspect-[3/4] md:aspect-auto overflow-hidden"
//                 >
//                   <motion.div variants={mayorImageVariants}>
//                     <Image
//                       src={currentMembers[0].imageQuery}
//                       width={700}
//                       height={700}
//                       alt={currentMembers[0].name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                 </motion.div>
//                 <div className="p-4 flex flex-col justify-between w-full">
//                   <div></div>
//                   <div className="py-5">
//                     <motion.h3
//                       className="text-2xl font-bold"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {currentMembers[0].name}
//                     </motion.h3>
//                     <motion.p
//                       className="text-lg text-gray-300 pb-4"
//                       whileHover={{ scale: 1.05 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       {currentMembers[0].title}
//                     </motion.p>
//                     <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//                       <Button className="w-full bg-secondary hover:bg-secondary text-white font-semibold">
//                         Prendre rdv
//                       </Button>
//                     </motion.div>
//                   </div>
//                   {currentMembers[0].social && (
//                     <div className="flex gap-2 mt-7 justify-end">
//                       <motion.div variants={socialIconVariants} whileHover="hover">
//                         <Link href="#" className="text-gray-300 hover:text-white">
//                           <Facebook className="w-7 h-7" />
//                         </Link>
//                       </motion.div>
//                       <motion.div variants={socialIconVariants} whileHover="hover">
//                         <Link href="#" className="text-gray-300 hover:text-white">
//                           <Instagram className="w-7 h-7" />
//                         </Link>
//                       </motion.div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Membres 1 et 2 */}
//             {currentMembers.slice(1, 3).map((member) => (
//               <motion.div
//                 key={member.id}
//                 variants={cardVariants}
//                 whileHover="hover"
//                 className="md:col-span-3 relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col cursor-pointer"
//               >
//                 <motion.div variants={hoverVariants} className="overflow-hidden rounded-[5px]">
//                   <motion.div variants={imageVariants}>
//                     <Image
//                       src={member.imageQuery}
//                       width={700}
//                       height={700}
//                       alt={member.name}
//                       className="w-full h-full object-cover"
//                     />
//                   </motion.div>
//                 </motion.div>
//                 <div className="p-4 flex flex-col gap-2">
//                   <motion.h4
//                     className="font-semibold text-white text-xl"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {member.name}
//                   </motion.h4>
//                   <motion.p
//                     className="text-lg text-white"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {member.title}
//                   </motion.p>
//                   <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//                     <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
//                       Prendre RDV
//                     </Button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Ligne 2 : 4 membres */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {currentMembers.slice(3, 7).map((member) => (
//               <motion.div
//                 key={member.id}
//                 variants={cardVariants}
//                 whileHover="hover"
//                 className="relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col cursor-pointer"
//               >
//                 <motion.div variants={hoverVariants} className="overflow-hidden rounded-[5px]">
//                   <motion.div variants={imageVariants}>
//                     <Image
//                       src={member.imageQuery}
//                       width={700}
//                       height={700}
//                       alt={member.name}
//                       className="w-full h-full rounded-[5px] object-cover"
//                     />
//                   </motion.div>
//                 </motion.div>
//                 <div className="p-4 flex flex-col gap-2">
//                   <motion.h4
//                     className="font-semibold text-white text-xl"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {member.name}
//                   </motion.h4>
//                   <motion.p
//                     className="text-lg text-white"
//                     whileHover={{ scale: 1.05 }}
//                     transition={{ duration: 0.2 }}
//                   >
//                     {member.title}
//                   </motion.p>
//                   <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
//                     <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
//                       Prendre RDV
//                     </Button>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </AnimatePresence>

//       {/* Pagination personnalisée avec Framer Motion */}
//       <motion.div
//         className="mt-8 max-w-6xl mx-auto w-full"
//         variants={paginationVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="flex items-center justify-center gap-2">
//           <motion.button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="flex items-center gap-2 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
//             whileHover={currentPage > 1 ? { scale: 1.05, y: -2 } : {}}
//             whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
//             transition={{ duration: 0.2 }}
//           >
//             <ChevronLeft className="w-4 h-4" />
//             Précédent
//           </motion.button>

//           <div className="flex gap-2 mx-4">
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <motion.button
//                 key={page}
//                 onClick={() => handlePageChange(page)}
//                 className="w-10 h-10 rounded-lg font-semibold transition-colors duration-200"
//                 variants={pageButtonVariants}
//                 initial="inactive"
//                 animate={currentPage === page ? "active" : "inactive"}
//                 whileHover="hover"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {page.toString().padStart(2, '0')}
//               </motion.button>
//             ))}
//           </div>

//           <motion.button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="flex items-center gap-2 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
//             whileHover={currentPage < totalPages ? { scale: 1.05, y: -2 } : {}}
//             whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
//             transition={{ duration: 0.2 }}
//           >
//             Suivant
//             <ChevronRight className="w-4 h-4" />
//           </motion.button>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, ChevronLeft, ChevronRight } from "lucide-react";

export default function OrganizationGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const allOrganizationMembers = [
    // Page 1
    {
      id: 1,
      imageQuery: "/images/jacques.svg",
      name: "Jacques EHOUO",
      title: "Le Maire",
      social: true,
      video: false,
    },
    {
      id: 2,
      imageQuery: "/images/r1.svg",
      name: "Edward KOUADIO",
      title: "Adjoint au Maire",
      social: false,
      video: false,
    },
    {
      id: 3,
      imageQuery: "/images/r2.svg",
      name: "Youssouf Jamal",
      title: "2e Adjoint au Maire",
      social: false,
      video: true,
    },
    {
      id: 4,
      imageQuery: "/images/r3.svg",
      name: "Ursula SANOGO",
      title: "Adjoint au Maire",
      social: false,
      video: false,
    },
    {
      id: 5,
      imageQuery: "/images/r4.svg",
      name: "Anie KOUADIO",
      title: "2e Adjoint au Maire",
      social: false,
      video: false,
    },
    {
      id: 6,
      imageQuery: "/images/r5.svg",
      name: "Jean-Claude KOUADIO",
      title: "Adjoint au Maire",
      social: false,
      video: false,
    },
    {
      id: 7,
      imageQuery: "/images/r6.svg",
      name: "Marie-Thérèse KOUADIO",
      title: "2e Adjoint au Maire",
      social: false,
      video: false,
    },
    // Page 2
    {
      id: 8,
      imageQuery: "/images/r7.svg",
      name: "Paul MARTIN",
      title: "Conseiller Municipal",
      social: false,
      video: false,
    },
    {
      id: 9,
      imageQuery: "/images/r8.svg",
      name: "Sophie DUBOIS",
      title: "Conseillère Municipale",
      social: true,
      video: false,
    },
    {
      id: 10,
      imageQuery: "/images/r9.svg",
      name: "Michel BERNARD",
      title: "Conseiller Municipal",
      social: false,
      video: true,
    },
    {
      id: 11,
      imageQuery: "/images/r10.svg",
      name: "Claire MOREAU",
      title: "Conseillère Municipale",
      social: false,
      video: false,
    },
    {
      id: 12,
      imageQuery: "/images/r11.svg",
      name: "Antoine LEROY",
      title: "Conseiller Municipal",
      social: false,
      video: false,
    },
    {
      id: 13,
      imageQuery: "/images/r12.svg",
      name: "Isabelle PETIT",
      title: "Conseillère Municipale",
      social: true,
      video: false,
    },
    {
      id: 14,
      imageQuery: "/images/r13.svg",
      name: "François GARCIA",
      title: "Conseiller Municipal",
      social: false,
      video: false,
    },
    // Page 3
    {
      id: 15,
      imageQuery: "/images/r14.svg",
      name: "Nathalie ROUX",
      title: "Conseillère Municipale",
      social: false,
      video: false,
    },
    {
      id: 16,
      imageQuery: "/images/r15.svg",
      name: "David SIMON",
      title: "Conseiller Municipal",
      social: false,
      video: true,
    },
    {
      id: 17,
      imageQuery: "/images/r16.svg",
      name: "Céline MICHEL",
      title: "Conseillère Municipale",
      social: true,
      video: false,
    },
    {
      id: 18,
      imageQuery: "/images/r17.svg",
      name: "Olivier LAURENT",
      title: "Conseiller Municipal",
      social: false,
      video: false,
    },
    {
      id: 19,
      imageQuery: "/images/r18.svg",
      name: "Valérie LEFEBVRE",
      title: "Conseillère Municipale",
      social: false,
      video: false,
    },
    {
      id: 20,
      imageQuery: "/images/r19.svg",
      name: "Thierry MOREAU",
      title: "Conseiller Municipal",
      social: false,
      video: false,
    },
    {
      id: 21,
      imageQuery: "/images/r20.svg",
      name: "Patricia GIRARD",
      title: "Conseillère Municipale",
      social: true,
      video: false,
    },
  ];

  const totalPages = Math.ceil(allOrganizationMembers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = allOrganizationMembers.slice(startIndex, startIndex + itemsPerPage);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, // Augmenté pour plus de délai entre chaque carte
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
        opacity: { duration: 0.6 },
        y: { duration: 0.8 },
        scale: { duration: 0.8 },
        rotateX: { duration: 0.8 },
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
  };

  const mayorCardVariants = {
    hidden: {
      opacity: 0,
      x: -80,
      scale: 0.8,
      rotateY: 15,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1.0,
        ease: [0.6, -0.05, 0.01, 0.99],
        opacity: { duration: 0.6 },
        x: { duration: 1.0 },
        scale: { duration: 1.0 },
        rotateY: { duration: 1.0 },
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      scale: 0.95,
      transition: {
        duration: 0.4,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const mayorHoverVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const mayorImageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const socialIconVariants = {
    hover: {
      y: -3,
      scale: 1.1,
      color: "#3b82f6",
      transition: {
        duration: 0.2,
      },
    },
  };
 //@ts-ignore
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 2.5, // Délai augmenté pour apparaître après toutes les cartes
      },
    },
  };

  const pageButtonVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "transparent",
      color: "#ffffff",
    },
    active: {
      scale: 1.1,
      backgroundColor: "#2a60a8",
      color: "#ffffff",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#2a60a8",
      y: -2,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <div className="flex flex-col p-4 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="px-6 md:px-20 mx-auto w-full space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Ligne 1 : Maire (col-span-6) + 2 membres (3 + 3) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Maire */}
            {currentMembers[0] && (
              <motion.div
               //@ts-ignore
                variants={mayorCardVariants}
                whileHover="hover"
                className="md:col-span-6 bg-transparent border border-gray-50 rounded-[5px] shadow-lg overflow-hidden flex flex-col md:flex-row text-white cursor-pointer"
              >
                <motion.div
                 //@ts-ignore
                  variants={mayorHoverVariants}
                  className="relative w-full md:w-[1000px] aspect-[3/4] md:aspect-auto overflow-hidden"
                >
                  <motion.div
                   //@ts-ignore
                   variants={mayorImageVariants}>
                    <Image
                      src={currentMembers[0].imageQuery}
                      width={700}
                      height={700}
                      alt={currentMembers[0].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
                <div className="p-4 flex flex-col justify-between w-full">
                  <div></div>
                  <div className="py-5">
                    <motion.h3
                      className="text-2xl font-bold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentMembers[0].name}
                    </motion.h3>
                    <motion.p
                      className="text-lg text-gray-300 pb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      {currentMembers[0].title}
                    </motion.p>
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                      <Button className="w-full bg-secondary hover:bg-secondary text-white font-semibold">
                        Prendre rdv
                      </Button>
                    </motion.div>
                  </div>
                  {currentMembers[0].social && (
                    <div className="flex gap-2 mt-7 justify-end">
                      <motion.div variants={socialIconVariants} whileHover="hover">
                        <Link href="#" className="text-gray-300 hover:text-white">
                          <Facebook className="w-7 h-7" />
                        </Link>
                      </motion.div>
                      <motion.div variants={socialIconVariants} whileHover="hover">
                        <Link href="#" className="text-gray-300 hover:text-white">
                          <Instagram className="w-7 h-7" />
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Membres 1 et 2 */}
            {currentMembers.slice(1, 3).map((member) => (
              <motion.div
                key={member.id}
                 //@ts-ignore
                variants={cardVariants}
                whileHover="hover"
                className="md:col-span-3 relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col cursor-pointer"
              >
                <motion.div 
                 //@ts-ignore
                variants={hoverVariants} className="overflow-hidden rounded-[5px]">
                  <motion.div
                   //@ts-ignore
                   variants={imageVariants}>
                    <Image
                      src={member.imageQuery}
                      width={700}
                      height={700}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </motion.div>
                <div className="p-4 flex flex-col gap-2">
                  <motion.h4
                    className="font-semibold text-white text-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h4>
                  <motion.p
                    className="text-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.title}
                  </motion.p>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
                      Prendre RDV
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ligne 2 : 4 membres */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentMembers.slice(3, 7).map((member) => (
              <motion.div
                key={member.id}
                //@ts-ignore
                variants={cardVariants}
                whileHover="hover"
                className="relative w-full aspect-[3/4] overflow-hidden rounded-lg flex flex-col cursor-pointer"
              >
                <motion.div 
                 //@ts-ignore
                variants={hoverVariants} className="overflow-hidden rounded-[5px]">
                  <motion.div 
                   //@ts-ignore
                  variants={imageVariants}>
                    <Image
                      src={member.imageQuery}
                      width={700}
                      height={700}
                      alt={member.name}
                      className="w-full h-full rounded-[5px] object-cover"
                    />
                  </motion.div>
                </motion.div>
                <div className="p-4 flex flex-col gap-2">
                  <motion.h4
                    className="font-semibold text-white text-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.name}
                  </motion.h4>
                  <motion.p
                    className="text-lg text-white"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {member.title}
                  </motion.p>
                  <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button className="mt-2 w-fit rounded-[5px] bg-secondary hover:bg-secondary text-white font-semibold">
                      Prendre RDV
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination personnalisée avec Framer Motion */}
      <motion.div
        className="mt-8 max-w-6xl mx-auto w-full"
        variants={paginationVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center justify-center gap-2">
          <motion.button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            whileHover={currentPage > 1 ? { scale: 1.05, y: -2 } : {}}
            whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft className="w-4 h-4" />
            Précédent
          </motion.button>

          <div className="flex gap-2 mx-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                onClick={() => handlePageChange(page)}
                className="w-10 h-10 rounded-lg font-semibold transition-colors duration-200"
                variants={pageButtonVariants}
                initial="inactive"
                animate={currentPage === page ? "active" : "inactive"}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                {page.toString().padStart(2, '0')}
              </motion.button>
            ))}
          </div>

          <motion.button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
            whileHover={currentPage < totalPages ? { scale: 1.05, y: -2 } : {}}
            whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
            transition={{ duration: 0.2 }}
          >
            Suivant
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}