import React from 'react';

const ServicesGrid: React.FC = () => {
  return (
    <section className="space-y-8 sm:space-y-12 md:space-y-16 pb-8 md:pb-12 w-full">
      
      {/* Título de la Sección */}
      <div className="flex justify-between items-end border-b border-slate-300/50 pb-3 md:pb-4">
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 tracking-wide">
          Servicios y Herramientas Comunitarias
        </h3>
      </div>

      {/* Fila 1: Botones de Acción Inmediata (Estilo formal y limpio) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12">
        <button className="bg-[#0B1B3D]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/80 flex flex-row items-center justify-between hover:bg-white hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 border border-red-200 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition flex-shrink-0">
               <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            </div>
            <span className="font-extrabold text-slate-900 text-lg sm:text-xl md:text-2xl group-hover:text-red-700 transition text-left leading-tight">Reportar<br/>Incidencia</span>
          </div>
          <span className="text-slate-300 group-hover:translate-x-3 group-hover:text-red-700 transition text-2xl md:text-4xl font-black">❯</span>
        </button>
        
        <button className="bg-[#0B1B3D]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg border border-white/80 flex flex-row items-center justify-between hover:bg-white hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 border border-blue-200 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition flex-shrink-0">
               <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <span className="font-extrabold text-slate-900 text-lg sm:text-xl md:text-2xl group-hover:text-blue-700 transition text-left leading-tight">Ver requisitos<br/>de trámite</span>
          </div>
          <span className="text-slate-300 group-hover:translate-x-3 group-hover:text-blue-700 transition text-2xl md:text-4xl font-black">❯</span>
        </button>
      </div>

      {/* Fila 2: Grid 3 Columnas Modernas (Sin video, sin certificados) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        
        {/* Servicio 1: Prevención */}
        <div className="bg-[#0B1B3D]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/80 hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 className="font-extrabold text-slate-900 mb-2">Prevención</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Guías certificadas para el uso de equipos contra incendios y mitigación de riesgos.</p>
        </div>

        {/* Servicio 2: Inspección */}
        <div className="bg-[#0B1B3D]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/80 hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>
            </div>
            <h3 className="font-extrabold text-slate-900 mb-2">Inspecciones</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Solicitud de inspecciones técnicas para comercios, industrias y residencias.</p>
        </div>

        {/* Servicio 3: Asesoría */}
        <div className="bg-[#0B1B3D]/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/80 hover:shadow-xl transition flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.192 9.192L5.656 5.656m0 12.728l3.536-3.536m10.606-2.122a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
            </div>
            <h3 className="font-extrabold text-slate-900 mb-2">Asesoría Técnica</h3>
            <p className="text-sm text-slate-600 leading-relaxed">Atención personalizada para el diseño de planes de emergencia y seguridad.</p>
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;