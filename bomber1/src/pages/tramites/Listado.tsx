import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

type Estatus = 'En Revisión' | 'Solvente' | 'Inspección Programada' | 'Rechazada';

interface Solicitud {
  id: string;
  fecha: string;
  empresa: string;
  rif: string;
  estatus: Estatus;
  color: string;
}

const SOLICITUDES: Solicitud[] = [
  { id: 'EXP-1045', fecha: '23/07/2026', empresa: 'Panadería El Trigal C.A.', rif: 'J-30456123-1', estatus: 'En Revisión', color: 'bg-blue-200 text-blue-900 border-blue-400' },
  { id: 'EXP-1044', fecha: '22/07/2026', empresa: 'Ferretería Monagas', rif: 'J-40112233-5', estatus: 'Solvente', color: 'bg-emerald-200 text-emerald-900 border-emerald-400' },
  { id: 'EXP-1042', fecha: '20/07/2026', empresa: 'Clínica Maturín S.A.', rif: 'J-09876543-2', estatus: 'Inspección Programada', color: 'bg-amber-200 text-amber-900 border-amber-400' },
  { id: 'EXP-1039', fecha: '15/07/2026', empresa: 'Automercados Bicentenario', rif: 'J-11223344-0', estatus: 'Rechazada', color: 'bg-red-200 text-red-900 border-red-400' },
  { id: 'EXP-1036', fecha: '11/07/2026', empresa: 'Hotel Los Guaritos', rif: 'J-31567890-4', estatus: 'Solvente', color: 'bg-emerald-200 text-emerald-900 border-emerald-400' },
  { id: 'EXP-1031', fecha: '05/07/2026', empresa: 'Taller Mecánico La Cruz', rif: 'J-29887766-1', estatus: 'En Revisión', color: 'bg-blue-200 text-blue-900 border-blue-400' },
];

const Listado: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [filtro, setFiltro] = useState<'Todos' | Estatus>('Todos');

  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return SOLICITUDES.filter((s) => {
      const coincideTexto = !q || s.id.toLowerCase().includes(q) || s.empresa.toLowerCase().includes(q) || s.rif.toLowerCase().includes(q);
      const coincideEstado = filtro === 'Todos' || s.estatus === filtro;
      return coincideTexto && coincideEstado;
    });
  }, [busqueda, filtro]);

  return (
    <div className="px-6 pb-8 space-y-4">

      {/* Controles de Filtrado */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[#0B1B3D]/20 backdrop-blur-md border border-white/30 p-4 rounded-xl shadow-md gap-4">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por RIF o Razón Social..."
            className="w-full bg-white/50 border border-white/50 rounded-lg p-2 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0B1B3D] outline-none shadow-inner"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as 'Todos' | Estatus)}
            className="bg-white/50 border border-white/50 rounded-lg p-2 text-sm text-slate-900 outline-none w-full sm:w-auto font-semibold"
          >
            <option value="Todos">Todos los Estatus</option>
            <option value="En Revisión">En Revisión</option>
            <option value="Solvente">Solvente</option>
            <option value="Inspección Programada">Inspección Programada</option>
            <option value="Rechazada">Rechazada</option>
          </select>
          <Link to="/dashboard/tramites/nuevas" className="bg-[#0B1B3D] text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-slate-800 transition whitespace-nowrap">+ Nuevo</Link>
        </div>
      </div>

      {/* Tabla Principal */}
      <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-[11px] text-slate-800 uppercase bg-white/40 border-b border-white/40 backdrop-blur-md">
              <tr>
                <th className="px-6 py-3 font-extrabold">N° Expediente</th>
                <th className="px-6 py-3 font-extrabold">Fecha Ingreso</th>
                <th className="px-6 py-3 font-extrabold">Razón Social</th>
                <th className="px-6 py-3 font-extrabold">RIF</th>
                <th className="px-6 py-3 font-extrabold text-center">Estatus</th>
                <th className="px-6 py-3 font-extrabold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/30 text-slate-900 font-semibold">
              {filtradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-slate-600 font-bold">Sin resultados para la búsqueda</td>
                </tr>
              ) : (
                filtradas.map((sol) => (
                  <tr key={sol.id} className="hover:bg-white/30 transition">
                    <td className="px-6 py-4 font-black">{sol.id}</td>
                    <td className="px-6 py-4 text-slate-700">{sol.fecha}</td>
                    <td className="px-6 py-4 truncate max-w-[220px]">{sol.empresa}</td>
                    <td className="px-6 py-4">{sol.rif}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold border shadow-sm ${sol.color}`}>
                        {sol.estatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-[#0B1B3D] hover:text-red-700 font-bold underline text-xs">Revisar &rarr;</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-white/30 bg-white/10 text-xs font-bold text-slate-700 flex justify-between items-center">
          <span>Mostrando {filtradas.length} de {SOLICITUDES.length} registros</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white/40 border border-white/50 rounded hover:bg-white/60">Ant</button>
            <button className="px-3 py-1 bg-white/40 border border-white/50 rounded hover:bg-white/60">Sig</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Listado;
