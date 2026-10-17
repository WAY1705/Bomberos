import React, { useState, useRef } from 'react';

const TeamSection: React.FC = () => {
  // Datos del equipo (Corregidos IDs para que sean únicos)
  const teamMembers = [
    { id: 1, name: "Ana Martínez", role: "Director General", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" },
    { id: 2, name: "Kaliana", role: "Supervisor Jefe", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { id: 3, name: "María López", role: "Analista Tecnológico", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80" },
    { id: 4, name: "Juan Pérez", role: "Oficial de Prevención", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
    { id: 5, name: "María", role: "Telecomunicaciones", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
    { id: 6, name: "Luis", role: "Director General", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80" },
    { id: 7, name: "Nathalia", role: "Supervisor Jefe", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
    { id: 8, name: "Pedro", role: "Analista Tecnológico", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80" },
    { id: 9, name: "Juan", role: "Oficial de Prevención", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
    { id: 10, name: "Sofía", role: "Telecomunicaciones", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80" },
  ];

  // ==========================================
  // LÓGICA DE SCROLL INTERACTIVO (Arrastre y Rueda)
  // ==========================================
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Velocidad de arrastre
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };
  // ==========================================

  return (
    <section className="w-full py-6 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Bloque Izquierdo: Estadísticas */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-shrink-0 select-none">
          
          <p className="text-sm md:text-base font-bold text-slate-600 uppercase tracking-widest mt-1">
            Personal
          </p>
          <div className="h-1 w-12 bg-red-600 mt-4 rounded-full"></div>
        </div>

        {/* Bloque Derecho: Tarjetas del Equipo con SCROLL INTERACTIVO */}
        <div 
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeaveOrUp}
          onMouseUp={handleMouseLeaveOrUp}
          onMouseMove={handleMouseMove}
          onWheel={handleWheel}
          className="w-full flex overflow-x-auto gap-4 md:gap-6 pb-6 pt-2 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {teamMembers.map((member) => (
            <div 
              key={member.id} 
              className="min-w-[200px] md:min-w-[230px] snap-center bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center group"
            >
              {/* Foto de Perfil */}
              <div className="relative mb-3 md:mb-4 pointer-events-none">
                <div className="absolute inset-0 bg-red-600 rounded-full blur-md opacity-0 group-hover:opacity-30 transition duration-500"></div>
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-md relative z-10 group-hover:scale-105 transition duration-300"
                  draggable="false" // IMPORTANTE: Evita que el navegador intente arrastrar la imagen
                />
              </div>
              
              {/* Información */}
              <div className="pointer-events-none">
                <h4 className="font-extrabold text-slate-900 text-xs md:text-sm text-center leading-tight group-hover:text-red-700 transition">
                  {member.name}
                </h4>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center mt-1.5 md:mt-2">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TeamSection;