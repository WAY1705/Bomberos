import React, { useMemo, useState } from 'react';

interface Evento {
  dia: number;
  titulo: string;
  tipo: 'Inspección' | 'Vencimiento' | 'Audiencia';
}

const EVENTOS_BASE: Evento[] = [
  { dia: 5, titulo: 'Inspección — Taller Mecánico La Cruz', tipo: 'Inspección' },
  { dia: 8, titulo: 'Vencimiento — EXP-1031 (En Revisión)', tipo: 'Vencimiento' },
  { dia: 11, titulo: 'Inspección — Hotel Los Guaritos', tipo: 'Inspección' },
  { dia: 15, titulo: 'Audiencia — Recurso EXP-1039', tipo: 'Audiencia' },
  { dia: 17, titulo: 'Inspección — Automercados Bicentenario', tipo: 'Inspección' },
  { dia: 20, titulo: 'Inspección — Clínica Maturín S.A.', tipo: 'Inspección' },
  { dia: 22, titulo: 'Vencimiento — EXP-1044 (Solvente)', tipo: 'Vencimiento' },
  { dia: 23, titulo: 'Inspección — Panadería El Trigal C.A.', tipo: 'Inspección' },
  { dia: 27, titulo: 'Audiencia — Certificación #1040', tipo: 'Audiencia' },
];

const DIAS = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const COLOR_TIPO: Record<Evento['tipo'], string> = {
  Inspección: 'bg-blue-500/15 text-blue-800 border-blue-400',
  Vencimiento: 'bg-red-500/15 text-red-800 border-red-400',
  Audiencia: 'bg-amber-500/15 text-amber-800 border-amber-400',
};

const Calendario: React.FC = () => {
  const hoy = useMemo(() => new Date(), []);
  const [sel, setSel] = useState({ y: hoy.getFullYear(), m: hoy.getMonth() });
  const [diaActivo, setDiaActivo] = useState<number>(hoy.getDate());

  const primero = new Date(sel.y, sel.m, 1).getDay();
  const diasEnMes = new Date(sel.y, sel.m + 1, 0).getDate();

  const mover = (delta: number) => {
    const nueva = new Date(sel.y, sel.m + delta, 1);
    setSel({ y: nueva.getFullYear(), m: nueva.getMonth() });
    setDiaActivo(1);
  };

  const eventosDelDia = (d: number) => EVENTOS_BASE.filter((e) => e.dia === d);

  const celdas: (number | null)[] = [
    ...Array(primero).fill(null),
    ...Array.from({ length: diasEnMes }, (_, i) => i + 1),
  ];
  while (celdas.length % 7 !== 0) celdas.push(null);

  const esHoy = (d: number) => d === hoy.getDate() && sel.m === hoy.getMonth() && sel.y === hoy.getFullYear();

  return (
    <div className="px-6 pb-8 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Calendario */}
        <div className="lg:col-span-2 bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={() => mover(-1)} className="px-3 py-1.5 bg-white/40 hover:bg-white/60 border border-white/50 rounded-lg font-bold text-slate-800 transition">‹ Ant.</button>
            <h3 className="font-black text-slate-900 text-base drop-shadow-sm">{MESES[sel.m]} {sel.y}</h3>
            <button type="button" onClick={() => mover(1)} className="px-3 py-1.5 bg-white/40 hover:bg-white/60 border border-white/50 rounded-lg font-bold text-slate-800 transition">Sig. ›</button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-extrabold text-slate-700 mb-2">
            {DIAS.map((d) => <div key={d}>{d}</div>)}
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {celdas.map((d, i) => {
              if (d === null) return <div key={`e${i}`} />;
              const evts = eventosDelDia(d);
              const activo = d === diaActivo;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDiaActivo(d)}
                  className={`relative aspect-square rounded-lg text-xs font-bold transition border flex flex-col items-center justify-center ${
                    activo
                      ? 'bg-[#0B1B3D] text-white border-[#0B1B3D] shadow-lg'
                      : 'bg-white/30 text-slate-800 border-white/40 hover:bg-white/60'
                  }`}
                >
                  <span className={esHoy(d) && !activo ? 'underline decoration-red-500 decoration-2' : ''}>{d}</span>
                  {evts.length > 0 && (
                    <span className={`absolute bottom-1.5 flex gap-0.5`}>
                      {evts.slice(0, 3).map((e, j) => (
                        <span key={j} className={`w-1 h-1 rounded-full ${e.tipo === 'Inspección' ? 'bg-blue-500' : e.tipo === 'Vencimiento' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                      ))}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-white/30 text-[11px] font-bold text-slate-700">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Inspección</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Vencimiento</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Audiencia</span>
          </div>
        </div>

        {/* Detalle del día */}
        <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5 flex flex-col">
          <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-600">Agenda del día</p>
          <h4 className="font-black text-slate-900 text-lg mb-4">{diaActivo} de {MESES[sel.m]}</h4>

          {eventosDelDia(diaActivo).length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
              <span className="text-4xl mb-3">📅</span>
              <p className="text-sm font-bold text-slate-600">Sin actividades</p>
            </div>
          ) : (
            <div className="space-y-3">
              {eventosDelDia(diaActivo).map((e, i) => (
                <div key={i} className={`border rounded-xl p-3 ${COLOR_TIPO[e.tipo]}`}>
                  <p className="text-[10px] font-extrabold uppercase tracking-wide opacity-70">{e.tipo}</p>
                  <p className="text-sm font-bold leading-snug mt-0.5">{e.titulo}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-white/30 flex items-center justify-between text-xs font-bold text-slate-700">
            <span>Total del mes</span>
            <span className="text-[#0B1B3D] font-black text-base">{EVENTOS_BASE.length}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Calendario;
