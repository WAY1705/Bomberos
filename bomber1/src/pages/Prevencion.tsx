import React, { useState, useRef } from 'react';
import Header from '../components/portal/Header';
import Footer from '../components/portal/Footer';

// --- INTERFACES PARA LOS DATOS ---
interface Personnel {
  id: number;
  name: string;
  role: string;
  img: string;
  badge?: string;
}

// --- SUB-COMPONENTE: Lista Scroleable ---
const ScrollableList: React.FC<{ title: string; subtitle: string; items: Personnel[]; themeColor: string }> = ({ title, subtitle, items, themeColor }) => {
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
  const handleMouseLeaveOrUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += e.deltaY;
  };

  const badgeColors: Record<string, string> = {
    red: "bg-red-100 text-red-700 border-red-200",
    amber: "bg-amber-100 text-amber-700 border-amber-200",
  };
  const hoverShadowColors: Record<string, string> = {
    red: "group-hover:shadow-[0_10px_30px_rgba(220,38,38,0.2)]",
    amber: "group-hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]",
  };

  return (
    <div className="w-full mb-16">
      {/* Título de la sección */}
      <div className="mb-6 flex flex-col items-center md:items-start text-center md:text-left select-none">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase tracking-tight">
          {title}
        </h2>
        <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">
          {subtitle}
        </p>
      </div>

      {/* Contenedor Scroleable */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className="w-full flex overflow-x-auto gap-4 md:gap-6 pb-8 pt-2 hide-scrollbar snap-x snap-mandatory cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((person) => (
          <div 
            key={person.id} 
            /* 1. Aumentamos ligeramente el ancho de la tarjeta para que la foto más grande respire */
            className={`min-w-[200px] md:min-w-[260px] snap-center bg-[#0B1B3D]/20 backdrop-blur-xl border border-[#0B1B3D]/10 rounded-3xl p-5 md:p-6 shadow-lg hover:-translate-y-2 hover:bg-[#0B1B3D]/30 transition-all duration-300 flex flex-col items-center group relative overflow-hidden ${hoverShadowColors[themeColor]}`}
          >
            {/* Badge Opcional */}
            {person.badge && (
              <div className={`absolute top-3 right-3 text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${badgeColors[themeColor]}`}>
                {person.badge}
              </div>
            )}

            {/* Foto Redonda con Anillo */}
            <div className="relative mb-4 pointer-events-none mt-2">
              <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-40 transition duration-500 ${themeColor === 'red' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
              
              {/* 2. AQUÍ AUMENTAMOS EL TAMAÑO: Pasamos de w-24 a w-32 en escritorio y w-28 en móviles */}
              <img 
                src={person.img} 
                alt={person.name} 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white/80 shadow-md relative z-10 group-hover:scale-105 transition duration-300"
                draggable="false"
              />
            </div>
            
            {/* Info */}
            <div className="pointer-events-none text-center w-full flex-1 flex flex-col justify-center">
              <h4 className={`font-extrabold text-slate-900 text-sm md:text-lg leading-tight transition ${themeColor === 'red' ? 'group-hover:text-red-700' : 'group-hover:text-amber-700'}`}>
                {person.name}
              </h4>
              <p className="text-[10px] md:text-xs text-slate-700 font-bold uppercase tracking-wide mt-2 leading-snug">
                {person.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
const Prevencion: React.FC = () => {
  
  // Datos del Personal Humano (Lista proporcionada)
  const humanPersonnel: Personnel[] = [
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

  // Datos del Personal Animal (Unidad K9)
  const animalPersonnel: Personnel[] = [
    { id: 101, name: "Tsunami", role: "Búsqueda y Rescate Estructural", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLww2aWjb4ur2RMIXhVSg95jMM63DtmmTZnwwWPE8nxg&s", badge: "Élite" },
    { id: 102, name: "Sasha", role: "Detección de Acelerantes (Incendios)", img: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&q=80", badge: "Olfato" },
    { id: 103, name: "Bruno", role: "Rescate en Espacios Abiertos", img: "https://images.unsplash.com/photo-1521673461164-de300ebcfb17?w=300&q=80" },
    { id: 104, name: "Capitán", role: "Apoyo Psicológico y Contención", img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&q=80", badge: "Terapia" },
    { id: 105, name: "Kira", role: "Localización de Personas Desaparecidas", img: "https://images.unsplash.com/photo-1534361960057-19889db9621e?w=300&q=80" },
  ];

  return (
    <>
      <style>
        {`
          @keyframes driftNetwork {
            0% { background-position: 0px 0px; }
            100% { background-position: 600px 600px; }
          }
          .bg-network-cream {
            background-color: #FDFBF7; 
            background-image: url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23475569' stroke-width='0.3' stroke-opacity='0.2' fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M60,120 L240,50 L420,160 L540,80 L510,320 L580,510 L460,570 L310,540 L210,390 L110,520 L30,360 L140,240 Z M60,120 L140,240 M240,50 L350,220 L420,160 M350,220 L510,320 M350,220 L210,390 M210,390 L310,540 M210,390 L140,240 M140,240 L30,360 M460,570 L510,320 M460,570 L350,220 M140,240 L240,50 M310,540 L420,160' fill='none'/%3E%3Ccircle cx='60' cy='120' r='1'/%3E%3Ccircle cx='240' cy='50' r='1.5'/%3E%3Ccircle cx='420' cy='160' r='1'/%3E%3Ccircle cx='540' cy='80' r='1'/%3E%3Ccircle cx='510' cy='320' r='1.5'/%3E%3Ccircle cx='580' cy='510' r='1'/%3E%3Ccircle cx='460' cy='570' r='1.5'/%3E%3Ccircle cx='310' cy='540' r='1'/%3E%3Ccircle cx='210' cy='390' r='1.5'/%3E%3Ccircle cx='110' cy='520' r='1'/%3E%3Ccircle cx='30' cy='360' r='1.5'/%3E%3Ccircle cx='140' cy='240' r='1.5'/%3E%3Ccircle cx='350' cy='220' r='1'/%3E%3C/g%3E%3C/svg%3E");
            background-size: 600px 600px;
            animation: driftNetwork 100s linear infinite;
          }
        `}
      </style>

      <div className="min-h-screen font-sans text-slate-900 flex flex-col overflow-x-hidden bg-network-cream">
        
        <div className="relative z-50">
          <Header />
        </div>

        <main className="flex-grow w-full relative z-10 pt-32 md:pt-40 pb-8">
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full">
            
            {/* Cabecera de la Página */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mt-4">
                Conoce al equipo multidisciplinario, humano y animal, dedicado a anticipar riesgos, educar a la comunidad y garantizar la seguridad de todos.
              </p>
              <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mt-6 shadow-sm"></div>
            </div>

            {/* Listas Scroleables */}
            <ScrollableList 
              title="Personal Técnico y Operativo" 
              subtitle="" 
              items={humanPersonnel} 
              themeColor="red" 
            />

            {/* Separador Sutil */}
            <div className="w-full flex items-center justify-center py-4 relative mb-12">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent w-full max-w-4xl"></div>
                <div className="absolute w-3 h-3 bg-red-500 rotate-45 shadow-sm"></div>
            </div>

            <ScrollableList 
              title="Unidad Canina" 
              subtitle="Nuestros héroes de cuatro patas" 
              items={animalPersonnel} 
              themeColor="red" 
            />

          </div>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Prevencion;