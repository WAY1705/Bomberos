import React, { useState } from 'react';
import logo from '../assets/logo-bomber.png'; 

import { useNavigate } from 'react-router-dom';

import { iniciarSesion, mensajeError } from '../services/api';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  // Contenedor Principal: Fondo fijo, sin repetición y ocupando el 100%
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
    <div 
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-network-cream">
      
      {/* Tarjeta de Cristal Esmerilado (Glassmorphism) */}
      {/* bg-white/20 da un 20% de blanco, backdrop-blur-lg hace el desenfoque del vidrio */}
      <div className="relative z-10 w-full max-w-md bg-[#0B1B3D]/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 md:p-10 flex flex-col items-center ">
        
        {/* Escudo */}
        <img src={logo} alt="Escudo Federación de Bomberos" className="h-24 w-auto mb-6 drop-shadow-md" />

        {/* Títulos */}
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 text-center leading-tight mb-5">
          CUERPO DE BOMBEROS Y BOMBERAS DEL ESTADO MONAGAS
        </h1>
        

        {/* Formulario */}
        <form
          className="w-full space-y-5"
          onSubmit={async (e) => {
            e.preventDefault();
            if (cargando) return;
            setError('');
            setCargando(true);
            try {
              await iniciarSesion(usuario.trim(), password);
              navigate('/dashboard');
            } catch (err) {
              setError(mensajeError(err, 'No se pudo iniciar sesión. Verifique sus credenciales.'));
            } finally {
              setCargando(false);
            }
          }}
        >
          
          {/* Campo Usuario */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>
            <input 
              type="text" 
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Usuario" 
              autoComplete="username"
              autoFocus
              required
              minLength={3}
              maxLength={40}
              aria-label="Usuario"
              className="w-full bg-white/70 border border-white/50 rounded-lg py-3 pl-12 pr-4 text-slate-900 placeholder:text-slate-600 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition"
            />
          </div>

          {/* Campo Contraseña */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </span>
            <input 
              type={showPassword ? "text" : "password"} 
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña" 
              autoComplete="current-password"
              required
              minLength={6}
              aria-label="Contraseña"
              className="w-full bg-white/70 border border-white/50 rounded-lg py-3 pl-12 pr-12 text-slate-900 placeholder:text-slate-600 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-700 hover:text-slate-900"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          </div>

          {/* Opciones Adicionales */}
          <div className="flex items-center justify-between gap-4 text-sm font-semibold">
            <label className="flex items-center gap-2 text-slate-900 cursor-pointer hover:text-black transition">
              <input type="checkbox" className="accent-yellow-600 h-4 w-4 rounded border-slate-400 cursor-pointer" />
              Recordarme
            </label>
            <div className="flex items-center gap-2 text-slate-900">
                <span className="w-3 h-3 rounded-full bg-yellow-500 block shadow-sm shadow-yellow-600/50"></span>
                Satin Gold
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <p role="alert" className="text-sm font-semibold text-red-800 bg-red-500/15 border border-red-400/40 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          {/* Botón Iniciar Sesión */}
          <button 
            type="submit" 
            disabled={cargando}
            className="w-full bg-[#8B1A1A] hover:bg-[#6A1414] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg shadow-red-900/30 active:scale-[0.98] mt-2"
          >
            {cargando ? 'VERIFICANDO…' : 'INICIAR SESIÓN'}
          </button>
        </form>

        {/* Enlaces Inferiores */}
        <div className="mt-6 space-y-3 text-center w-full border-t border-slate-400/30 pt-5">
          <a href="#" className="block text-sm text-slate-800 hover:text-black hover:underline transition font-semibold">
            Olvidé mi contraseña
          </a>
        </div>

      </div>
    </div>
    </>
  );
};

export default Login;