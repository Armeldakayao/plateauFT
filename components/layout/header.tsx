// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";
// import { Menu, X } from "lucide-react";
// import { useApp } from "@/providers/app-provider";
// import { cn } from "@/lib/utils";

// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { isAuthenticated } = useApp();

//   const menuItems = [
//     { label: "Accueil", href: "/" },
//     { label: "La Mairie", href: "/la-mairie" },
//     { label: "Services Administratifs", href: "/services" },
//     { label: "Démarches", href: "/demarches" },
//     { label: "Actualités", href: "/actualites" },
//     { label: "Contact", href: "/contact" },
//   ];

//   return (
//     <header>
//       <div className="bg-[#34A853] py-2">
//         <div className="py-4 md:px-16 px-4 text-md font-semibold">
//           <div className="text-white">
//             Actualités de la commune - Vous êtes sur le site municipal du
//             Plateau (01/01/2024)
//           </div>
//         </div>
//       </div>
//       <div className="bg-white border-b">
//         <div className=" md:px-16 px-4 py-4">
//           <div className="flex items-center justify-between">
//             <Link href="/" className="flex items-center space-x-2">
//               <Image
//                 src="/images/footer2.svg"
//                 alt="Logo Commune du Plateau"
//                 width={100}
//                 height={100}

//               />
//               {/* <span className="font-bold text-primary">LOGO</span> */}
//             </Link>

//             <div className="hidden md:flex items-center space-x-10">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={cn(
//                     "text-lg font-medium hover:text-primary transition-colors",
//                     pathname === item.href ? "text-primary" : "text-black"
//                   )}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </div>
//               <div className="flex items-center space-x-4">
//                 {false ? (
//                   <Link href="/dashboard" className="btn-primary text-sm">
//                     MON ESPACE
//                   </Link>
//                 ) : (
//                   <Link href="/connexion" className="btn-secondary text-sm">
//                     SE CONNECTER
//                   </Link>
//                 )}

//                 <button
//                   className="md:hidden text-gray-600 hover:text-primary"
//                   onClick={() => setIsMenuOpen(!isMenuOpen)}
//                 >
//                   {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//                 </button>
//               </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-b">
//           <div className="container-custom py-4">
//             <nav className="flex flex-col space-y-4">
//               {menuItems.map((item) => (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className={cn(
//                     "text-sm font-medium hover:text-primary transition-colors",
//                     pathname === item.href ? "text-primary" : "text-gray-600"
//                   )}
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//             </nav>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }
"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
// import { useApp } from "@/providers/app-provider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useProfile } from "@/hooks";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  // const { isAuthenticated } = useApp();
const {data:profileData}=useProfile()
  const menuItems = [
    { label: "Accueil", href: "/" },
    { label: "La Mairie", href: "/la-mairie" },
    { label: "Services Administratifs", href: "/services" },

    { label: "Actualités", href: "/actualites" },
    { label: "Où aller ?", href: "/ou-aller" },
    // { label: "Contact", href: "/contact" },
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

   const fakeNews = [
    {
      id: 1,
      title: "Réouverture du marché central après rénovation",
      date: "25/07/2025",
      icon: "🛒",
    },
    {
      id: 2,
      title: "Campagne de vaccination gratuite ce week-end",
      date: "23/07/2025",
      icon: "💉",
    },
    {
      id: 3,
      title: "Coupure d'eau prévue le 28/07 dans certains quartiers",
      date: "22/07/2025",
      icon: "🚱",
    },
    {
  id: 4,
  title: "🇨🇮 07 août – Fête de l'Indépendance dans votre commune à 08h",
  date: "20/07/2025",
  icon: "🇨🇮",
}
,
    {
      id: 5,
      title: "Travaux de réfection de voirie dès le 30 juillet",
      date: "19/07/2025",
      icon: "🚧",
    },
    {
      id: 6,
      title: "Appel à candidatures pour les bourses d’études 2025",
      date: "18/07/2025",
      icon: "🎓",
    },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed w-full top-0 z-50 shadow-md backdrop-blur-md bg-black/20  dark:bg-gray-900"
    >
      {/* Top info banner */}
      <div className="relative w-full bg-green-600 overflow-hidden z-50 h-12 flex items-center">
        <div className="absolute whitespace-nowrap animate-marquee font-medium text-white text-lg">
          {fakeNews.map((news) => (
            <span key={news.id} className="mx-8">
              {news.title} - <span className="text-sm">{news.date}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="">
        <div className="md:px-16 px-4 py-1">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="flex space-x-4 items-center"
              >
                <Image
                  src="/images/armoirie.svg"
                  alt="Logo Commune du Plateau"
                  width={50}
                  height={50}
                />
                <Image
                  src="/images/footer2.svg"
                  alt="Logo Commune du Plateau"
                  width={100}
                  height={100}
                />
              </motion.div>
            </Link>

            {/* Menu items (desktop) */}
            <div className="hidden lg:flex items-center space-x-10">
              {menuItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={navVariants}
                >
                  <div
                   onClick={()=>window.location.href=item.href}
                    className={cn(
                      "text-lg font-medium cursor-pointer hover:text-primary transition-colors",
                      pathname === item.href ? "text-secondary font-bold" : "text-white"
                    )}
                  >
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Auth + Burger */}
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-4"
            >
              {//@ts-ignore
              !profileData?.email ? (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1], scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Link
                    href="/connexion"
                    className="btn-secondary text-sm shadow hover:shadow-md"
                  >
                    ESPACE CITOYEN
                  </Link>
                </motion.div>
              ) : (
                <Link href="/dashboard/client" className="btn-primary text-sm">
                  MON ESPACE
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                className="md:hidden text-gray-600 hover:text-primary"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-b overflow-hidden"
          >
            <div className="px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navVariants}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-sm font-medium hover:text-primary transition-colors",
                        pathname === item.href
                          ? "text-primary"
                          : "text-gray-600"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
