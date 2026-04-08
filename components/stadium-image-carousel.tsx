import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

export default function StadiumImageCarousel() {
  const images = [
    {
      id: 1,
      src: "/placeholder.svg?height=720&width=1280",
      alt: "Stade Félix-Houphouët-Boigny",
      title: "Stade Félix-Houphouët-Boigny",
      description:
        "Le Stade Félix Houphouët-Boigny, surnommé « Le Félicia », est le premier stade national polyvalent (football, rugby, athlétisme) de la Côte d'Ivoire. Du temps du premier Président de la Côte d'Ivoire, Félix Houphouët-Boigny, situé dans la commune du Plateau d'Abidjan, sa capacité d'accueil précédente est de 35 000 places.",
    },
    {
      id: 2,
      src: "/placeholder.svg?height=720&width=1280",
      alt: "Modern City View",
      title: "Modern City View",
      description:
        "A vibrant cityscape with towering skyscrapers and bustling streets, reflecting the dynamic growth and development of the region.",
    },
    {
      id: 3,
      src: "/placeholder.svg?height=720&width=1280",
      alt: "Coastal City Panorama",
      title: "Coastal City Panorama",
      description:
        "A breathtaking panoramic view of a coastal city, where urban architecture meets the serene beauty of the ocean.",
    },
  ]

  return (
    <section className="w-full h-[600px] md:h-[700px] lg:h-[800px] relative overflow-hidden">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {images.map((image) => (
            <CarouselItem key={image.id} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  priority={image.id === 1} // Prioritize the first image for LCP
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8 md:p-12 lg:p-16 text-white">
                  <div className="max-w-3xl space-y-4">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">{image.title}</h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-200">{image.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white" />
      </Carousel>
    </section>
  )
}
