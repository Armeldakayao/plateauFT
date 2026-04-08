"use client"

import { motion } from "framer-motion"
import Image from "next/image"

// Variants parent pour effet cascade
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

const infoBoxVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
}

export default function MairieSection() {
  return (
    <motion.section
      className="py-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="px-6 md:px-40">
        <motion.p
          className="text-primary mt-16 text-center pb-10 font-bold md:text-5xl text-4yarxl"
          variants={itemVariants}
        >
          Une mairie proche de ses citoyens
        </motion.p>

        <div className="flex flex-col md:flex-row gap-16 items-center">
          {/* Image animée */}
          <motion.div variants={imageVariants}>
           <Image
                             src="/images/mairie-site.svg"
                             alt="Mairie du Plateau"
                             width={1000}
                             height={1000}
                             className="rounded-lg object-cover"
                           />
          </motion.div>

          {/* Texte + bloc info */}
          <motion.div
            className="flex flex-col max-w-4xl"
            variants={containerVariants}
          >
            <motion.p
              className="text-xl text-black font-light lg:mt-7 leading-10 opacity-70 mb-4"
              variants={itemVariants}
            >
              Située au cœur du quartier d'affaires d'Abidjan, la Mairie du
              Plateau joue un rôle clé dans la gestion de la commune. Elle
              incarne l'administration de proximité, en lien direct avec les
              citoyens, les entreprises et les institutions.
               Située au cœur du quartier d'affaires d'Abidjan, la Mairie du
              Plateau joue un rôle clé dans la gestion de la commune. Elle
              incarne l'administration de proximité, en lien direct avec les
              citoyens, les entreprises et les institutions.
            </motion.p>

            <motion.div
              className="bg-primary p-6 rounded mt-4 text-white space-y-4"
              variants={infoBoxVariants}
            >
              <p>Adresse : Rue des banques, Plateau, Abidjan</p>
              <p>Téléphone : +225 27 20 33 20 37</p>
              <p>Email : contact@mairieplateau.net</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
