// import type React from "react"
// import { Users, Building, UsersRound } from "lucide-react"

// interface StatItemProps {
//   icon: React.ReactNode
//   value: string
//   label: string
// }

// function StatItem({ icon, value, label }: StatItemProps) {
//   return (
//     <div className="flex gap-2  items-center ">
//       <div className="text-primary mb-2">{icon}</div>
//      <div className="flex flex-col ">
//          <div className="text-secondary text-4xl font-bold leading-none">{value}</div>
//       <div className="text-primary text-xl">{label}</div>
//      </div>
//     </div>
//   )
// }


// export default function StatsSection() {
//   const stats = [
//     {
//       icon: <Users size={56} />,
//       value: "22 000",
//       label: "habitants",
//     },
//     {
//       icon: <Building size={56} />,
//       value: "17 services",
//       label: "municipaux",
//     },
//     {
//       icon: <UsersRound size={56} />,
//       value: "+150 agents",
//       label: "mobilisés",
//     },
//   ]

//   return (
//     <div className="bg-gray-50 rounded-xl p-16 mx-72 my-20 shadow-sm">
//       <div className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-16">
//         {stats.map((stat, index) => (
//           <StatItem key={index} icon={stat.icon} value={stat.value} label={stat.label} />
//         ))}
//       </div>
//     </div>
//   )
// }
"use client"

import { motion } from "framer-motion"
import { Users, Building, UsersRound } from "lucide-react"
import type React from "react"

interface StatItemProps {
  icon: React.ReactNode
  value: string
  label: string
}

function StatItem({ icon, value, label }: StatItemProps) {
  return (
    <motion.div
      variants={itemVariant}
      className="flex gap-4 items-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-primary mb-2">{icon}</div>
      <div className="flex flex-col">
        <div className="text-secondary text-4xl font-bold leading-none">{value}</div>
        <div className="text-primary text-xl">{label}</div>
      </div>
    </motion.div>
  )
}

// Variants pour animation en cascade
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // délai entre chaque enfant
    },
  },
}

const itemVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function StatsSection() {
  const stats = [
    {
      icon: <Users size={56} />,
      value: "22 000",
      label: "habitants",
    },
    {
      icon: <Building size={56} />,
      value: "17 services",
      label: "municipaux",
    },
    {
      icon: <UsersRound size={56} />,
      value: "+150 agents",
      label: "mobilisés",
    },
  ]

  return (
    <motion.div
      className="bg-gray-50 rounded-xl p-16 mx-4 md:mx-72 my-20 shadow-sm"
      variants={containerVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div
        className="flex flex-col md:flex-row justify-around items-center gap-8 md:gap-16"
        variants={containerVariant}
      >
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            value={stat.value}
            label={stat.label}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}
