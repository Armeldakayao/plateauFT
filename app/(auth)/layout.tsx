"use client"
import { Bubbles } from "@/components/bubble-display";
import { motion } from "framer-motion";
import Image from "next/image";

interface LayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-[#071827] overflow-hidden">
      {/* Background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <Bubbles count={300} />
        <Image
          src="/images/bg-signup.jpg"
          alt="Background"
          fill
          className="object-contain w-full h-full"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </motion.div>

      {/* Children will inherit the layout */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
