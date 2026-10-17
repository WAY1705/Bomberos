import React, { useState } from 'react';
import Header from '../components/portal/Header';
import Footer from '../components/portal/Footer';

import { mensajeError, obtenerConstancia, type Certificado } from '../services/api';

type Estado = Certificado['estado'];

const CERTIFICADOS: Certificado[] = [
  { folio: 'FBBV-1044-CF', empresa: 'Ferretería Monagas', rif: 'J-40112233-5', tipo: 'Conformidad Técnica', riesgo: 'Medio', superficie: '320 m²', emitido: '22/07/2026', vence: '22/07/2027', estado: 'Vigente', resolucion: 'Res. N.º 1044-2026 — Comando Operativo' },
  { folio: 'FBBV-1036-CF', empresa: 'Hotel Los Guaritos', rif: 'J-31567890-4', tipo: 'Conformidad Técnica', riesgo: 'Alto', superficie: '780 m²', emitido: '15/07/2026', vence: '15/07/2027', estado: 'Vigente', resolucion: 'Res. N.º 1036-2026 — Comando Operativo' },
  { folio: 'FBBV-1035-RN', empresa: 'Clínica Maturín S.A.', rif: 'J-09876543-2', tipo: 'Aprobación de Vigencia', riesgo: 'Alto', superficie: '540 m²', emitido: '21/07/2026', vence: '21/07/2027', estado: 'Vigente', resolucion: 'Res. N.º 1035-2026 — División Técnica' },
  { folio: 'FBBV-1032-RV', empresa: 'Automercados Bicentenario', rif: 'J-11223344-0', tipo: 'Conformidad Técnica', riesgo: 'Medio', superficie: '900 m²', emitido: '03/06/2024', vence: '03/06/2025', estado: 'Revocado', resolucion: 'Res. N.º 1032-R — Incumplimiento de norma de evacuación' },
  { folio: 'FBBV-1024-RN', empresa: 'Inversiones Los Pinos C.A.', rif: 'J-28776655-3', tipo: 'Aprobación de Vigencia', riesgo: 'Bajo', superficie: '150 m²', emitido: '08/07/2024', vence: '08/07/2025', estado: 'Vencida', resolucion: 'Res. N.º 1024-2024 — División Técnica' },
];

const ESTADO_BADGE: Record<Estado, { bg: string; texto: string; icono: string; titulo: string; nota: string }> = {
  Vigente: {
    bg: 'bg-emerald-500',
    texto: 'text-emerald-800',
    icono: '✓',
    titulo: 'Constancia VIGENTE',
    nota: 'Este documento se encuentra activo y con validez legal ante el Cuerpo de Bomberos.',
  },
  Vencida: {
    bg: 'bg-amber-500',
    texto: 'text-amber-800',
    icono: '!',
    titulo: 'Constancia VENCIDA',
    nota: 'La vigencia del documento expiró. Debe renovarse ante la División Técnica.',
  },
  Revocado: {
    bg: 'bg-red-600',
    texto: 'text-red-800',
    icono: '✕',
    titulo: 'Constancia REVOCADA',
    nota: 'Este documento fue anulado por decisión institucional y no tiene validez.',
  },
};

