"use client"

import { usePathname } from "next/navigation"
import { ContextualHelp } from "./contextual-help"

export function FloatingHelpButton() {
  const pathname = usePathname()

  // Extract page key from pathname
  const getPageKey = (path: string): string => {
    if (path === "/" || path === "/dashboard/client/tableau-de-bord") return "tableau-de-bord"
    if (path.startsWith("/dashboard/client/mes-demandes")) return "mes-demandes"
     if (path.startsWith("/dashboard/client/service-request")) return "mes-demandes"
    if (path.startsWith("/dashboard/client/new-request")) return "new-request"
    if (path.startsWith("/dashboard/client/mon-profil")) return "mon-profil"
    if (path.startsWith("/dashboard/client/notifications")) return "notifications"
    if (path.startsWith("/dashboard/client/aide-assistant")) return "aide-assistant"
    return "tableau-de-bord" // default
  }

  const pageKey = getPageKey(pathname)

  return <ContextualHelp pageKey={pageKey} />
}
