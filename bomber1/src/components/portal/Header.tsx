import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Logo principal de Bomberos
import BomberosLogo from '../../assets/Bomberos.png';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServiciosOpen, setIsServiciosOpen] = useState(false);

  // Obtenemos la ruta actual
  const location = useLocation();

  // Funciones para saber qué enlace pintar de rojo
  const isActive = (path: string) => location.pathname === path;
  const isServiciosActive = location.pathname === '/requisito' || location.pathname === '/certificado';

  // En Inicio el header flota sobre el hero oscuro; en las demás secciones
  // el fondo es claro, así que adaptamos el color de las letras al fondo.
  const isHome = location.pathname === '/';

  const pillClass = isHome
    ? 'bg-[#0B1B3D]/50 backdrop-blur-md text-white border-white/20'
    : 'bg-white/85 backdrop-blur-md text-slate-800 border-slate-200';

  const brandTextClass = isHome ? 'text-red-400' : 'text-red-600';
  const idleLink = isHome ? 'text-white hover:text-red-400' : 'text-slate-700 hover:text-red-600';
  const activeLink = isHome ? 'text-red-500 font-extrabold' : 'text-red-600 font-extrabold';

  const mobilePanelClass = isHome
    ? 'bg-[#0B1B3D]/90 backdrop-blur-2xl text-white border-white/10'
    : 'bg-white/90 backdrop-blur-2xl text-slate-900 border-[#0B1B3D]/10';
  const mobileIdle = isHome ? 'text-white/90 hover:bg-white/10' : 'text-slate-700 hover:bg-[#0B1B3D]/5';
  const mobileActive = isHome ? 'text-red-400 font-extrabold bg-white/5' : 'text-red-700 font-extrabold bg-[#0B1B3D]/5';
  const mobileSubIdle = isHome ? 'text-white/70 hover:bg-white/10' : 'text-slate-600 hover:bg-[#0B1B3D]/5';
  const mobileSubActive = isHome ? 'text-red-400 font-bold bg-white/10' : 'text-red-700 font-bold bg-[#0B1B3D]/5';

  return (
    <header className="absolute top-0 inset-x-0 z-50 pt-6 px-4 md:px-8">
      
      {/* Barra de Navegación Flotante (Pastilla de Cristal) */}
      <div className={`max-w-6xl mx-auto px-6 py-3 flex items-center justify-between shadow-2xl border rounded-full relative ${pillClass}`}>
        
        {/* LADO IZQUIERDO: Logo (Usamos flex-1 para equilibrar el centro) */}
        <div className="flex-1 flex items-center justify-start gap-3">
          <img src={BomberosLogo} alt="FBBV" className="h-8 md:h-10 w-auto drop-shadow-md" />
          <div className={`font-extrabold tracking-widest text-sm lg:hidden drop-shadow-md ${brandTextClass}`}>FBBV</div>
        </div>

        {/* CENTRO: Menú Escritorio (Perfectamente centrado) */}
        <nav className="hidden lg:flex gap-8 items-center justify-center font-semibold text-[14px] drop-shadow-md">
          <Link 
            to="/" 
            className={`transition tracking-wide ${isActive('/') ? activeLink : idleLink}`}
          >
            Inicio
          </Link>
          <Link 
            to="/institucion" 
            className={`transition tracking-wide ${isActive('/institucion') ? activeLink : idleLink}`}
          >
            Institución
          </Link>
          
          {/* Dropdown Servicios */}
          <div className="relative group cursor-pointer py-2" onMouseEnter={() => setIsServiciosOpen(true)} onMouseLeave={() => setIsServiciosOpen(false)}>
            <span className={`transition flex items-center gap-1 tracking-wide ${isServiciosActive ? activeLink : idleLink}`}>
              Servicios <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
            {isServiciosOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-56 z-50">
                <div className="bg-slate-900/80 backdrop-blur-2xl text-white shadow-2xl rounded-2xl overflow-hidden border border-white/10">
                  <Link 
                    to="/requisito" 
                    className={`block px-5 py-3 transition border-b border-white/10 ${isActive('/requisito') ? 'text-red-400 font-bold bg-white/10' : 'hover:bg-white/20 hover:text-red-400'}`}
                  >
                    Requisitos
                  </Link>
                  <Link 
                    to="/certificado" 
                    className={`block px-5 py-3 transition ${isActive('/certificado') ? 'text-red-400 font-bold bg-white/10' : 'hover:bg-white/20 hover:text-red-400'}`}
                  >
                    Consulta Pública
                  </Link>
                </div>
              </div>
            )}
          </div>
          
          <Link 
            to="/prevencion" 
            className={`transition tracking-wide ${isActive('/prevencion') ? activeLink : idleLink}`}
          >
            Personal
          </Link>
          
        </nav>

        {/* LADO DERECHO: Botón de Login y Menú Móvil (Equilibra el flex-1) */}
        <div className="flex-1 flex items-center justify-end gap-4">
          <Link to="/login" className="hidden lg:flex items-center gap-2 bg-red-600/60 backdrop-blur-md hover:bg-red-600/80 text-white px-6 py-2 rounded-full transition shadow-lg border border-red-400/50 font-bold text-sm whitespace-nowrap tracking-wider">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
            SISTEMA
          </Link>

          {/* Botón Menú Móvil */}
          <button className={`lg:hidden transition ${isHome ? 'text-white hover:text-red-400' : 'text-slate-800 hover:text-red-600'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path></svg>
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden mt-4 max-w-6xl mx-auto flex flex-col font-bold shadow-2xl border rounded-2xl overflow-hidden z-50 relative ${mobilePanelClass}`}>
           
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className={`px-6 py-4 border-b border-[#0B1B3D]/10 transition text-center ${isActive('/') ? mobileActive : mobileIdle}`}>Inicio</Link>
           
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/institucion" className={`px-6 py-4 border-b border-[#0B1B3D]/10 transition text-center ${isActive('/institucion') ? mobileActive : mobileIdle}`}>Institución</Link>
           
           <div className={`px-6 py-4 border-b border-[#0B1B3D]/10 text-center ${isServiciosActive ? mobileActive : (isHome ? 'text-white/80' : 'text-slate-700')}`}>Servicios</div>
           
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/requisito" className={`px-10 py-3 border-b border-[#0B1B3D]/10 text-sm transition text-center ${isActive('/requisito') ? mobileSubActive : mobileSubIdle}`}>Requisitos</Link>
           
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/certificado" className={`px-10 py-3 border-b border-[#0B1B3D]/10 text-sm transition text-center ${isActive('/certificado') ? mobileSubActive : mobileSubIdle}`}>Consulta Pública</Link>
           
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/prevencion" className={`px-6 py-4 border-b border-[#0B1B3D]/10 transition text-center ${isActive('/prevencion') ? mobileActive : mobileIdle}`}>Prevención</Link>
         
           <Link onClick={() => setIsMobileMenuOpen(false)} to="/login" className="px-6 py-5 bg-red-700 text-white flex items-center justify-center gap-2 hover:bg-red-800 transition tracking-wider"> 
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
             SISTEMA
           </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