const ConsultaPublica: React.FC = () => {
  const [consulta, setConsulta] = useState('');
  const [buscado, setBuscado] = useState<string | null>(null);
  const [resultado, setResultado] = useState<Certificado | 'no-encontrado' | null>(null);
  const [cargando, setCargando] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);

  const normalizar = (s: string) => s.trim().toUpperCase().replace(/\s+/g, '');

  const buscarLocal = (q: string) =>
    CERTIFICADOS.find((c) => c.folio === q || c.rif.toUpperCase() === q);

  const verificar = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = normalizar(consulta);
    setBuscado(consulta.trim());
    setAviso(null);
    if (!q) {
      setResultado(null);
      return;
    }

    setCargando(true);
    try {
      const cert = await obtenerConstancia(q);
      if (cert) {
        setResultado(cert);
      } else {
        setResultado(buscarLocal(q) ?? 'no-encontrado');
      }
    } catch (err) {
      // Backend no disponible: se usa el listado local como demostración.
      const local = buscarLocal(q);
      if (local) {
        setResultado(local);
        setAviso('Servidor no disponible: se muestran datos de demostración.');
      } else {
        setResultado('no-encontrado');
        setAviso(mensajeError(err));
      }
    } finally {
      setCargando(false);
    }
  };

  const reiniciar = () => {
    setConsulta('');
    setBuscado(null);
    setResultado(null);
    setAviso(null);
  };

  const cert = resultado && resultado !== 'no-encontrado' ? resultado : null;
  const badge = cert ? ESTADO_BADGE[cert.estado] : null;

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

        <main className="flex-grow w-full relative z-10 pt-32 md:pt-40 pb-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 w-full space-y-12">

            {/* Cabecera */}
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 drop-shadow-sm uppercase tracking-wide">Consulta Pública</h1>
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed mt-4">
                Verifica la autenticidad y vigencia de una <strong>constancia bomberil</strong> emitida por la Federación de Bomberos y Bomberas de Venezuela. Servicio gratuito y de acceso público.
              </p>
              <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mt-6 shadow-sm"></div>
            </div>

            {/* Buscador */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 shadow-2xl rounded-3xl p-6 md:p-8">
              <form onSubmit={verificar} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1">
                  <label htmlFor="consulta" className="block text-xs font-extrabold text-slate-700 uppercase tracking-wide mb-1.5">Folio de la constancia o RIF del establecimiento</label>
                  <input
                    id="consulta"
                    type="text"
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    placeholder="Ej: FBBV-1044-CF  o  J-40112233-5"
                    className="w-full bg-white/60 border border-white/60 rounded-xl p-3 text-base text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition shadow-inner"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <button type="submit" disabled={cargando} className="h-[46px] px-8 bg-red-700 hover:bg-red-800 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl font-bold tracking-wide shadow-lg shadow-red-900/40 transition border border-red-500 whitespace-nowrap">
                    {cargando ? 'Verificando…' : 'Verificar'}
                  </button>
                  {(buscado || resultado) && (
                    <button type="button" onClick={reiniciar} className="h-[46px] px-5 bg-white/40 hover:bg-white/60 border border-white/60 rounded-xl font-bold text-slate-800 transition">
                      Limpiar
                    </button>
                  )}
                </div>
              </form>
              <p className="text-[11px] text-slate-600 font-semibold mt-3">
                Encuentra el folio impreso en el margen superior de tu documento (formato <b>FBBV-XXXX-XX</b>).
              </p>
              {aviso && (
                <p className="text-[11px] font-bold text-amber-800 bg-amber-500/15 border border-amber-400/40 rounded-lg px-3 py-2 mt-3">
                  {aviso}
                </p>
              )}
            </div>

            {/* Resultado */}
            {resultado === 'no-encontrado' && (
              <div className="bg-white/40 backdrop-blur-md border-2 border-dashed border-slate-400 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-500/20 border border-slate-400 flex items-center justify-center text-3xl mb-4">🔍</div>
                <h3 className="text-xl font-black text-slate-900 mb-1">No se encontró la constancia</h3>
                <p className="text-sm font-semibold text-slate-600 max-w-md mx-auto">
                  No hay registros para <b>"{buscado}"</b>. Verifica que el folio o el RIF estén escritos correctamente. Si el problema persiste, acérquese a una parroquia del cuerpo bomberil.
                </p>
              </div>
            )}

            {cert && badge && (
              <div className="bg-white/50 backdrop-blur-xl border border-white/80 shadow-2xl rounded-3xl overflow-hidden">
                {/* Encabezado del certificado */}
                <div className={`px-6 md:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${badge.bg}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center text-3xl font-black text-slate-900 shadow-md">{badge.icono}</div>
                    <div>
                      <p className="text-white text-[10px] font-extrabold uppercase tracking-widest opacity-90">Federación de Bomberos de Venezuela</p>
                      <h3 className="text-white text-xl font-black drop-shadow">{badge.titulo}</h3>
                    </div>
                  </div>
                  <div className="text-white/95 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wider opacity-90">Folio</p>
                    <p className="text-lg font-black">{cert.folio}</p>
                  </div>
                </div>

                {/* Datos */}
                <div className="p-6 md:p-8">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      ['Establecimiento', cert.empresa],
                      ['RIF', cert.rif],
                      ['Tipo de constancia', cert.tipo],
                      ['Clasificación de riesgo', cert.riesgo],
                      ['Superficie autorizada', cert.superficie],
                      ['Fecha de emisión', cert.emitido],
                      ['Vigente hasta', cert.vence],
                      ['Resolución', cert.resolucion],
                    ].map(([k, v]) => (
                      <div key={k} className="border-b border-dotted border-slate-300 pb-2">
                        <dt className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">{k}</dt>
                        <dd className="text-sm font-extrabold text-slate-900">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className={`mt-6 flex items-start gap-3 rounded-xl p-4 border ${badge.bg}/20 ${badge.texto}`}>
                    <span className="text-lg leading-none">{badge.icono}</span>
                    <p className="text-sm font-semibold leading-relaxed">{badge.nota}</p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-[10px] text-slate-500 font-semibold">
                    <span>Consulta realizada: {new Date().toLocaleString('es-VE')}</span>
                    <span className="font-extrabold text-slate-700 tracking-wider">FBBV · Maturín, Monagas</span>
                  </div>
                </div>
              </div>
            )}

            {/* Información */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 border-t-4 border-t-red-600">
                <h3 className="text-lg font-black text-slate-900 mb-2">¿Qué es la constancia?</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Es el documento oficial que acredita que un establecimiento cumplió con las normas de prevención y protección contra incendios del cuerpo bomberil, indicando su clasificación de riesgo y vigencia.
                </p>
              </div>
              <div className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 border-t-4 border-t-blue-600">
                <h3 className="text-lg font-black text-slate-900 mb-2">¿Cómo obtenerla?</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Radique una solicitud de inspección desde la sección de Servicios. Tras la inspección técnica y el pago del arancel, el Comando emitirá la constancia con su folio de verificación.
                </p>
              </div>
            </div>

          </div>
        </main>

        <div className="relative z-20">
          <Footer />
        </div>

      </div>
    </>
  );
};

export default ConsultaPublica;
