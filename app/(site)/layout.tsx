// import Footer from "@/components/layout/footer";
// import Header from "@/components/layout/header";
// import type React from "react";
// import "../globals.css";
// import ChatbotPopup from "@/components/chatbot";
// import SmoothScroll from "@/components/smooth-scroll";

// export default function SiteLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <SmoothScroll>{children}</SmoothScroll>
//       </main>
//       <ChatbotPopup />
//       <Footer />
//     </div>
//   );
// }

"use client"
import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import type React from "react"
import ChatbotPopup from "@/components/chatbot"
import SmoothScroll from "@/components/smooth-scroll"
import GradientAnimation from "@/components/gradient"
import { GridBackground } from "@/components/grid-background"
// import { GridBackground } from "@/components/grid-background"




interface SiteLayoutProps {
  children: React.ReactNode
  animation?: "bubbles" | "particles" | "waves" | "gradient" | "dots" | "none"
}

export default function SiteLayout({ children, animation = "waves" }: SiteLayoutProps) {
  
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      <main className="flex-grow relative z-10">
        <SmoothScroll>
      <GridBackground />
          
          {children}</SmoothScroll>
      </main>
      <ChatbotPopup />
      <Footer />
    </div>
  )
}
