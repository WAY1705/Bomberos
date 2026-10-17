import React from 'react';
import Header from '../components/portal/Header';
import Footer from '../components/portal/Footer';

const Institucion: React.FC = () => {
  return (
    <>
      <style>
        {`
          @keyframes driftNetwork {
            0% { background-position: 0px 0px; }
            100% { background-position: 600px 600px; }
          }
          
          /* FONDO CREMA CON RED DE DATOS ALEATORIA Y MINIMALISTA */
          .bg-network-cream {
            background-color: #FDFBF7; 
            background-image: url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23475569' stroke-width='0.3' stroke-opacity='0.2' fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M60,120 L240,50 L420,160 L540,80 L510,320 L580,510 L460,570 L310,540 L210,390 L110,520 L30,360 L140,240 Z M60,120 L140,240 M240,50 L350,220 L420,160 M350,220 L510,320 M350,220 L210,390 M210,390 L310,540 M210,390 L140,240 M140,240 L30,360 M460,570 L510,320 M460,570 L350,220 M140,240 L240,50 M310,540 L420,160' fill='none'/%3E%3Ccircle cx='60' cy='120' r='1'/%3E%3Ccircle cx='240' cy='50' r='1.5'/%3E%3Ccircle cx='420' cy='160' r='1'/%3E%3Ccircle cx='540' cy='80' r='1'/%3E%3Ccircle cx='510' cy='320' r='1.5'/%3E%3Ccircle cx='580' cy='510' r='1'/%3E%3Ccircle cx='460' cy='570' r='1.5'/%3E%3Ccircle cx='310' cy='540' r='1'/%3E%3Ccircle cx='210' cy='390' r='1.5'/%3E%3Ccircle cx='110' cy='520' r='1'/%3E%3Ccircle cx='30' cy='360' r='1.5'/%3E%3Ccircle cx='140' cy='240' r='1.5'/%3E%3Ccircle cx='350' cy='220' r='1'/%3E%3C/g%3E%3C/svg%3E");
            background-size: 600px 600px;
            animation: driftNetwork 100s linear infinite;
          }
        `}
      </style>

      {/* Contenedor Principal (Fondo Crema) */}
      <div className="min-h-screen font-sans text-slate-900 flex flex-col overflow-x-hidden bg-network-cream">
        
        {/* Header Conectado */}
        <div className="relative z-50">
          <Header />
        </div>

        {/* Contenido de la Página */}
        <main className="flex-grow w-full relative z-10 pt-32 md:pt-40 pb-16">
          
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full space-y-16">
            
            {/* Título de la Página */}
            <div className="text-center max-w-4xl mx-auto space-y-4">
              <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed">
                Con base en el Estado Monagas, somos una institución dedicada a la protección, prevención y salvaguarda de la vida, garantizando la seguridad integral de nuestra comunidad frente a emergencias y desastres.
              </p>
              <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mt-6 shadow-sm"></div>
            </div>

            {/* Misión y Visión (Grid de 2 Columnas - Cristal Claro) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              
              {/* Tarjeta Misión */}
              <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 shadow-lg rounded-[32px] p-8 md:p-12 hover:bg-white transition duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:scale-110 transition duration-700">
                  <svg className="w-32 h-32 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
                <div className="relative z-10">
                  
                  <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-wide text-center">Nuestra Misión</h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify font-medium">
                    Salvaguardar la vida y los bienes de los ciudadanos, a través de acciones oportunas y eficientes en prevención, combate de incendios, rescate y atención prehospitalaria, basando nuestro accionar en la disciplina, el valor y la abnegación para garantizar la tranquilidad en el territorio nacional y regional.
                  </p>
                </div>
              </div>

              {/* Tarjeta Visión */}
              <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 shadow-lg rounded-[32px] p-8 md:p-12 hover:bg-white transition duration-500 group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-[0.04] group-hover:scale-110 transition duration-700">
                  <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                </div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-wide text-center">Nuestra Visión</h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed text-justify font-medium">
                    Ser la institución líder en gestión integral de riesgos y atención de emergencias, reconocida por su excelencia operativa, vanguardia tecnológica e innovación y un profundo compromiso social, adaptándose continuamente a los desafíos estructurales y climáticos modernos.
                  </p>
                </div>
              </div>

            </div>

            {/* Separador Full-Width Técnico */}
            <div className="w-full flex items-center justify-center py-8 relative">
                <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent w-full"></div>
                <div className="absolute w-3 h-3 bg-slate-800 rotate-45 shadow-sm"></div>
            </div>

            {/* Valores Institucionales (4 Columnas) */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">Valores Institucionales</h2>
                <p className="text-slate-600 mt-2 font-medium">Los pilares que sostienen nuestro accionar diario.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Valor 1 */}
                <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 border-t-red-600">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Disciplina</h3>
                  <p className="text-sm text-slate-600 font-medium">Cumplimiento estricto de los protocolos y el orden jerárquico para garantizar el éxito de las operaciones.</p>
                </div>
                {/* Valor 2 */}
                <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 border-t-blue-600">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Abnegación</h3>
                  <p className="text-sm text-slate-600 font-medium">Entrega total y sacrificio desinteresado en favor de la seguridad y el bienestar de los ciudadanos.</p>
                </div>
                {/* Valor 3 */}
                <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 border-t-amber-500">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Valor</h3>
                  <p className="text-sm text-slate-600 font-medium">Coraje para enfrentar situaciones de alto riesgo y tomar decisiones rápidas bajo presión extrema.</p>
                </div>
                {/* Valor 4 */}
                <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 border-t-emerald-500">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Vocación</h3>
                  <p className="text-sm text-slate-600 font-medium">Deseo inquebrantable de servir a la comunidad y proteger el medio ambiente en todo momento.</p>
                </div>
              </div>
            </div>

          </div>
        </main>

        {/* Footer */}
        <div className="relative z-20">
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Institucion;