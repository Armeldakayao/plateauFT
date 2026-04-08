// // "use client";

// // import { useState, useEffect } from "react";
// // import Link from "next/link";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// // import {
// //   Bell,
// //   User,
// //   ChevronLeft,
// //   ChevronRight,
// //   Plus,
// //   Eye,
// //   MessageSquare,
// //   Calendar,
// //   FileText,
// //   Trash2,
// // } from "lucide-react";
// // import Sidebar from "@/components/sidebar";

// // export default function TableauDeBordPage() {
// //   const [currentDate, setCurrentDate] = useState(new Date(2024, 6));
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [notifications, setNotifications] = useState(3);

// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       setIsLoading(false);
// //     }, 1000);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   const demandes = [
// //     {
// //       id: "1",
// //       type: "Certificat de résidence",
// //       numero: "LMJ-5-007",
// //       statut: "Terminé",
// //       dateEnvoi: "20/05/2024",
// //     },
// //     {
// //       id: "2",
// //       type: "Carte de commerçant",
// //       numero: "JAH-6-022",
// //       statut: "Terminé",
// //       dateEnvoi: "12/04/2024",
// //     },
// //   ];

// //   const messages = [
// //     {
// //       id: "1",
// //       titre: "Invitation à l'Assemblée Citoyenne du 10/08",
// //       date: "01/08/2024",
// //       isRead: false,
// //     },
// //     {
// //       id: "2",
// //       titre: "Invitation à l'Assemblée Citoyenne du 10/08",
// //       date: "01/08/2024",
// //       isRead: false,
// //     },
// //     {
// //       id: "3",
// //       titre: "Invitation à l'Assemblée Citoyenne du 10/08",
// //       date: "01/08/2024",
// //       isRead: true,
// //     },
// //   ];

// //   const rendezVous = [
// //     {
// //       id: "1",
// //       date: "12/08 - 14h00-15h",
// //       titre: "citoyen personnalisé",
// //     },
// //     {
// //       id: "2",
// //       date: "12/08 - 14h00-15h",
// //       titre: "citoyen personnalisé",
// //     },
// //     {
// //       id: "3",
// //       date: "12/08 - 14h00-15h",
// //       titre: "citoyen personnalisé",
// //     },
// //   ];

// //   const infosMailrie = [
// //     {
// //       titre: "Maintenance portail",
// //       description: "Le 7 juin — accès",
// //     },
// //     {
// //       titre: "Fête citoyenne du Plateau",
// //       description: "10 juin à 18h, Place des Fêtes",
// //     },
// //     {
// //       titre: "Fête citoyenne du Plateau",
// //       description: "10 juin à 18h, Place des Fêtes",
// //     },
// //   ];

// //   const handleNewDemande = () => {
// //     console.log("Nouvelle demande créée");
// //   };

// //   const handleChangePassword = () => {
// //     console.log("Changement de mot de passe");
// //   };

// //   const handleSuivreDossiers = () => {
// //     console.log("Suivi des dossiers");
// //   };

// //   const handleReadMessage = (messageId: string) => {
// //     console.log(`Message ${messageId} lu`);
// //   };

// //   const handlePlanifierRdv = (rdvId: string) => {
// //     console.log(`Planifier RDV ${rdvId}`);
// //   };

// //   const generateCalendar = () => {
// //     const year = currentDate.getFullYear();
// //     const month = currentDate.getMonth();
// //     const firstDay = new Date(year, month, 1);
// //     const lastDay = new Date(year, month + 1, 0);
// //     const startDate = new Date(firstDay);
// //     startDate.setDate(startDate.getDate() - firstDay.getDay());

// //     const days = [];
// //     const current = new Date(startDate);

// //     for (let i = 0; i < 42; i++) {
// //       days.push(new Date(current));
// //       current.setDate(current.getDate() + 1);
// //     }

// //     return days;
// //   };

