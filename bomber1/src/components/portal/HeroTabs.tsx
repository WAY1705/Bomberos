



const HeroTabs: React.FC = () => {
  

  return (
    <div className="flex flex-col w-full relative">
      
      {/* SECCIÓN SUPERIOR: IMAGEN EXTENDIDA HACIA ABAJO (80vh) */}
      <div className="relative h-[700px] md:h-[800px] lg:h-[90vh] w-full flex flex-col items-center justify-center text-center px-4 overflow-hidden rounded-b-[40px] shadow-2xl">
        
        {/* Collage de Imágenes de Fondo */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-3 bg-slate-950">
          <div className="bg-[url('https://images.unsplash.com/photo-1599708153386-62bf3f035f78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1582210747440-5e5d315abf84?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-50 mix-blend-luminosity hidden md:block"></div>
          <div className="bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-50 mix-blend-luminosity"></div>
        </div>
        
        {/* Capa de oscurecimiento (Gradiente) para destacar el texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90"></div>
        
        {/* Textos Centrales (Estilo de la imagen de referencia) */}
        <div className="relative z-10 -mt-20 md:-mt-32 max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="text-white font-extrabold text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight drop-shadow-2xl mb-6">
              Protección y Respuesta Integral para Espacios Modernos
            </h1>
            <p className="text-slate-200 text-lg md:text-xl max-w-3xl font-medium drop-shadow-md mb-10">
              Servicios de protección de incendios, rescate e inspección para la seguridad ciudadana, eléctrica y contra desastres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                <button className="bg-red-700 hover:bg-red-800 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-red-900/50 transition border border-red-500 tracking-wide">
                  Solicitar Diagnóstico Rápido
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3.5 rounded-full font-bold shadow-lg transition tracking-wide">
                  Descargar Guía de Prevención
                </button>
            </div>
        </div>
      </div>

      

      

    </div>
  );
};

export default HeroTabs;