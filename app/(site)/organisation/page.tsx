"use client";

import type React from "react";

import Link from "next/link";
import { FileText, Search, ChevronDown } from "lucide-react";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/service-card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrganizationGrid from "@/components/organistaion-grid";

export default function Services() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  // Catégories de services
  const categories = [
    {
      id: "etat-civil",
      title: "État civil",
      services: [
        {
          id: "acte-naissance",
          title: "Acte de naissance",
          description: "Demander une copie d'acte de naissance",
        },
        {
          id: "acte-mariage",
          title: "Acte de mariage",
          description: "Demander une copie d'acte de mariage",
        },
        {
          id: "acte-deces",
          title: "Acte de décès",
          description: "Demander une copie d'acte de décès",
        },
        {
          id: "certificat-residence",
          title: "Certificat de résidence",
          description: "Obtenir un certificat de résidence",
        },
        {
          id: "acte-naissance",
          title: "Acte de naissance",
          description: "Demander une copie d'acte de naissance",
        },
        {
          id: "acte-mariage",
          title: "Acte de mariage",
          description: "Demander une copie d'acte de mariage",
        },
      ],
    },
   
  ];

  // Logique de filtrage et recherche
  const filteredCategories = useMemo(() => {
    let filtered = categories;

    // Filtrage par catégorie
    if (selectedFilter !== "Tous") {
      filtered = categories.filter((category) => {
        const filterMap: { [key: string]: string } = {
          "État civil": "etat-civil",
          "Documents administratifs": "documents-administratifs",
          Urbanisme: "urbanisme-logement",
          Environnement: "environnement-proprete",
          Éducation: "education-jeunesse",
        };
        return category.id === filterMap[selectedFilter];
      });
    }

    // Recherche par terme
    if (searchTerm.trim()) {
      filtered = filtered
        .map((category) => ({
          ...category,
          services: category.services.filter(
            (service) =>
              service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              service.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          ),
        }))
        .filter((category) => category.services.length > 0);
    }

    return filtered;
  }, [searchTerm, selectedFilter, categories]);

  const handleSearch = () => {
    console.log("Recherche:", searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

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
  };
  const router = useRouter();
  return (
    <div className="min-h-screen ">
      <motion.div
        className="   "
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section
          className="relative text-white pt-64 pb-40  px-6 overflow-hidden"
          variants={itemVariants}
        >
          {/* Image de fond */}
          <Image
            src="/images/organe-bg.svg" // ← Remplace par ton image réelle
            alt="Image de fond section services"
            fill
            className="object-cover  z-0"
            priority
          />

          {/* Overlay sombre */}
          <div className="absolute inset-0 bg-gradient-to-t  to-primary/40 from-primary/40  z-10" />

          {/* Contenu au premier plan */}
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.h1
              className="text-3xl md:text-[68px] font-bold pt-10 pb-10 "
              variants={itemVariants}
            >
            L’organe dirigeante
            </motion.h1>
            <motion.p
              className="text-white pb-12 leading-10 text-3xl"
              variants={itemVariants}
            >
              La mairie est dirigée par un organe composé de 37 membres, avec à sa tête le Maire Jacques Ehouo. Chaque direction travaille à répondre efficacement aux besoins des citoyens.
            </motion.p>

            {/* Barre de recherche et filtre */}
          

          
          </div>
        </motion.section>

       <motion.div className="relative overflow-hidden">
  {/* Vidéo de fond */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/videos/blue-digital.mp4" type="video/mp4" />
    Votre navigateur ne supporte pas la vidéo HTML5.
  </video>

  {/* Overlay si besoin */}
  {/* <div className="absolute inset-0 bg-black/10 z-0"></div> */}

  {/* Contenu principal */}
  <motion.div
    className="relative z-[1] p-10  lg:max-w-8xl mx-auto"
    variants={itemVariants}
  >
    <OrganizationGrid/>
  </motion.div>
</motion.div>

      </motion.div>
    
    </div>
  );
}