// //   const monthNames = [
// //     "Janvier",
// //     "Février",
// //     "Mars",
// //     "Avril",
// //     "Mai",
// //     "Juin",
// //     "Juillet",
// //     "Août",
// //     "Septembre",
// //     "Octobre",
// //     "Novembre",
// //     "Décembre",
// //   ];

// //   const days = generateCalendar();

// //   if (isLoading) {
// //     return (
// //       <div className="flex min-h-screen bg-gray-50">
// //         <Sidebar />
// //         <div className="flex-1 md:ml-64 flex items-center justify-center">
// //           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex  bg-gray-50">
// //       <Sidebar />
// //       <div className="flex-1 md:ml-64 p-4 md:p-8">
// //         {/* Header */}
// //         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
// //           <h1 className="text-2xl md:text-3xl font-bold text-primary">
// //             Mon espace citoyen
// //           </h1>
// //           <div className="flex items-center gap-4">
// //             <div className="relative">
// //               <Bell className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
// //               {notifications > 0 && (
// //                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
// //                   {notifications}
// //                 </span>
// //               )}
// //             </div>
// //             <User className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
// //           {/* Left Column */}
// //           <div className="xl:col-span-3 space-y-6 md:space-y-8">
// //             {/* Informations citoyennes */}
// //             <Card className="shadow-sm bg-gray-100 hover:shadow-md transition-shadow duration-200">
// //               <CardHeader className="pb-4">
// //                 <CardTitle className="text-lg md:text-3xl font-bold text-orange-600">
// //                   Informations citoyennes
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-4 md:p-6">
// //                 <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-6">
// //                   <Avatar className="w-16 md:w-40 h-16 md:h-40 border-4 border-gray-200 mx-auto lg:mx-0">
// //                     <AvatarImage src="/placeholder.svg?height=80&width=80" />
// //                     <AvatarFallback className="text-lg md:text-xl font-semibold bg-blue-100 text-blue-600">
// //                       AC
// //                     </AvatarFallback>
// //                   </Avatar>
// //                   <div className="flex-1 text-center lg:text-left">
// //                     <h3 className="font-bold text-lg md:text-2xl text-gray-900 mb-1">
// //                       Awa Coulibaly
// //                     </h3>
// //                     <div className="space-y-1 text-lg text-gray-600 mb-4">
// //                       <p>
// //                         <span className="font-medium text-lg">Quartier :</span>{" "}
// //                         Plateau Dokui
// //                       </p>
// //                       <p>
// //                         <span className="font-medium text-lg">E-mail :</span>{" "}
// //                         awa.coulibaly@gmail.com
// //                       </p>
// //                       <p>
// //                         <span className="font-medium">Téléphone :</span> +225 07
// //                         88 46 67 23
// //                       </p>
// //                       <p>
// //                         <span className="font-medium">Statut du compte :</span>{" "}
// //                         Vérifié
// //                       </p>
// //                     </div>
// //                     <Button
// //                       className=" text-white bg-primary text-lg font-medium hover:bg-primary mb-4  transition-colors duration-200"
// //                       onClick={handleChangePassword}
// //                     >
// //                       <span className="text-white">
// //                         {" "}
// //                         Changer mon mot de passe
// //                       </span>
// //                     </Button>
// //                   </div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {/* Right Column */}
// //           <div className="space-y-6 md:space-y-8 flex items-center justify-center">
// //             <div className="flex flex-col gap-2 w-full lg:w-auto">
// //               <Button
// //                 className="bg-primary hover:bg-primary font-medium text-lg text-white px-4 py-2 transition-colors duration-200"
// //                 onClick={handleNewDemande}
// //               >
// //                 <Plus className="w-4 h-4 mr-2" />
// //                 Nouvelle demande
// //               </Button>
// //               <Button
// //                 variant="outline"
// //                 className="border-orange-400 text-orange-600 hover:bg-orange-400 text-lg transition-colors duration-200"
// //               >
// //                 <FileText className="w-4 h-4 mr-2" />
// //                 Prendre rendez-vous
// //               </Button>
// //               <Button
// //                 className="bg-secondary  hover:bg-secondary text-white font-medium text-lg transition-colors duration-200"
// //                 onClick={handleSuivreDossiers}
// //               >
// //                 <Eye className="w-4 h-4 mr-2" />
// //                 Suivre mes dossiers
// //               </Button>
// //             </div>
// //             {/* Prochains rendez-vous */}
// //           </div>
          
