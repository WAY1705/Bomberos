import React from 'react';
import Header from '../components/portal/Header';
import HeroTabs from '../components/portal/HeroTabs'; 
import NewsSection from '../components/portal/NewsSection';
import ServicesGrid from '../components/portal/ServicesGrid'; 
import TeamSection from '../components/portal/TeamSection';
import Footer from '../components/portal/Footer';

const Portal: React.FC = () => {
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
            background-color: #FDFBF7; /* Color crema ultra claro y formal */
            
            /* Red asimétrica: puntos minúsculos y líneas finas aleatorias */
            background-image: url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='%23475569' stroke-width='0.3' stroke-opacity='0.2' fill='%23475569' fill-opacity='0.4'%3E%3Cpath d='M60,120 L240,50 L420,160 L540,80 L510,320 L580,510 L460,570 L310,540 L210,390 L110,520 L30,360 L140,240 Z M60,120 L140,240 M240,50 L350,220 L420,160 M350,220 L510,320 M350,220 L210,390 M210,390 L310,540 M210,390 L140,240 M140,240 L30,360 M460,570 L510,320 M460,570 L350,220 M140,240 L240,50 M310,540 L420,160' fill='none'/%3E%3Ccircle cx='60' cy='120' r='1'/%3E%3Ccircle cx='240' cy='50' r='1.5'/%3E%3Ccircle cx='420' cy='160' r='1'/%3E%3Ccircle cx='540' cy='80' r='1'/%3E%3Ccircle cx='510' cy='320' r='1.5'/%3E%3Ccircle cx='580' cy='510' r='1'/%3E%3Ccircle cx='460' cy='570' r='1.5'/%3E%3Ccircle cx='310' cy='540' r='1'/%3E%3Ccircle cx='210' cy='390' r='1.5'/%3E%3Ccircle cx='110' cy='520' r='1'/%3E%3Ccircle cx='30' cy='360' r='1.5'/%3E%3Ccircle cx='140' cy='240' r='1.5'/%3E%3Ccircle cx='350' cy='220' r='1'/%3E%3C/g%3E%3C/svg%3E");
            background-size: 600px 600px;
            animation: driftNetwork 100s linear infinite;
          }
        `}
      </style>

      {/* Contenedor Principal */}
      <div className="min-h-screen font-sans text-slate-800 flex flex-col overflow-x-hidden bg-network-cream">
        
        <div className="relative z-50">
          <Header />
        </div>

        <main className="flex-grow w-full relative z-10">
          
          <HeroTabs />
          
          <div className="max-w-7xl 2xl:max-w-[1550px] mx-auto px-4 sm:px-6 md:px-8 mt-16 sm:mt-20 md:mt-24 w-full relative z-10">
             <NewsSection />
          </div>

          {/* Separador Full-Width 1 (Color Footer) */}
          <div className="w-full h-80 bg-[#0B1B3D] my-12 flex items-center justify-center relative z-20 shadow-md">
            
          </div>

          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full relative z-10">
             <ServicesGrid />
          </div>

          
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full pb-16 relative z-10">
             <TeamSection />
          </div>

        </main>

        <div className="relative z-20">
          <Footer />
        </div>

      </div>
    </>
  );
};

export default Portal;