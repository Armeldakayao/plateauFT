import React, { useState, useEffect } from 'react';

const AnimatedTimeline = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);

  const timelineData = [
    { year: "1904", title: "Fondation du \n Plateau" },
    { year: "1956", title: "Création de la \n mairie" },
    { year: "2001", title: "Nouveau plan de \n développement" },
    { year: "2020", title: "Digitalisation des \n services" },
  ];

  // Animation progressive continue
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressWidth(prev => {
        if (prev >= 100) {
          // Reset quand on arrive à 100%
          setTimeout(() => setProgressWidth(0), 500);
          return 100;
        }
        return prev + 0.5; // Vitesse d'animation ajustable
      });
    }, 50); // Fréquence de mise à jour

    return () => clearInterval(interval);
  }, []);

  // Auto-slide pour le carrousel
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % 4);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className=" bg-gray-50">
      <section className="py-12 bg-[#F5F5F5]">
        <div className="mx-auto">
          {/* Titre et description */}
          <div className="mb-12 max-w-6xl mx-auto px-4">
            <h2 className="text-2xl text-center md:text-5xl font-bold text-primary mb-6">
              Une commune chargée d'histoire
            </h2>
            <p className="text-xl text-black font-light mt-7 leading-10 opacity-70 mb-4">
              La Commune du Plateau est l'une des plus anciennes et prestigieuses d'Abidjan. Depuis sa création, elle
              a connu une évolution remarquable, devenant un centre névralgique de la vie politique, économique et
              culturelle de la Côte d'Ivoire.
            </p>
          </div>

          {/* Timeline Animée */}
        {/* Timeline Animée */}
<div className="mb-12 bg-primary rounded-[10px] max-w-6xl mx-auto px-4">
  <div className="relative py-16 px-8">
    {/* Ligne de base */}
    {/* <div className="absolute top-20 left-8 right-8 h-0.5 bg-white/30 hidden md:block" /> */}
    
    {/* Ligne de progression */}
    {/* <div 
      className="absolute top-20 left-8 h-0.5 bg-white hidden md:block transition-all duration-75 ease-linear"
      style={{ 
        width: `${Math.min(progressWidth * (100 - 16) / 100, 100 - 16)}%`,
        right: 'auto'
      }}
    /> */}

    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
      {timelineData.map((item, index) => {
        const shouldAnimate = progressWidth >= (index * 25);
        const isActive = progressWidth >= (index * 25) && progressWidth < ((index + 1) * 25);

        return (
          <div
            key={index}
            className={`relative flex flex-col items-center text-center transition-all duration-500 ${
              shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-4'
            }`}
          >
            {/* Cercle */}
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center z-20 transition-all duration-500 mb-4 ${
                shouldAnimate 
                  ? (isActive ? 'bg-white scale-125 shadow-lg' : 'bg-white scale-100') 
                  : 'bg-white/50 scale-75'
              }`}
            >
              {shouldAnimate && (
                <div className={`w-2 h-2 rounded-full ${
                  isActive ? 'bg-blue-600' : 'bg-blue-600/70'
                }`} />
              )}
            </div>

            {/* Année */}
            <div className={`text-white font-bold mb-2 text-lg transition-all duration-300 ${
              isActive ? 'text-white scale-110' : ''
            }`}>
              {item.year}
            </div>

            {/* Titre */}
            <h3 className={`text-white text-sm transition-all duration-300 ${
              isActive ? 'text-white font-semibold' : ''
            }`}>
              {item.title.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </h3>
          </div>
        );
      })}
    </div>

    {/* Ligne horizontale visible uniquement sur grand écran */}
    <div className="absolute top-[92px] left-8 right-8 h-0.5 bg-white/30 hidden md:block z-0" />
    <div 
      className="absolute top-[92px] left-8 h-0.5 bg-white hidden md:block transition-all duration-75 ease-linear z-10"
      style={{ 
        width: `${Math.min(progressWidth * (100 - 16) / 100, 100 - 16)}%`,
        right: 'auto'
      }}
    />

    {/* Barre de progression en bas */}
    {/* <div className="mt-16 flex justify-center">
      <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full transition-all duration-75 ease-linear"
          style={{ width: `${progressWidth}%` }}
        />
      </div>
    </div> */}
  </div>
</div>


          {/* Carrousel d'images */}
         
        </div>
      </section>
    </div>
  );
};

export default AnimatedTimeline;