// //         </div>
// //         <div className="xl:col-span-3 w-full">
// //             {/* Mes dernières demandes */}
// //             <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// //                   <CardTitle className="text-lg md:text-3xl font-bold text-primary">
// //                     Mes dernières demandes
// //                   </CardTitle>
// //                   <Link
// //                     href="/mes-demandes"
// //                     className="text-primary hover:text-primary text-lg font-medium transition-colors duration-200"
// //                   >
// //                     Voir tout
// //                   </Link>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="p-0">
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full">
// //                     <thead className="bg-gray-50 border-b border-gray-200">
// //                       <tr>
// //                         <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
// //                           Type de service
// //                         </th>
// //                         <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg hidden sm:table-cell">
// //                           Numéro
// //                         </th>
// //                         <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
// //                           Statut
// //                         </th>
// //                         <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg hidden md:table-cell">
// //                           Date d'envoi
// //                         </th>
// //                         <th className="text-left py-3 px-4 md:px-6 font-semibold text-gray-700 text-lg">
// //                           Action
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {demandes.map((demande) => (
// //                         <tr
// //                           key={demande.id}
// //                           className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
// //                         >
// //                           <td className="py-4 px-4 md:px-6 font-medium text-gray-900 text-lg">
// //                             {demande.type}
// //                           </td>
// //                           <td className="py-4 px-4 md:px-6 text-gray-600 text-lg hidden sm:table-cell">
// //                             {demande.numero}
// //                           </td>
// //                           <td className="py-4 px-4 md:px-6">
// //                             <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-lg">
// //                               {demande.statut}
// //                             </Badge>
// //                           </td>
// //                           <td className="py-4 px-4 md:px-6 text-gray-600 text-lg hidden md:table-cell">
// //                             {demande.dateEnvoi}
// //                           </td>
// //                           <td className="py-4 px-4 md:px-6">
// //                             <Link href={`/mes-demandes/${demande.id}`}>
// //                               <Button
// //                                 variant="outline"
// //                                 size="sm"
// //                                 className="border-gray-300 bg-transparent text-lg hover:bg-gray-50 transition-colors duration-200"
// //                               >
// //                                 <Eye className="w-4 h-4 mr-1" />
// //                                 Voir
// //                               </Button>
// //                             </Link>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </CardContent>
// //             </Card>

// //             {/* Derniers messages reçus */}
// //             <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
// //                   <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
// //                     Derniers messages reçus
// //                   </CardTitle>
// //                   <Button className="bg-secondary hover:bg-secondary text-white text-lg transition-colors duration-200">
// //                     <MessageSquare className="w-4 h-4 mr-2" />
// //                     Accéder à ma messagerie
// //                   </Button>
// //                 </div>
// //               </CardHeader>
// //               <CardContent className="p-4 md:p-6">
// //                 <div className="space-y-4">
// //                   {messages.map((message) => (
// //                     <div
// //                       key={message.id}
// //                       className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-3 transition-colors duration-200 ${
// //                         message.isRead
// //                           ? "border-gray-200 bg-gray-50"
// //                           : "border-blue-200 bg-blue-50"
// //                       }`}
// //                     >
// //                       <div className="flex-1">
// //                         <p className="font-medium text-gray-900 text-lg">
// //                           {message.titre}
// //                         </p>
// //                         <p className="text-md text-gray-500">{message.date}</p>
// //                       </div>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         className="border-primary text-primary hover:bg-blue-50 bg-transparent transition-colors duration-200"
// //                         onClick={() => handleReadMessage(message.id)}
// //                       >
// //                         {message.isRead ? "Lu" : "Lire"}
// //                       </Button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //             <Card className="shadow-sm border-gray-200 hover:shadow-md mt-7 transition-shadow duration-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
// //                   Prochains rendez-vous
// //                 </CardTitle>
// //               </CardHeader>
// //               <div className="p-4 md:p-6 flex gap-7 w-full">
// //                 {/* Mini Calendar */}
// //                 <div className="mb-6 max-w-full border p-4 rounded-lg w-full">
// //                   <div className="flex items-center justify-between mb-4">
// //                     <h4 className="font-semibold text-gray-900 text-sm md:text-lg">
// //                       {monthNames[currentDate.getMonth()]}{" "}
// //                       {currentDate.getFullYear()}
// //                     </h4>
// //                     <div className="flex gap-1">
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         className="w-8 h-8 p-0 border-gray-300 bg-transparent hover:bg-gray-50 transition-colors duration-200"
// //                         onClick={() =>
// //                           setCurrentDate(
// //                             new Date(
// //                               currentDate.getFullYear(),
// //                               currentDate.getMonth() - 1
// //                             )
// //                           )
// //                         }
// //                       >
// //                         <ChevronLeft className="w-4 h-4" />
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         className="w-8 h-8 p-0 border-gray-300 bg-transparent hover:bg-gray-50 transition-colors duration-200"
// //                         onClick={() =>
// //                           setCurrentDate(
// //                             new Date(
// //                               currentDate.getFullYear(),
// //                               currentDate.getMonth() + 1
// //                             )
// //                           )
// //                         }
// //                       >
// //                         <ChevronRight className="w-4 h-4" />
// //                       </Button>
// //                     </div>
// //                   </div>

// //                   <div className="grid grid-cols-7 gap-1 text-center text-lg">
// //                     {["D", "L", "M", "M", "J", "V", "S"].map((day) => (
// //                       <div key={day} className="p-2 w-fit text-lg font-medium text-gray-500">
// //                         {day}
// //                       </div>
// //                     ))}
// //                     {days.map((day, index) => {
// //                       const isCurrentMonth =
// //                         day.getMonth() === currentDate.getMonth();
// //                       const isToday =
// //                         day.toDateString() === new Date().toDateString();
// //                       const hasEvent = day.getDate() === 12 && isCurrentMonth;

// //                       return (
// //                         <div
// //                           key={index}
// //                           className={`p-2 text-md w-fit cursor-pointer transition-colors duration-200 ${
// //                             !isCurrentMonth
// //                               ? "text-gray-300"
// //                               : isToday
// //                               ? "bg-blue-600 text-white rounded"
// //                               : hasEvent
// //                               ? "bg-green-500 text-white rounded"
// //                               : "text-gray-700 hover:bg-gray-100 rounded"
// //                           }`}
// //                         >
// //                           {day.getDate()}
// //                         </div>
// //                       );
// //                     })}
// //                   </div>
// //                 </div>

// //                 {/* Rendez-vous list */}
// //                 <div className="space-y-3 w-full">
// //                   {rendezVous.map((rdv) => (
// //                     <div
// //                       key={rdv.id}
// //                       className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border border-gray-200 rounded-lg gap-3 hover:bg-gray-50 transition-colors duration-200"
// //                     >
// //                       <div className="flex-1">
// //                         <p className="font-medium text-gray-900 text-lg">
// //                           {rdv.date}
// //                         </p>
// //                         <p className="text-md text-gray-500">{rdv.titre}</p>
// //                       </div>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         className="border-primary text-primary hover:bg-blue-50 text-lg bg-transparent transition-colors duration-200"
// //                         onClick={() => handlePlanifierRdv(rdv.id)}
// //                       >
                       
// //                         Modifier
// //                       </Button>
// //                       <Button
// //                         variant="outline"
// //                         size="sm"
// //                         className="border-red-500 text-red-500 hover:bg-blue-50 text-lg bg-transparent transition-colors duration-200"
// //                         onClick={() => handlePlanifierRdv(rdv.id)}
// //                       >
// //                         <Trash2/>
// //                       </Button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </Card>

// //             {/* Infos mairie & alertes citoyennes */}
// //             <Card className="shadow-sm border-gray-200 mt-7 hover:shadow-md transition-shadow duration-200">
// //               <CardHeader className="border-b border-gray-200">
// //                 <CardTitle className="text-lg md:text-3xl font-semibold text-primary">
// //                   Infos mairie & alertes citoyennes
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="p-4 md:p-6 w-full">
// //                 <div className="space-x-4 flex w-full">
// //                   {infosMailrie.map((info, index) => (
// //                     <div
// //                       key={index}
// //                       className="p-4 border w-full border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
// //                     >
// //                       <h4 className="font-semibold text-gray-900 text-xl mb-1">
// //                         {info.titre}
// //                       </h4>
// //                       <p className="text-lg text-gray-600">
// //                         {info.description}
// //                       </p>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client"

// import { useState, useEffect } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Bell, User, ChevronLeft, ChevronRight, Plus, Eye, MessageSquare, Calendar, FileText } from "lucide-react"
// import { useMyServiceRequests } from "@/hooks/services-requests/use-service-request"
// import Sidebar from "@/components/sidebar"
// import { useProfile } from "@/hooks"


// export default function TableauDeBordPage() {
//   const [currentDate, setCurrentDate] = useState(new Date(2024, 6))
//   const [isLoading, setIsLoading] = useState(true)
//   const [notifications, setNotifications] = useState(3)

//   const { data: demandesData } = useMyServiceRequests({ limit: 5 })

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsLoading(false)
//     }, 1000)
//     return () => clearTimeout(timer)
//   }, [])

//   const generateCalendar = () => {
//     const year = currentDate.getFullYear()
//     const month = currentDate.getMonth()
//     const firstDay = new Date(year, month, 1)
//     const lastDay = new Date(year, month + 1, 0)
//     const startDate = new Date(firstDay)
//     startDate.setDate(startDate.getDate() - firstDay.getDay())

//     const days = []
//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate)
//       date.setDate(startDate.getDate() + i)
//       days.push(date)
//     }
//     return days
//   }

//   const navigateMonth = (direction: number) => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction))
//   }

//   const getStatusBadge = (statut: string) => {
//     switch (statut) {
//       case "validee":
//         return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Validée</Badge>
//       case "en_cours":
//         return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
//       case "en_attente":
//         return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">En attente</Badge>
//       case "refusee":
//         return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Refusée</Badge>
//       default:
//         return <Badge variant="secondary">{statut}</Badge>
//     }
//   }

//   const days = generateCalendar()
// const {data:profileData} = useProfile()
//   if (isLoading) {
//     return (
//       <div className="flex min-h-screen bg-gray-50">
//         <div className="flex-1 flex items-center justify-center">
//           <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar/>
//       <div className="flex-1 p-4 md:p-8 ml-72">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-primary">Mon espace citoyen</h1>
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <Bell className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
//               {notifications > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {notifications}
//                 </span>
//               )}
//             </div>
//             <User className="w-5 md:w-6 h-5 md:h-6 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 md:gap-8">
//           {/* Left Column */}
//           <div className="xl:col-span-3 space-y-6 md:space-y-8">
//             {/* Informations citoyennes */}
//             <Card className="shadow-sm bg-gray-100 hover:shadow-md transition-shadow duration-200">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg md:text-3xl font-bold text-orange-600">Informations citoyennes</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 md:p-6">
//                 <div className="flex flex-col lg:flex-row items-start gap-4 md:gap-6">
//                   <Avatar className="w-16 md:w-40 h-16 md:h-40 border-4 border-gray-200 mx-auto lg:mx-0">
//                     <AvatarImage src="/placeholder.svg?height=80&width=80" />
//                     <AvatarFallback className="text-lg md:text-xl font-semibold bg-blue-100 text-blue-600">
//                       AC
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 text-center lg:text-left">
//                     <h3 className="font-bold text-lg md:text-2xl text-gray-900 mb-1">{profileData?.firstName}{profileData?.lastName}</h3>
//                     <div className="space-y-1 text-lg text-gray-600 mb-4">
//                       <p>
//                         <span className="font-medium text-lg">Quartier :</span> {profileData?.city}
//                       </p>
//                       <p>
//                         <span className="font-medium">Email :</span> {profileData?.email}
//                       </p>
//                       <p>
//                         <span className="font-medium">Téléphone :</span> {profileData?.phone}
//                       </p>
//                     </div>
//                     <Button onClick={()=>window.location.href="/dashboard/client/mon-profil"} className="bg-primary hover:bg-primary/90 text-white">Modifier mes informations</Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Mes dernières demandes */}
//             <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
//               <CardHeader className="flex flex-row items-center justify-between pb-4">
//                 <CardTitle className="text-lg md:text-xl font-bold text-gray-900">Mes dernières demandes</CardTitle>
//                 <Link href="/client/mes-demandes">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     className="text-primary border-primary hover:bg-primary hover:text-white bg-transparent"
//                   >
//                     Voir tout
//                   </Button>
//                 </Link>
//               </CardHeader>
//               <CardContent className="p-4 md:p-6">
//                 <div className="space-y-4">
//                   {demandesData?.data?.map((demande) => (
//                     <div
//                       key={demande.id}
//                       className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
//                     >
//                       <div className="flex-1 mb-2 sm:mb-0">
//                         <h4 className="font-medium text-gray-900">{demande.type}</h4>
//                         <p className="text-sm text-gray-500">N° {demande.numeroReference}</p>
//                         <p className="text-sm text-gray-500">
//                           Envoyé le {new Date(demande.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         {getStatusBadge(demande.etat)}
//                         <Link href={`/client/mes-demandes/${demande.id}`}>
//                           <Button variant="outline" size="sm">
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   ))}
//                   {(!demandesData?.data || demandesData.data.length === 0) && (
//                     <div className="text-center py-8 text-gray-500">
//                       <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
//                       <p>Aucune demande pour le moment</p>
//                       <Link href="/client/nouvelle-demande">
//                         <Button className="mt-4 bg-primary hover:bg-primary/90">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Faire une demande
//                         </Button>
//                       </Link>
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Right Column - Calendar */}
//           <div className="space-y-6">
//             <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
//               <CardHeader className="pb-4">
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="text-lg font-bold text-gray-900">
//                     {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
//                   </CardTitle>
//                   <div className="flex gap-1">
//                     <Button variant="outline" size="sm" onClick={() => navigateMonth(-1)} className="p-1 h-8 w-8">
//                       <ChevronLeft className="w-4 h-4" />
//                     </Button>
//                     <Button variant="outline" size="sm" onClick={() => navigateMonth(1)} className="p-1 h-8 w-8">
//                       <ChevronRight className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </CardHeader>
//               <CardContent className="p-4">
//                 <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
//                   {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
//                     <div key={day} className="font-medium text-gray-500 py-2">
//                       {day}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-7 gap-1">
//                   {days.map((day, index) => {
//                     const isCurrentMonth = day.getMonth() === currentDate.getMonth()
//                     const isToday = day.toDateString() === new Date().toDateString()
//                     return (
//                       <button
//                         key={index}
//                         className={`
//                           p-2 text-sm rounded hover:bg-blue-100 transition-colors
//                           ${isCurrentMonth ? "text-gray-900" : "text-gray-300"}
//                           ${isToday ? "bg-primary text-white hover:bg-primary/90" : ""}
//                         `}
//                       >
//                         {day.getDate()}
//                       </button>
//                     )
//                   })}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Actions rapides */}
//             <Card className="shadow-sm hover:shadow-md transition-shadow duration-200">
//               <CardHeader className="pb-4">
//                 <CardTitle className="text-lg font-bold text-gray-900">Actions rapides</CardTitle>
//               </CardHeader>
//               <CardContent className="p-4 space-y-3">
//                 <Link href="/client/nouvelle-demande">
//                   <Button className="w-full bg-primary hover:bg-primary/90 text-white justify-start">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Nouvelle demande
//                   </Button>
//                 </Link>
//                 <Link href="/client/mes-demandes">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     <FileText className="w-4 h-4 mr-2" />
//                     Mes demandes
//                   </Button>
//                 </Link>
//                 <Link href="/client/rendez-vous">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     <Calendar className="w-4 h-4 mr-2" />
//                     Mes rendez-vous
//                   </Button>
//                 </Link>
//                 <Link href="/client/messages">
//                   <Button variant="outline" className="w-full justify-start bg-transparent">
//                     <MessageSquare className="w-4 h-4 mr-2" />
//                     Messages
//                   </Button>
//                 </Link>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }













