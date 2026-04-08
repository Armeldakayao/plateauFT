"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Menu, Search } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

export function DashboardHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <motion.header
      className="bg-white border-b p-4 sticky top-0 z-10"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <h2 className="text-lg font-semibold hidden md:block">Mes demandes</h2>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative md:w-64"
            >
              <Input placeholder="Rechercher..." className="pr-8" autoFocus onBlur={() => setIsSearchOpen(false)} />
              <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </motion.div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
