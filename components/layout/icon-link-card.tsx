"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

interface Props {
  icon: string
  title: string
}

export default function IconLinkCard({ icon: Icon, title }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 12 }}
    >
      <Card className="bg-transparent space-y-5 dark:bg-gray-800/90 border-none shadow-none hover:shadow-none p-4 flex flex-col items-center text-center cursor-pointer h-full">
        <div className=" mb-3">
          <img src={Icon} alt={title} className="w-full h-full text-white" />
        </div>
        <div className="w-[100px] h-1 bg-[#06C851] dark:bg-[#06C851]"></div>
        <h3 className="text-[21px] font-bold text-white dark:text-white">{title}</h3>
      </Card>
    </motion.div>
  )
}