"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Eye,
  MessageSquare,
  Calendar,
  FileText,
  TrendingUp,
  Users,
  Clock,
} from "lucide-react"
import { useMyServiceRequests } from "@/hooks/services-requests/use-service-request"
import { useProfile } from "@/hooks"
import PageLoader from "@/components/page-loader"
import { ListSkeleton } from "@/components/skeleton-loader"
import { useUserFiles } from "@/hooks/uploads/use-upload-mutations"

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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function TableauDeBordPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 6))
  const [isLoading, setIsLoading] = useState(true)

  const { data: demandesData, isLoading: demandesLoading } = useMyServiceRequests({ limit: 5 })
  const { data: profileData, isLoading: profileLoading } = useProfile()
const {data:profilePhoto}=useUserFiles()
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const generateCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction))
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "validee":
        return (
          <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 px-3 py-1 text-xs shadow-lg">Validée</Badge>
        )
      case "en_cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs shadow-lg">En cours</Badge>
      case "en_attente":
        return (
          <Badge className="bg-amber-500 text-white hover:bg-amber-500 px-3 py-1 text-xs shadow-lg">En attente</Badge>
        )
      case "refusee":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs shadow-lg">Refusée</Badge>
      default:
        return (
          <Badge variant="secondary" className="shadow-sm">
            {statut}
          </Badge>
        )
    }
  }

  const days = generateCalendar()

  if (isLoading) {
    return <PageLoader text="Chargement de votre tableau de bord..." />
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="p-4 md:p-8 space-y-8">
      {/* Welcome Header */}
      <motion.div variants={itemVariants} className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          Bienvenue, {profileData?.firstName || "Citoyen"}
        </h1>
        <p className="text-muted-foreground text-lg">Gérez vos démarches administratives en toute simplicité</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card hover-lift  border group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Demandes totales</p>
                <p className="text-3xl font-bold text-foreground">{demandesData?.total || 0}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift  border group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">En cours</p>
                <p className="text-3xl font-bold text-foreground">
                  {demandesData?.data?.filter((d) => d.etat === "en_cours").length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card hover-lift  border group">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Validées</p>
                <p className="text-3xl font-bold text-foreground">
                  {demandesData?.data?.filter((d) => d.etat === "validee").length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="xl:col-span-2 space-y-8">
          {/* Profile Card */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift  border overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-6 border-b border-border/50">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  Informations citoyennes
                </CardTitle>
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <motion.div whileHover={{ scale: 1.05 }} className="relative">
                    <Avatar className="w-24 h-24 border-4 border-primary/20 shadow-xl">
                      <AvatarImage src={profilePhoto?.profilePhoto ?? ""} />
                      <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                        {profileData?.firstName?.[0]}
                        {profileData?.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
                  </motion.div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {profileData?.firstName} {profileData?.lastName}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">Quartier:</span> {profileData?.city}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">Email:</span> {profileData?.email}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="font-medium">Téléphone:</span> {profileData?.phone}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="font-medium">Statut:</span>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">Vérifié</Badge>
                        </div>
                      </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => (window.location.href = "/dashboard/client/mon-profil")}
                        className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:border transition-all"
                      >
                        Modifier mes informations
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Requests */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift border ">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                  <FileText className="w-5 h-5 text-primary" />
                  Mes dernières demandes
                </CardTitle>
                <Link href="/dashboard/client/service-request">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-primary rounded-[4px] border-primary hover:bg-primary hover:text-white bg-transparent shadow-sm hover:shadow-md transition-all"
                  >
                    Voir tout
                  </Button>
                </Link>
              </CardHeader>
              <CardContent className="p-6">
                {demandesLoading ? (
                  <ListSkeleton items={3} />
                ) : (
                  <AnimatePresence>
                    {demandesData?.data?.length > 0 ? (
                      <div className="space-y-4">
                        {demandesData.data.map((demande, index) => (
                          <motion.div
                            key={demande.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, x: 4 }}
                            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border/50 rounded-xl hover:bg-muted/30 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <div className="flex-1 mb-2 sm:mb-0">
                              <h4 className="font-semibold text-foreground">{demande.type}</h4>
                              <p className="text-sm text-muted-foreground">N° {demande.numeroReference}</p>
                              <p className="text-sm text-muted-foreground">
                                Envoyé le {new Date(demande.createdAt).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              {getStatusBadge(demande.traitements?.[0]?.etat || demande.etat)}
                              <Link href={`/dashboard/client/service-request/${demande.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="hover:bg-primary rounded-[7px] hover:text-white transition-all bg-transparent"
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                          <FileText className="w-10 h-10 text-muted-foreground/50" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">Aucune demande</h3>
                        <p className="text-muted-foreground mb-6">Vous n'avez pas encore fait de demande de service</p>
                        <Link href="/dashboard/client/new-request">
                          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:border transition-all">
                            <Plus className="w-4 h-4 mr-2" />
                            Faire une demande
                          </Button>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Calendar */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift border ">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {currentDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}
                  </CardTitle>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(-1)}
                      className="p-1 h-8 w-8 hover:bg-primary hover:text-white transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth(1)}
                      className="p-1 h-8 w-8 hover:bg-primary hover:text-white transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                  {["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"].map((day) => (
                    <div key={day} className="font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => {
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                    const isToday = day.toDateString() === new Date().toDateString()
                    return (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          p-2 text-sm rounded-lg hover:bg-primary/10 transition-all duration-200
                          ${isCurrentMonth ? "text-foreground" : "text-muted-foreground/50"}
                          ${isToday ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg" : ""}
                        `}
                      >
                        {day.getDate()}
                      </motion.button>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <Card className="glass-card hover-lift border ">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-foreground">Actions rapides</CardTitle>
              </CardHeader>
              <CardContent className="p-4 space-y-3">
                {[
                  {
                    href: "/dashboard/client/new-request",
                    icon: Plus,
                    label: "Nouvelle demande",
                    gradient: "from-emerald-500 to-green-500",
                  },
                  { href: "/dashboard/client/service-request", icon: FileText, label: "Mes demandes", variant: "outline" },
                  {
                    href: "/dashboard/client/notifications",
                    icon: Calendar,
                    label: "Notifications",
                    variant: "outline",
                  },
                  {
                    href: "/dashboard/client/mon-profil",
                    icon: MessageSquare,
                    label: "Mon profil",
                    variant: "outline",
                  },
                ].map((action, index) => (
                  <motion.div
                    key={action.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link href={action.href}>
                      <Button
                        className={`w-full justify-start transition-all duration-200 ${
                          action.gradient
                            ? `bg-gradient-to-r ${action.gradient} hover:shadow-lg text-white`
                            : "bg-transparent hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
                        }`}
                        variant={action.variant as any}
                      >
                        <action.icon className="w-4 h-4 mr-2" />
                        {action.label}
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
