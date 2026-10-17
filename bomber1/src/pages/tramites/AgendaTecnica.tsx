import React, { useMemo, useState } from 'react';

type Estado = 'Programada' | 'En Curso' | 'Completada';

interface Cita {
  id: number;
  fecha: string;
  hora: string;
  empresa: string;
  tipo: string;
  tecnico: string;
  estado: Estado;
}

const ESTADO_COLOR: Record<Estado, string> = {
  Programada: 'bg-blue-200 text-blue-900 border-blue-400',
  'En Curso': 'bg-amber-200 text-amber-900 border-amber-400',
  Completada: 'bg-emerald-200 text-emerald-900 border-emerald-400',
};

const CITA_INICIAL: Cita[] = [
  { id: 1, fecha: '24/07/2026', hora: '08:00', empresa: 'Panadería El Trigal C.A.', tipo: 'Incendios — Instalación eléctrica', tecnico: 'Ing. M. Pérez', estado: 'Programada' },
  { id: 2, fecha: '24/07/2026', hora: '10:30', empresa: 'Ferretería Monagas', tipo: 'Evacuación — Rutas de escape', tecnico: 'Téc. J. Suárez', estado: 'En Curso' },
  { id: 3, fecha: '25/07/2026', hora: '09:15', empresa: 'Clínica Maturín S.A.', tipo: 'Contra incendios — Bombas', tecnico: 'Ing. R. Blanco', estado: 'Programada' },
  { id: 4, fecha: '26/07/2026', hora: '14:00', empresa: 'Hotel Los Guaritos', tipo: 'Hidrantes — Presión', tecnico: 'Téc. L. Martínez', estado: 'Programada' },
  { id: 5, fecha: '22/07/2026', hora: '07:45', empresa: 'Automercados Bicentenario', tipo: 'Señalización — Salidas', tecnico: 'Téc. J. Suárez', estado: 'Completada' },
  { id: 6, fecha: '23/07/2026', hora: '16:20', empresa: 'Taller Mecánico La Cruz', tipo: 'Extintores — Vigencia', tecnico: 'Ing. M. Pérez', estado: 'Completada' },
];

const AgendaTecnica: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>(CITA_INICIAL);
  const [filtro, setFiltro] = useState<'Todas' | Estado>('Todas');

  const visibles = useMemo(() => {
    const lista = citas.filter((c) => filtro === 'Todas' || c.estado === filtro);
    return [...lista].sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
  }, [citas, filtro]);

  const avanzarEstado = (id: number) =>
    setCitas((prev) =>
      prev.map((c) => {
        if (c.id !== id) return c;
        const orden: Estado[] = ['Programada', 'En Curso', 'Completada'];
        const i = orden.indexOf(c.estado);
        return { ...c, estado: orden[(i + 1) % orden.length] };
      })
    );

  const conteo = (e: Estado) => citas.filter((c) => c.estado === e).length;

  return (
    <div className="px-6 pb-8 space-y-4">

      {/* Resumen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { l: 'Total', v: citas.length, c: 'text-slate-900' },
          { l: 'Programadas', v: conteo('Programada'), c: 'text-blue-700' },
          { l: 'En Curso', v: conteo('En Curso'), c: 'text-amber-700' },
          { l: 'Completadas', v: conteo('Completada'), c: 'text-emerald-700' },
        ].map((k) => (
          <div key={k.l} className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-xl p-3 shadow-md text-center">
            <p className={`text-2xl font-black ${k.c}`}>{k.v}</p>
            <p className="text-[10px] font-bold text-slate-700 uppercase">{k.l}</p>
          </div>
        ))}
      </div>

      {/* Filtro */}
      <div className="flex items-center justify-between bg-[#0B1B3D]/20 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-md gap-4 flex-wrap">
        <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wide">Agenda técnica de inspecciones</p>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as 'Todas' | Estado)}
          className="bg-white/50 border border-white/50 rounded-lg p-2 text-sm text-slate-900 outline-none font-semibold"
        >
          <option value="Todas">Todas</option>
          <option value="Programada">Programadas</option>
          <option value="En Curso">En Curso</option>
          <option value="Completada">Completadas</option>
        </select>
      </div>

      {/* Lista de citas */}
      <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-4 space-y-3">
        {visibles.length === 0 ? (
          <p className="text-center py-10 text-slate-600 font-bold text-sm">No hay citas con este estado</p>
        ) : (
          visibles.map((c) => (
            <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/30 border border-white/40 rounded-xl p-4 hover:bg-white/50 transition shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 shrink-0 rounded-lg bg-[#0B1B3D] text-white flex flex-col items-center justify-center leading-none shadow-md">
                  <span className="text-[9px] font-bold opacity-80">Hora</span>
                  <span className="text-sm font-black">{c.hora}</span>
                </div>
                <div>
                  <p className="font-black text-slate-900 text-sm">{c.empresa}</p>
                  <p className="text-xs font-semibold text-slate-700">{c.tipo}</p>
                  <p className="text-[11px] font-bold text-slate-600 mt-0.5">{c.fecha} · {c.tecnico}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border shadow-sm ${ESTADO_COLOR[c.estado]}`}>{c.estado}</span>
                <button
                  type="button"
                  onClick={() => avanzarEstado(c.id)}
                  className="text-[11px] font-extrabold text-[#0B1B3D] bg-white/50 hover:bg-white/70 border border-white/60 rounded-md px-2.5 py-1 transition"
                  title="Clic para cambiar estado"
                >
                  Cambiar estado →
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default AgendaTecnica;
