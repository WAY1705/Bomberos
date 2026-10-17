import React, { useState, useEffect } from 'react';

const slides = [
  {
    id: 0,
    title: 'PREVENCIÓN',
    desc: 'Desarrollamos estrategias y planes de mitigación de riesgos para salvaguardar vidas y bienes en nuestras comunidades.',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    img: 'https://images.unsplash.com/photo-1599708153386-62bf3f035f78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 1,
    title: 'ACADEMIA',
    desc: 'Centro de formación integral para la capacitación teórica y táctica del personal de bomberos y voluntarios.',
    icon: 'M12 14l9-5-9-5-9 5 9 5z',
    img: 'https://images.unsplash.com/photo-1611004107386-45ef130f4a8b?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 2,
    title: 'NORMATIVAS',
    desc: 'Leyes, reglamentos y normativas vigentes en materia de seguridad, prevención de incendios y desastres.',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    img: 'https://images.unsplash.com/photo-1582210747440-5e5d315abf84?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 3,
    title: 'TRAYECTOS',
    desc: 'Programas educativos y mallas curriculares orientadas a la especialización y ascenso profesional.',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    img: 'https://images.unsplash.com/photo-1543261559-009c916244ab?auto=format&fit=crop&w=1000&q=80'
  }
];

const HeroCarousel: React.FC = () => {
  const [active, setActive] = useState(0);

  // Auto-reproducción del carrusel
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
      
      {/* Lado Izquierdo: Imagen principal que cambia */}
      <div className="lg:col-span-2 relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl h-full group">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${active === idx ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: `url(${slide.img})` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/95 via-[#0B1B3D]/40 to-transparent"></div>
          </div>
        ))}
        
        <div className="absolute bottom-8 left-8 right-8 z-10">
          <span className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider mb-3 inline-block shadow-lg">
            Sistema Integrado
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
            {slides[active].title}
          </h2>
          <p className="text-slate-200 mt-3 text-sm md:text-base max-w-xl font-medium drop-shadow">
            {slides[active].desc}
          </p>
        </div>
      </div>

      {/* Lado Derecho: Pestañas Interactivas (Acordeón) */}
      <div className="flex flex-col gap-3 h-full justify-between">
        {slides.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => setActive(idx)}
            className={`flex-1 flex flex-col text-left px-5 py-4 rounded-2xl transition-all duration-500 overflow-hidden ${
              active === idx
                ? 'bg-[#0B1B3D] border-2 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)] scale-[1.02]'
                : 'bg-white/70 hover:bg-white backdrop-blur-md border border-slate-200 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-lg transition-colors ${active === idx ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-900'}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={slide.icon}></path>
                </svg>
              </div>
              <span className={`font-bold tracking-wide ${active === idx ? 'text-white text-lg' : 'text-[#0B1B3D] text-base'}`}>
                {slide.title}
              </span>
            </div>
            
            {/* Texto Desplegable del Acordeón */}
            <div className={`transition-all duration-500 ease-in-out ${active === idx ? 'max-h-32 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-sm text-blue-100 leading-relaxed">
                {slide.desc}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;