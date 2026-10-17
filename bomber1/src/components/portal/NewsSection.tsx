import React, { useState, useRef } from 'react';

const NewsSection: React.FC = () => {
  const newsItems = [
    { id: 1, img: "https://www.seguridad-laboral.es/wp-content/uploads/sites/6/2017/05/136916670-gi.jpg", title: "Jornada de Certificación Institucional", date: "12 JUN 2026" },
    { id: 2, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrIIeQ5hAHRrAzGDP9TYtw4SEyRbbcieRRmYSBQLVxEsMs0P_zBmw5mxp&s=10", title: "Nuevas normativas de seguridad eléctrica", date: "15 JUN 2026" },
    { id: 3, img: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&q=80", title: "Simulacro de evacuación en colegios", date: "18 JUN 2026" },
    { id: 4, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBD7FXYAtUsKcsPQxWHEWt5KxpkVUZZSZ04Lu3YeCR_PMnYx1L-TpFASQ&s=10", title: "Dotación de equipos de rescate", date: "20 JUN 2026" },
    { id: 5, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuYZ7ZN8tfVK7U-Artnthxy_PZhqrTQdevetcsFsfomw&s=10", title: "Campaña de prevención de incendios", date: "22 JUN 2026" },
  ];

  const newsScrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!newsScrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - newsScrollRef.current.offsetLeft);
    setScrollLeft(newsScrollRef.current.scrollLeft);
  };
  const handleMouseLeaveOrUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !newsScrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - newsScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    newsScrollRef.current.scrollLeft = scrollLeft - walk;
  };
  const handleWheel = (e: React.WheelEvent) => {
    if (newsScrollRef.current) newsScrollRef.current.scrollLeft += e.deltaY;
  };

  return (
    <section className="w-full">
      <div className="flex justify-between items-end mb-4 sm:mb-6 border-b border-slate-200/50 pb-2 sm:pb-3">
        <h3 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 drop-shadow-sm">Noticias e Informes</h3>
        <button className="text-xs sm:text-sm font-bold text-red-700 hover:text-red-800 transition flex items-center gap-1 drop-shadow">
          VER TODAS <span>&rarr;</span>
        </button>
      </div>

      <div 
        ref={newsScrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        onWheel={handleWheel}
        className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 pt-2 snap-x snap-mandatory hide-scrollbar cursor-grab active:cursor-grabbing select-none w-full"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {newsItems.map((item) => (
          <div 
            key={item.id} 
            className="min-w-[260px] sm:min-w-[290px] md:min-w-[350px] snap-center bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:bg-white transition-all duration-300 flex flex-col group"
          >
            <div className="h-40 sm:h-48 bg-slate-200/50 relative overflow-hidden pointer-events-none">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-90" draggable="false" />
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3 bg-red-700/90 backdrop-blur-sm text-white text-[9px] sm:text-[10px] font-extrabold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full uppercase tracking-widest shadow-md">
                {item.date}
              </div>
            </div>
            <div className="p-4 sm:p-6 flex flex-col flex-1 pointer-events-none">
              <h4 className="font-extrabold text-slate-900 text-base sm:text-lg mb-2 sm:mb-3 leading-tight group-hover:text-red-700 transition drop-shadow-sm">
                {item.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-5 flex-1 font-medium leading-relaxed">
                Apertura del nuevo ciclo de registro para empresas y comercios de la región, fortaleciendo las medidas preventivas y de resiliencia ciudadana.
              </p>
              <span className="text-[10px] sm:text-xs font-bold text-red-700 group-hover:text-red-800 transition uppercase tracking-wider">
                LEER MÁS &rarr;
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewsSection;