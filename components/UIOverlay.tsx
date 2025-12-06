import React from 'react';

export const UIOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8 md:p-12 z-10 text-arix-gold">
      {/* Header */}
      <header className="flex justify-between items-start animate-fade-in">
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-arix-gold via-white to-arix-gold drop-shadow-lg">
            ARIX
          </h1>
          <p className="font-serif text-sm md:text-lg text-arix-gold-light tracking-[0.2em] mt-2 uppercase opacity-80">
            Signature Interactive
          </p>
        </div>
        <div className="hidden md:block">
           <span className="font-serif text-xs tracking-widest border border-arix-gold/30 px-4 py-2 rounded-full backdrop-blur-sm bg-arix-emerald/20">
             EST. 2024
           </span>
        </div>
      </header>

      {/* Center - Decorative Text (Optional) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-20">
         <h2 className="font-display text-[10rem] leading-none text-arix-gold blur-[2px]">NOËL</h2>
      </div>

      {/* Footer Controls */}
      <footer className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div className="max-w-md pointer-events-auto">
          <h3 className="font-display text-xl mb-2 text-white">The Golden Spiral</h3>
          <p className="font-serif text-sm text-gray-400 leading-relaxed mb-4">
            Experience the convergence of luxury and digital art. 
            Drag to rotate, scroll to zoom. Immerse yourself in the emerald silence.
          </p>
          <button 
            className="group relative px-6 py-3 overflow-hidden bg-transparent border border-arix-gold/40 hover:border-arix-gold transition-colors duration-500"
            onClick={() => window.open('https://google.com', '_blank')}
          >
            <div className="absolute inset-0 w-0 bg-arix-gold transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></div>
            <span className="relative font-serif text-xs tracking-widest uppercase group-hover:text-white transition-colors">
              Explore Collection
            </span>
          </button>
        </div>
        
        <div className="text-right hidden md:block opacity-60">
           <p className="font-serif text-xs">Lat: 48.8566° N</p>
           <p className="font-serif text-xs">Long: 2.3522° E</p>
        </div>
      </footer>
    </div>
  );
};