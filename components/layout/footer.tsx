import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  Linkedin,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      {/* Section principale */}
      <div className="px-6 py-8">
        <div className="px-4 md:px-16 mx-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center">
            {/* Logo et slogan */}
           <div className="flex flex-col">
             <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/footer1.svg"
                    alt="Logo Commune du Plateau"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/footer2.svg"
                  alt="Logo Commune du Plateau"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
             <p className="mt-4 text-lg">Le Plateau, 100 % digital. 100 % citoyen.</p>
           </div>

            {/* Contact et WhatsApp */}
            <div className="flex flex-col  lg:items-end lg:justify-end gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-black font-medium mb-1">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span className="text-md">Hôtel de Ville, Plateau</span>
                </div>
                <div className="flex items-center gap-2 text-black font-medium">
                  <Phone className="h-4 w-4" />
                  <span className="font-medium">27 20 00 00 00</span>
                </div>
              </div>
              <div>
                <Button className="bg-primary hover:bg-primary/80 rounded  text-white px-4 py-2 text-sm">
                  <Phone className="h-4 w-4 mr-2" /> Discuter avec Kouassi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-100 px-6 py-4">
        <div className="px-4 md:px-16 mx-auto">
          <nav className="flex flex-wrap gap-6 ">
            <a href="#" className="text-primary font-medium">
              Accueil
            </a>
            <a href="#" className="text-primary font-medium">
              La Mairie
            </a>
            <a href="#" className="text-primary font-medium">
              Services Administratifs
            </a>
            <a href="#" className="text-primary font-medium">
              Événements
            </a>
            <a href="#" className="text-primary font-medium">
              Tourisme
            </a>
            <a href="#" className="text-primary font-medium">
              Innovation
            </a>
          </nav>
        </div>
      </div>

      {/* Section légale */}
      <div className="bg-green-600 text-white px-6 py-4">
        <div className="px-4 md:px-16 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="hover:text-green-200">
                Mentions légales
              </a>
              <span className="text-green-300">|</span>
              <a href="#" className="hover:text-green-200">
                Politique de confidentialité
              </a>
              <span className="text-green-300">|</span>
              <a href="#" className="hover:text-green-200">
                Accessibilité
              </a>
              <span className="text-green-300">|</span>
              <a href="#" className="hover:text-green-200">
                Plan du site
              </a>
            </div>

            <div className="flex gap-3">
              <a
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Facebook className="h-5 w-5 text-secondary" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Instagram className="h-5 w-5 text-secondary" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Linkedin className="h-5 w-5 text-secondary" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Twitter className="h-5 w-5 text-secondary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
