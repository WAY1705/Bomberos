import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1B3D] text-white pt-8 sm:pt-12 border-t-4 border-red-600 relative z-10 mt-8 sm:mt-12 w-full">
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8 sm:mb-12">
        
        {/* Enlaces de Interés */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="font-bold text-base sm:text-lg border-b border-white/20 pb-2">Enlaces de Interés</h4>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-slate-300">
              <li className="hover:text-white hover:translate-x-1 transition transform cursor-pointer">› Ministerio del Interior y Justicia</li>
              <li className="hover:text-white hover:translate-x-1 transition transform cursor-pointer">› Protección Civil Nacional</li>
              <li className="hover:text-white hover:translate-x-1 transition transform cursor-pointer">› Gobernación del Estado</li>
              <li className="hover:text-white hover:translate-x-1 transition transform cursor-pointer">› Red Nacional de Emergencias</li>
          </ul>
        </div>

        {/* Contacto Oficial */}
        <div className="space-y-3 sm:space-y-4">
          <h4 className="font-bold text-base sm:text-lg border-b border-white/20 pb-2">Contacto Oficial</h4>
          <div className="text-xs sm:text-sm text-slate-300 space-y-1.5 sm:space-y-2">
              <p><strong>Dirección:</strong> Av. Bicentenario, Maturín, Edo. Monagas.</p>
              <p><strong>Teléfonos:</strong> +58 291-555-1234 / 132 (Emergencias)</p>
              <p><strong>Email:</strong> contacto@fbbv.gob.ve</p>
          </div>
          <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 items-center">
              <div className="bg-white p-1 rounded shadow-md">
                <svg viewBox="0 0 80 44" className="h-6 sm:h-8 md:h-10 w-auto" role="img" aria-label="Sello de certificación SGS ISO">
                  <defs>
                    <linearGradient id="certGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0B1B3D" />
                      <stop offset="100%" stopColor="#123266" />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width="80" height="44" rx="7" fill="url(#certGrad)" />
                  <circle cx="21" cy="22" r="12" fill="#DC2626" />
                  <path d="M15 22.5l4 4 8-9" stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="53" y="20" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="13" fontWeight="bold" fill="#fff">SGS</text>
                  <text x="53" y="32" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="7" letterSpacing="0.5" fill="#CBD5E1">CERTIFIED</text>
                </svg>
              </div>
              <div className="flex flex-col justify-center text-[9px] sm:text-[10px] md:text-xs text-orange-400 font-bold leading-tight">
                  <span>ISO 9001:2015</span>
                  <span>ISO 14001:2015</span>
              </div>
          </div>
        </div>
        
      </div>

      <div className="bg-[#051024] py-3 sm:py-4 text-center w-full">
          <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 px-4 leading-relaxed">
              © 2026 Federación de Bomberos y Bomberas de Venezuela. Todos los derechos reservados.<br className="hidden sm:block" />
              Diseño y Arquitectura de Sistemas - Dirección de Ciencia, Tecnología e Innovación.
          </p>
      </div>
    </footer>
  );
};

export default Footer;