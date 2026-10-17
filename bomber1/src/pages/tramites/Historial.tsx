import React, { useMemo, useState } from 'react';

type Accion = 'Emisión' | 'Renovación' | 'Revisión' | 'Revocación';

interface Registro {
  id: number;
  certificado: string;
  empresa: string;
  accion: Accion;
  fecha: string;
  responsable: string;
  nota: string;
}

const COLOR_ACCION: Record<Accion, string> = {
  Emisión: 'bg-emerald-500/15 text-emerald-800 border-emerald-400',
  Renovación: 'bg-blue-500/15 text-blue-800 border-blue-400',
  Revisión: 'bg-amber-500/15 text-amber-800 border-amber-400',
  Revocación: 'bg-red-500/15 text-red-800 border-red-400',
};

const REGISTROS: Registro[] = [
  { id: 7, certificado: 'CERT-1040', empresa: 'Panadería El Trigal C.A.', accion: 'Revisión', fecha: '23/07/2026', responsable: 'Honimer Cabeza', nota: 'Pendiente de firma del inspector' },
  { id: 6, certificado: 'CERT-1038', empresa: 'Ferretería Monagas', accion: 'Emisión', fecha: '22/07/2026', responsable: 'Honimer Cabeza', nota: 'Otorgada con vigencia de 12 meses' },
  { id: 5, certificado: 'CERT-1035', empresa: 'Clínica Maturín S.A.', accion: 'Renovación', fecha: '21/07/2026', responsable: 'A. Rodríguez', nota: 'Renovada tras inspección satisfactoria' },
  { id: 4, certificado: 'CERT-1032', empresa: 'Automercados Bicentenario', accion: 'Revocación', fecha: '18/07/2026', responsable: 'A. Rodríguez', nota: 'Incumplimiento de norma de evacuación' },
  { id: 3, certificado: 'CERT-1029', empresa: 'Hotel Los Guaritos', accion: 'Emisión', fecha: '15/07/2026', responsable: 'Honimer Cabeza', nota: 'Vigencia hasta 15/07/2027' },
  { id: 2, certificado: 'CERT-1027', empresa: 'Taller Mecánico La Cruz', accion: 'Revisión', fecha: '12/07/2026', responsable: 'A. Rodríguez', nota: 'Conforme — sin observaciones' },
  { id: 1, certificado: 'CERT-1024', empresa: 'Inversiones Los Pinos C.A.', accion: 'Renovación', fecha: '08/07/2026', responsable: 'Honimer Cabeza', nota: 'Renovación anual aprobada' },
];

const Historial: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'Todas' | Accion>('Todas');

  const registros = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return REGISTROS.filter((r) => {
      const texto = !q || r.certificado.toLowerCase().includes(q) || r.empresa.toLowerCase().includes(q) || r.responsable.toLowerCase().includes(q);
      const accion = filtro === 'Todas' || r.accion === filtro;
      return texto && accion;
    });
  }, [busqueda, filtro]);

  const total = REGISTROS.length;

  return (
    <div className="px-6 pb-8 space-y-4">

      {/* Controles */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0B1B3D]/20 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-md gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por certificado, empresa o responsable..."
            className="w-full bg-white/50 border border-white/50 rounded-lg p-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0B1B3D] outline-none shadow-inner"
          />
        </div>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as 'Todas' | Accion)}
          className="bg-white/50 border border-white/50 rounded-lg p-2 text-sm text-slate-900 outline-none font-semibold w-full sm:w-auto"
        >
          <option value="Todas">Todas las acciones</option>
          <option value="Emisión">Emisión</option>
          <option value="Renovación">Renovación</option>
          <option value="Revisión">Revisión</option>
          <option value="Revocación">Revocación</option>
        </select>
      </div>

      {/* Línea de tiempo */}
      <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-slate-900 text-sm drop-shadow-sm">Historial de Certificaciones</h3>
          <span className="text-[11px] font-extrabold text-slate-700 bg-white/40 border border-white/50 rounded-full px-3 py-1">{registros.length} / {total}</span>
        </div>

        {registros.length === 0 ? (
          <p className="text-center py-10 text-slate-600 font-bold text-sm">Sin registros para la búsqueda</p>
        ) : (
          <ol className="relative border-l-2 border-white/50 ml-3 space-y-5">
            {registros.map((r) => (
              <li key={r.id} className="ml-5 relative">
                <span className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-[#0B1B3D] ring-4 ring-white/50"></span>
                <div className="bg-white/30 border border-white/40 rounded-xl p-4 hover:bg-white/50 transition shadow-md">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${COLOR_ACCION[r.accion]}`}>{r.accion}</span>
                      <span className="font-black text-slate-900 text-sm">{r.certificado}</span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-600">{r.fecha}</span>
                  </div>
                  <p className="font-bold text-slate-800 text-sm mt-1.5">{r.empresa}</p>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{r.nota}</p>
                  <p className="text-[10px] font-bold text-slate-500 mt-1">Responsable: {r.responsable}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

    </div>
  );
};

export default Historial;
