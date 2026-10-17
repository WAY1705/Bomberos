import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo-bomber.png';
import type { Alerta, DashboardContextType } from './dashboardContext';

const TRAMITES_TITULOS: { match: string; title: string }[] = [
  { match: '/tramites/listado', title: 'Listado de Solicitudes' },
  { match: '/tramites/nuevas', title: 'Registro de Nueva Solicitud (RF-02)' },
  { match: '/tramites/calendario', title: 'Calendario de Inspecciones' },
  { match: '/tramites/agenda', title: 'Agenda Técnica' },
  { match: '/tramites/historial', title: 'Historial de Certificaciones' },
  { match: '/tramites/generacion', title: 'Generación de Certificados' },
];

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({
    tramites: true,
    admin: false,
    contenido: false,
  });
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [ahora, setAhora] = useState(new Date());
  const navigate = useNavigate();
  const location = useLocation();

  const [alertas, setAlertas] = useState<Alerta[]>([
    { id: 1, icono: '⚠️', color: 'text-red-600', texto: '3 solicitudes por vencer hoy - 17:35' },
    { id: 2, icono: '🛡️', color: 'text-yellow-600', texto: 'Nuevas inspecciones asignadas' },
    { id: 3, icono: '📄', color: 'text-blue-700', texto: 'Certificación #1040 pendiente de revisión' },
  ]);
  const [showAlerts, setShowAlerts] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const horaActual = ahora.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const handleLogout = () => navigate('/');

  const toggleMenu = (menu: string) => {
    setOpenMenus((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

  const irA = (key: string) => {
    setActiveNav(key);
    setIsMobileMenuOpen(false);
  };

  const descartarAlerta = (id: number) => setAlertas((prev) => prev.filter((a) => a.id !== id));

  const navBtnClass = (active: boolean) =>
    `w-full flex items-center gap-3 px-6 py-2.5 transition ${
      active
        ? 'text-[#0B1B3D] bg-white/50 backdrop-blur-md border-l-4 border-[#0B1B3D] font-extrabold shadow-sm'
        : 'text-slate-800 hover:text-slate-900 hover:bg-white/40'
    }`;

  const subNavClass = (active: boolean) =>
    `flex items-center gap-2 py-1.5 rounded transition ml-6 ${
      active ? 'text-[#0B1B3D] bg-white/50 backdrop-blur-md border-l-4 border-[#0B1B3D] font-extrabold shadow-sm' : 'hover:text-slate-900 hover:bg-white/40'
    }`;

  const esHome = location.pathname === '/dashboard' || location.pathname === '/dashboard/';

  const encabezado = useMemo(() => {
    if (esHome) {
      return {
        title: 'Bienvenido, Cap. Javier Vargas (FBBV Monagas)',
        sub: (
          <>
            Última conexión: 23:00, El Furrial · <span className="text-slate-900">{horaActual}</span>
          </>
        ),
      };
    }
    const found = TRAMITES_TITULOS.find((t) => location.pathname.endsWith(t.match));
    return {
      title: found?.title ?? 'Gestión de Trámites',
      sub: 'Analista Electromecánico I: Honimer Cabeza',
    };
  }, [location.pathname, esHome, horaActual]);

  const context: DashboardContextType = { alertas, setAlertas, showAlerts, setShowAlerts };

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

          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>

      <div className="min-h-screen w-full bg-network-cream text-white font-sans flex relative overflow-hidden">

        {/* Fondo oscuro al abrir el menú móvil */}
        {isMobileMenuOpen && (
          <div onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
        )}

        {/* --- SIDEBAR --- */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0B1B3D]/20 backdrop-blur-xl border-r border-white/30 shadow-2xl h-screen flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 flex justify-center relative border-b border-slate-400/30">
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-4 right-4 lg:hidden text-slate-800 hover:text-slate-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <img src={logo} alt="FBBV Logo" className="h-16 drop-shadow-md" />
          </div>

          <nav className="flex-1 overflow-y-auto py-2 text-sm font-semibold hide-scrollbar text-slate-800">
            <ul className="space-y-0.5">
              <li>
                <Link to="/" onClick={() => irA('inicio')} className={navBtnClass(activeNav === 'inicio')}>
                  <svg className={`w-5 h-5 ${activeNav === 'inicio' ? 'text-[#0B1B3D]' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Inicio
                </Link>
              </li>
              <li>
                <NavLink to="/dashboard" end onClick={() => irA('dashboard')} className={({ isActive }) => navBtnClass(isActive)}>
                  {({ isActive }) => (
                    <>
                      <svg className={`w-5 h-5 ${isActive ? 'text-[#0B1B3D]' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg> Dashboard
                    </>
                  )}
                </NavLink>
              </li>

              {/* Menú Desplegable: Gestión de Trámites */}
              <li className="pt-2">
                <button onClick={() => toggleMenu('tramites')} className="w-full flex items-center justify-between px-6 py-2.5 text-slate-800 hover:text-slate-900 transition hover:bg-white/40">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg> Gestión de Trámites
                  </div>
                  <svg className={`w-4 h-4 text-slate-700 transition-transform ${openMenus.tramites ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>

                {openMenus.tramites && (
                  <ul className="pl-6 pr-4 py-1 space-y-1 text-[13px] font-medium text-slate-800">
                    <li className="flex items-center gap-2 py-1 text-slate-900 font-bold mt-1">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg> Solicitudes
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/listado" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Listado
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/nuevas" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Nuevas
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/calendario" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Calendario
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/agenda" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg> Agenda Técnica
                      </NavLink>
                    </li>

                    <li className="flex items-center gap-2 py-1 text-slate-900 font-bold mt-2">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg> Certificaciones
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/historial" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Historial
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/tramites/generacion" onClick={() => irA('tramites')} className={({ isActive }) => subNavClass(isActive)}>
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg> Generación
                      </NavLink>
                    </li>
                  </ul>
                )}
              </li>

              {/* Menú Desplegable: Administración */}
              <li className="pt-2">
                <button onClick={() => toggleMenu('admin')} className="w-full flex items-center justify-between px-6 py-2.5 text-slate-800 hover:text-slate-900 transition hover:bg-white/40">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Administración
                  </div>
                  <svg className={`w-4 h-4 text-slate-700 transition-transform ${openMenus.admin ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMenus.admin && (
                  <ul className="pl-6 pr-4 py-1 space-y-1 text-[13px] font-medium text-slate-800">
                    <li>
                      <button type="button" onClick={() => irA('admin')} className="w-full flex items-center gap-2 py-1.5 hover:text-slate-900 hover:bg-white/40 rounded transition ml-6">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg> Usuarios y Roles
                      </button>
                    </li>
                    <li className="flex items-center gap-2 py-1 text-slate-900 font-bold mt-2">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Configuración
                    </li>
                    <li><button type="button" onClick={() => irA('admin')} className="w-full flex items-center gap-2 py-1.5 hover:text-slate-900 hover:bg-white/40 rounded transition ml-6"><svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg> Tasas</button></li>
                    <li><button type="button" onClick={() => irA('admin')} className="w-full flex items-center gap-2 py-1.5 hover:text-slate-900 hover:bg-white/40 rounded transition ml-6"><svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg> Parámetros</button></li>
                  </ul>
                )}
              </li>

              {/* Menú: Reportes */}
              <li className="pt-2">
                <button type="button" onClick={() => irA('reportes')} className={navBtnClass(activeNav === 'reportes')}>
                  <svg className={`w-5 h-5 ${activeNav === 'reportes' ? 'text-[#0B1B3D]' : 'text-slate-700'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> Reportes
                </button>
              </li>

              {/* Menú Desplegable: Gestión de Contenido */}
              <li className="pt-2 pb-4">
                <button onClick={() => toggleMenu('contenido')} className="w-full flex items-center justify-between px-6 py-2.5 text-slate-800 hover:text-slate-900 transition hover:bg-white/40">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg> Gestión de Contenido
                  </div>
                  <svg className={`w-4 h-4 text-slate-700 transition-transform ${openMenus.contenido ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                {openMenus.contenido && (
                  <ul className="pl-6 pr-4 py-1 space-y-1 text-[13px] font-medium text-slate-800">
                    <li><button type="button" onClick={() => irA('contenido')} className="w-full flex items-center gap-2 py-1.5 hover:text-slate-900 hover:bg-white/40 rounded transition text-slate-900 font-bold mt-1"><svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg> Noticias / Actividades</button></li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* Botón Cerrar Sesión */}
          <div className="p-4 border-t border-slate-400/30">
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/40 hover:bg-red-600 hover:text-white text-red-700 font-extrabold rounded-xl transition-all border border-red-300 hover:border-red-600 text-sm shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg> Cerrar Sesión
            </button>
          </div>
        </aside>

        {/* --- CONTENIDO PRINCIPAL --- */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto relative z-10 w-full">

          {/* CABECERA FLOTANTE */}
          <header className="relative z-30 px-6 flex justify-between items-start bg-[#0B1B3D]/20 backdrop-blur-xl py-4 border-b border-white/20">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-slate-900 shadow-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              <div>
                <h1 className="text-xl md:text-[22px] font-extrabold text-slate-900 drop-shadow-sm tracking-wide">{encabezado.title}</h1>
                <p className="text-xs text-slate-800 mt-0.5 font-bold">{encabezado.sub}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Campana de notificaciones */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setIsNotifOpen((v) => !v); setIsUserMenuOpen(false); }}
                  className="relative p-2 bg-white/40 hover:bg-white/60 backdrop-blur-xl rounded-full shadow-lg border border-white/50 text-slate-800 transition"
                  aria-label="Notificaciones"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                  {alertas.length > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 bg-red-600 text-white text-[9px] font-extrabold rounded-full flex items-center justify-center shadow">{alertas.length}</span>
                  )}
                </button>
                {isNotifOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/60 overflow-hidden text-slate-800 z-50">
                    <div className="px-4 py-2.5 border-b border-slate-200 font-extrabold text-xs uppercase tracking-wide">Notificaciones</div>
                    {alertas.length === 0 ? (
                      <div className="px-4 py-6 text-center text-xs font-semibold text-slate-500">Sin notificaciones</div>
                    ) : (
                      <ul className="max-h-64 overflow-y-auto">
                        {alertas.map((a) => (
                          <li key={a.id} className="flex items-start gap-2 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-white/60">
                            <span className={`text-sm ${a.color}`}>{a.icono}</span>
                            <span className="text-xs font-semibold leading-snug flex-1">{a.texto}</span>
                            <button type="button" onClick={() => descartarAlerta(a.id)} className="text-slate-400 hover:text-red-600" aria-label="Descartar">✕</button>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="px-4 py-2 border-t border-slate-200 flex justify-between">
                      <button type="button" onClick={() => setShowAlerts(true)} className="text-[11px] font-bold text-slate-700 hover:text-slate-900">Ver en panel</button>
                      <button type="button" onClick={() => setAlertas([])} className="text-[11px] font-bold text-red-700 hover:text-red-800">Limpiar todo</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Menú de usuario */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => { setIsUserMenuOpen((v) => !v); setIsNotifOpen(false); }}
                  className="flex items-center gap-3 bg-white/40 hover:bg-white/60 backdrop-blur-xl py-1 px-3 md:px-4 rounded-full shadow-lg border border-white/50 h-10 transition"
                >
                  <div className="flex-col items-end hidden md:flex">
                    <span className="text-xs font-extrabold text-slate-900 leading-none">En Servicio</span>
                    <span className="text-[10px] text-slate-800 font-bold">Cap. Vargas</span>
                  </div>
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-white/60 border border-white flex items-center justify-center text-slate-800 shadow-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-2xl rounded-xl shadow-2xl border border-white/60 overflow-hidden text-slate-800 text-sm font-semibold z-50">
                    <button type="button" onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-2.5 hover:bg-white/60 border-b border-slate-100">Mi Perfil</button>
                    <button type="button" onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-4 py-2.5 hover:bg-white/60 border-b border-slate-100">Configuración</button>
                    <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2.5 hover:bg-red-600 hover:text-white text-red-700">Cerrar Sesión</button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* BARRA DE ALERTAS */}
          {showAlerts && alertas.length > 0 && (
            <div className="px-6 mb-4 mt-4">
              <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 px-4 py-2.5 flex justify-between items-center text-xs text-slate-900 shadow-lg rounded-lg font-bold">
                <div className="flex items-center gap-6 overflow-x-auto hide-scrollbar">
                  {alertas.map((a) => (
                    <span key={a.id} className="flex items-center gap-2 shrink-0">
                      <span className={`${a.color} font-extrabold text-sm`}>{a.icono}</span>
                      <b>Alertas:</b> {a.texto}
                      <button type="button" onClick={() => descartarAlerta(a.id)} className="ml-1 text-slate-500 hover:text-red-600" aria-label="Descartar alerta">✕</button>
                    </span>
                  ))}
                </div>
                <button onClick={() => setShowAlerts(false)} className="text-slate-600 hover:text-slate-900 font-extrabold ml-4" aria-label="Cerrar alertas">✕</button>
              </div>
            </div>
          )}

          {/* CONTENIDO DE LA RUTA (ventana que cambia) */}
          <div className="mt-4">
            <Outlet context={context} />
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
