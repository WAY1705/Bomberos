import React, { useMemo, useState } from 'react';
import { useDashboard } from '../../layouts/dashboardContext';

type EstadoIncidente = 'En Ruta' | 'Controlado' | 'Cerrado' | 'Pendiente';

interface Incidente {
  id: string;
  detalles: string;
  ubicacion: string;
  estado: EstadoIncidente;
}

interface Unidad {
  id: number;
  nombre: string;
  estado: 'Disponible' | 'Despachada' | 'Mantenimiento';
  combustible: number;
}

const ESTADO_BADGE: Record<EstadoIncidente, string> = {
  'En Ruta': 'bg-yellow-400 text-yellow-950 border-yellow-500',
  Controlado: 'bg-green-400 text-green-950 border-green-500',
  Cerrado: 'bg-white/80 text-slate-900 border-slate-300',
  Pendiente: 'bg-red-400 text-red-950 border-red-500',
};

const UNIDAD_BADGE: Record<Unidad['estado'], string> = {
  Disponible: 'text-green-950 bg-green-300 border-green-400',
  Despachada: 'text-yellow-950 bg-yellow-400 border-yellow-500',
  Mantenimiento: 'text-slate-900 bg-slate-300 border-slate-400',
};

const SECUENCIA_ESTADO_UNIDAD: Unidad['estado'][] = ['Disponible', 'Despachada', 'Mantenimiento'];

const RECAUDACION = {
  Mensual: {
    total: '$0,067',
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
    valores: [15, 20, 30, 48, 75, 82, 100, 72, 100, 62],
  },
  Anual: {
    total: '$0,804',
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
    valores: [40, 55, 62, 48, 75, 82, 90, 72, 100, 88],
  },
} as const;

const DashboardHome: React.FC = () => {
  const { alertas, setShowAlerts } = useDashboard();

  const [metricas, setMetricas] = useState({ activos: 5, despachadas: 12, turno: 35 });

  const [incidentes, setIncidentes] = useState<Incidente[]>([
    { id: '#1042', detalles: 'Incendio Estruct.', ubicacion: 'SV, El Furrial', estado: 'En Ruta' },
    { id: '#1041', detalles: 'Rescate Vehicular', ubicacion: 'Troncal 10', estado: 'Controlado' },
    { id: '#1040', detalles: 'Derrame Comb.', ubicacion: 'Zona Ind.', estado: 'Cerrado' },
  ]);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState<'Todos' | EstadoIncidente>('Todos');
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevo, setNuevo] = useState<{ detalles: string; ubicacion: string; estado: EstadoIncidente }>({
    detalles: '',
    ubicacion: '',
    estado: 'En Ruta',
  });

  const [unidades, setUnidades] = useState<Unidad[]>([
    { id: 1, nombre: 'Bomba Monagas 1', estado: 'Disponible', combustible: 80 },
    { id: 2, nombre: 'Rescate Maturín', estado: 'Despachada', combustible: 45 },
  ]);

  const [periodoRecaudacion, setPeriodoRecaudacion] = useState<'Mensual' | 'Anual'>('Mensual');

  const incidentesFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    const lista = incidentes.filter((inc) => {
      const coincideTexto =
        !q ||
        inc.id.toLowerCase().includes(q) ||
        inc.detalles.toLowerCase().includes(q) ||
        inc.ubicacion.toLowerCase().includes(q);
      const coincideEstado = filtroEstado === 'Todos' || inc.estado === filtroEstado;
      return coincideTexto && coincideEstado;
    });
    return lista.sort((a, b) => {
      const na = parseInt(a.id.replace('#', ''), 10);
      const nb = parseInt(b.id.replace('#', ''), 10);
      return ordenAsc ? na - nb : nb - na;
    });
  }, [incidentes, busqueda, filtroEstado, ordenAsc]);

  const crearIncidente = (e: React.FormEvent) => {
    e.preventDefault();
    const detalles = nuevo.detalles.trim();
    const ubicacion = nuevo.ubicacion.trim();
    if (!detalles || !ubicacion) return;
    const maxId = incidentes.reduce((max, i) => Math.max(max, parseInt(i.id.replace('#', ''), 10)), 1042);
    const id = `#${maxId + 1}`;
    setIncidentes((prev) => [{ id, detalles, ubicacion, estado: nuevo.estado }, ...prev]);
    if (nuevo.estado === 'En Ruta' || nuevo.estado === 'Pendiente') {
      setMetricas((m) => ({ ...m, activos: m.activos + 1 }));
    }
    setNuevo({ detalles: '', ubicacion: '', estado: 'En Ruta' });
    setIsModalOpen(false);
  };

  const cambiarEstadoIncidente = (id: string, nuevoEstado: EstadoIncidente) => {
    setIncidentes((prev) =>
      prev.map((inc) => {
        if (inc.id !== id) return inc;
        const activoAntes = inc.estado === 'En Ruta' || inc.estado === 'Pendiente';
        const activoDespues = nuevoEstado === 'En Ruta' || nuevoEstado === 'Pendiente';
        if (activoAntes && !activoDespues) setMetricas((m) => ({ ...m, activos: Math.max(0, m.activos - 1) }));
        if (!activoAntes && activoDespues) setMetricas((m) => ({ ...m, activos: m.activos + 1 }));
        return { ...inc, estado: nuevoEstado };
      })
    );
  };

  const exportarCSV = () => {
    const filas = [
      ['ID', 'Detalles', 'Ubicacion', 'Estado'],
      ...incidentes.map((i) => [i.id, i.detalles, i.ubicacion, i.estado]),
    ];
    const csv = filas.map((f) => f.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'incidentes.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const ciclarEstadoUnidad = (id: number) => {
    setUnidades((prev) =>
      prev.map((u) => {
        if (u.id !== id) return u;
        const idx = SECUENCIA_ESTADO_UNIDAD.indexOf(u.estado);
        const siguiente = SECUENCIA_ESTADO_UNIDAD[(idx + 1) % SECUENCIA_ESTADO_UNIDAD.length];
        if (u.estado !== 'Despachada' && siguiente === 'Despachada') {
          setMetricas((m) => ({ ...m, despachadas: m.despachadas + 1 }));
        } else if (u.estado === 'Despachada' && siguiente !== 'Despachada') {
          setMetricas((m) => ({ ...m, despachadas: Math.max(0, m.despachadas - 1) }));
        }
        return { ...u, estado: siguiente };
      })
    );
  };

  const actualizarCombustible = () => {
    setUnidades((prev) => prev.map((u) => ({ ...u, combustible: Math.floor(Math.random() * 61) + 40 })));
  };

  const recaudacion = RECAUDACION[periodoRecaudacion];

  return (
    <>
      <div className="px-6 pb-8 space-y-4">

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* KPI 1 - Rojo */}
          <button
            type="button"
            onClick={() => { setFiltroEstado('En Ruta'); setBusqueda(''); }}
            className="text-left bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 p-4 md:p-5 rounded-2xl shadow-xl relative overflow-hidden group hover:bg-[#0B1B3D]/40 transition"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-red-900 font-extrabold text-xs">Incidentes Activos</p>
                <h3 className="text-3xl font-black text-red-700 mt-1 drop-shadow-sm">{metricas.activos}</h3>
              </div>
              <div className="p-1.5 bg-white/40 shadow-md rounded-lg text-red-700 border border-white/50 group-hover:scale-110 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path></svg></div>
            </div>
          </button>

          {/* KPI 2 - Azul */}
          <button
            type="button"
            onClick={() => actualizarCombustible()}
            className="text-left bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 p-4 md:p-5 rounded-2xl shadow-xl relative overflow-hidden group hover:bg-[#0B1B3D]/40 transition"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-blue-900 font-extrabold text-xs">Unidades Despachadas</p>
                <h3 className="text-3xl font-black text-blue-700 mt-1 drop-shadow-sm">{metricas.despachadas}</h3>
              </div>
              <div className="p-1.5 bg-white/40 shadow-md rounded-lg text-blue-700 border border-white/50 group-hover:scale-110 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg></div>
            </div>
          </button>

          {/* KPI 3 - Verde */}
          <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 p-4 md:p-5 rounded-2xl shadow-xl relative overflow-hidden group hover:bg-[#0B1B3D]/40 transition">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-green-900 font-extrabold text-xs">Personal de Turno</p>
                <h3 className="text-3xl font-black text-green-700 mt-1 drop-shadow-sm">{metricas.turno}</h3>
              </div>
              <div className="p-1.5 bg-white/40 shadow-md rounded-lg text-green-700 border border-white/50 group-hover:scale-110 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div>
            </div>
          </div>

          {/* KPI 4 - Amarillo */}
          <button
            type="button"
            onClick={() => setShowAlerts((v) => !v)}
            className="text-left bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 p-4 md:p-5 rounded-2xl shadow-xl relative overflow-hidden group hover:bg-[#0B1B3D]/40 transition"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-yellow-800 font-extrabold text-xs">Alertas de Sistema</p>
                <h3 className="text-3xl font-black text-yellow-600 mt-1 drop-shadow-sm">{alertas.length}</h3>
              </div>
              <div className="p-1.5 bg-white/40 shadow-md rounded-lg text-yellow-700 border border-white/50 group-hover:scale-110 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></div>
            </div>
          </button>
        </div>

        {/* ÁREA PRINCIPAL: Gráficos y Tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* IZQUIERDA: GRÁFICOS */}
          <div className="lg:col-span-2 space-y-4 flex flex-col">

            {/* Gráfico 1: Estado de Solicitudes */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-5 h-64">
              <h3 className="font-bold text-slate-900 text-sm mb-2 drop-shadow-sm">Estado de Solicitudes</h3>

              <div className="flex items-center justify-center gap-12 h-full pb-6">
                <div className="relative w-64 h-32 overflow-hidden flex justify-center mt-4">
                  <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible drop-shadow-lg">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="15" strokeLinecap="butt" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#ef4444" strokeWidth="15" strokeDasharray="125.6" strokeDashoffset="113" strokeLinecap="butt" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#eab308" strokeWidth="15" strokeDasharray="125.6" strokeDashoffset="12.56" strokeLinecap="butt" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#22c55e" strokeWidth="15" strokeDasharray="125.6" strokeDashoffset="37.68" strokeLinecap="butt" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#3b82f6" strokeWidth="16" strokeDasharray="125.6" strokeDashoffset="75.36" strokeLinecap="butt" />
                  </svg>

                  <div className="absolute top-[40%] left-[22%] text-[10px] font-extrabold text-slate-900 drop-shadow-md">40%</div>
                  <div className="absolute top-[12%] left-[46%] text-[10px] font-extrabold text-slate-900 drop-shadow-md">30%</div>
                  <div className="absolute top-[22%] right-[28%] text-[10px] font-extrabold text-slate-900 drop-shadow-md">20%</div>
                  <div className="absolute top-[60%] right-[18%] text-[10px] font-extrabold text-slate-900 drop-shadow-md">10%</div>
                </div>

                <div className="flex flex-col gap-2.5 text-xs text-slate-800 font-bold">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-md"></span> 40% En Proceso</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 shadow-md"></span> 30% Aprobadas</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500 shadow-md"></span> 20% Pendientes</div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500 shadow-md"></span> 10% Rechazadas</div>
                </div>
              </div>
            </div>

            {/* Gráfico 2: Recaudación */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-5 flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-slate-900 text-sm drop-shadow-sm">Recaudación {periodoRecaudacion}</h3>
                <div className="flex gap-1 bg-white/40 rounded-full p-0.5 border border-white/60">
                  {(['Mensual', 'Anual'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPeriodoRecaudacion(p)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition ${periodoRecaudacion === p ? 'bg-[#0B1B3D] text-white shadow' : 'text-slate-700 hover:text-slate-900'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div className="text-center w-full -mt-4 mb-2">
                <span className="text-sm text-slate-800 font-extrabold drop-shadow-sm">Total {recaudacion.total}</span>
              </div>

              <div className="h-40 border-b border-slate-300/60 flex items-end justify-between px-6 gap-3 relative">
                <div className="absolute inset-0 flex flex-col justify-between z-0 pointer-events-none">
                  <div className="border-t border-slate-300/30 w-full"></div>
                  <div className="border-t border-slate-300/30 w-full"></div>
                  <div className="border-t border-slate-300/30 w-full"></div>
                  <div className="border-t border-slate-300/30 w-full"></div>
                  <div className="border-t border-slate-300/30 w-full"></div>
                </div>
                <div className="absolute -left-2 top-0 bottom-0 flex flex-col justify-between text-[9px] text-slate-800 pb-1 font-bold text-right pr-1">
                  <span>1,2000</span><span>1,0000</span><span>8000</span><span>6000</span><span>4000</span><span>2000</span><span>0</span>
                </div>

                {recaudacion.valores.map((h, i) => (
                  <div key={i} className="w-full bg-blue-600 z-10 hover:bg-blue-500 transition rounded-t-sm shadow-md" style={{ height: `${h}%` }} title={`${recaudacion.labels[i]}: ${h}%`}></div>
                ))}
              </div>
              <div className="flex justify-between px-6 mt-2 text-[10px] text-slate-800 font-bold drop-shadow-sm">
                {recaudacion.labels.map((l) => <span key={l}>{l}</span>)}
              </div>

              <div className="flex justify-between items-center mt-4 pt-2 border-t border-slate-300/40 text-center px-12">
                <div><h4 className="text-xl font-black text-slate-900 drop-shadow-sm">{metricas.activos}</h4><span className="text-[10px] text-slate-800 font-bold">Activos</span></div>
                <div><h4 className="text-xl font-black text-slate-900 drop-shadow-sm">{metricas.despachadas}</h4><span className="text-[10px] text-slate-800 font-bold">Despachados</span></div>
                <div><h4 className="text-xl font-black text-slate-900 drop-shadow-sm">{metricas.turno}</h4><span className="text-[10px] text-slate-800 font-bold">Turno</span></div>
                <div><h4 className="text-xl font-black text-slate-900 drop-shadow-sm">{alertas.length}</h4><span className="text-[10px] text-slate-800 font-bold">Alerta</span></div>
              </div>
            </div>

          </div>

          {/* DERECHA: Listas y Estados */}
          <div className="space-y-4 flex flex-col">

            {/* Tabla de Incidentes Recientes */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-0 overflow-hidden flex flex-col h-64">
              <div className="p-3 border-b border-slate-300/40 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm drop-shadow-sm">Incidentes Recientes</h3>
                  <div className="flex items-center gap-1">
                    <button type="button" onClick={exportarCSV} className="text-[10px] font-extrabold text-slate-700 bg-white/40 hover:bg-white/60 border border-white/60 rounded-md px-2 py-1 transition">CSV</button>
                    <button type="button" onClick={() => setIsModalOpen(true)} className="text-[10px] font-extrabold text-white bg-[#8B1A1A] hover:bg-[#6A1414] rounded-md px-2 py-1 transition">+ Nuevo</button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar por ID, tipo o lugar..."
                    className="flex-1 min-w-0 bg-white/60 border border-white/60 rounded-md px-2 py-1 text-[11px] font-semibold text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition"
                  />
                  <select
                    value={filtroEstado}
                    onChange={(e) => setFiltroEstado(e.target.value as 'Todos' | EstadoIncidente)}
                    className="bg-white/60 border border-white/60 rounded-md px-1.5 py-1 text-[11px] font-bold text-slate-800 focus:ring-2 focus:ring-red-700 outline-none transition"
                  >
                    <option value="Todos">Todos</option>
                    <option value="En Ruta">En Ruta</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Controlado">Controlado</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                  <button type="button" onClick={() => setOrdenAsc((v) => !v)} className="text-[10px] font-extrabold text-slate-700 bg-white/40 hover:bg-white/60 border border-white/60 rounded-md px-2 py-1 transition whitespace-nowrap" title="Ordenar por ID">
                    ID {ordenAsc ? '↑' : '↓'}
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto hide-scrollbar">
                <table className="w-full text-xs text-left">
                  <thead className="text-[10px] text-slate-800 uppercase bg-white/40 border-b border-slate-300/40 backdrop-blur-md sticky top-0">
                    <tr>
                      <th className="px-4 py-2 font-bold">ID</th>
                      <th className="px-4 py-2 font-bold">DETALLES</th>
                      <th className="px-4 py-2 font-bold text-center">ESTADO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-300/30 text-slate-900 font-bold">
                    {incidentesFiltrados.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-slate-600 font-semibold">Sin resultados</td>
                      </tr>
                    ) : (
                      incidentesFiltrados.map((inc) => (
                        <tr key={inc.id} className="hover:bg-white/40 transition">
                          <td className="px-4 py-2.5">{inc.id}</td>
                          <td className="px-4 py-2.5 leading-tight">{inc.detalles}<br/><span className="text-[10px] text-slate-700 font-semibold">{inc.ubicacion}</span></td>
                          <td className="px-4 py-2.5 text-center">
                            <select
                              value={inc.estado}
                              onChange={(e) => cambiarEstadoIncidente(inc.id, e.target.value as EstadoIncidente)}
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border shadow-sm outline-none cursor-pointer ${ESTADO_BADGE[inc.estado]}`}
                            >
                              <option value="En Ruta">En Ruta</option>
                              <option value="Pendiente">Pendiente</option>
                              <option value="Controlado">Controlado</option>
                              <option value="Cerrado">Cerrado</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-1.5 border-t border-slate-300/40 text-[10px] font-bold text-slate-700">
                Mostrando {incidentesFiltrados.length} de {incidentes.length}
              </div>
            </div>

            {/* Estado de Unidades Clave */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-4 flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-sm drop-shadow-sm">Estado Unidades Clave</h3>
                <button type="button" onClick={actualizarCombustible} className="text-[10px] font-extrabold text-slate-700 bg-white/40 hover:bg-white/60 border border-white/60 rounded-md px-2 py-1 transition">Actualizar</button>
              </div>
              <div className="space-y-4">
                {unidades.map((u) => (
                  <div key={u.id} className="bg-white/30 border border-white/40 p-3 rounded-lg hover:bg-white/50 transition shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-extrabold text-slate-900 text-xs">{u.nombre}</span>
                      <button
                        type="button"
                        onClick={() => ciclarEstadoUnidad(u.id)}
                        className={`text-[10px] font-extrabold border px-2 py-0.5 rounded-full shadow-sm transition ${UNIDAD_BADGE[u.estado]}`}
                        title="Clic para cambiar estado"
                      >
                        {u.estado}
                      </button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[9px] text-slate-800 font-bold">
                        <span>Combustible</span> <span>{u.combustible}%</span>
                      </div>
                      <div className="w-full bg-white/50 rounded-full h-1.5 border border-white/60">
                        <div
                          className={`h-1.5 rounded-full ${u.combustible > 60 ? 'bg-green-500 shadow-[0_0_5px_#22c55e]' : u.combustible > 30 ? 'bg-yellow-500 shadow-[0_0_5px_#eab308]' : 'bg-red-500 shadow-[0_0_5px_#ef4444]'}`}
                          style={{ width: `${u.combustible}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* --- MODAL: NUEVO INCIDENTE --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative z-10 w-full max-w-md bg-white/85 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/60 p-6 text-slate-900">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-black">Registrar Incidente</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 hover:text-red-600" aria-label="Cerrar">✕</button>
            </div>
            <form onSubmit={crearIncidente} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">Detalle</label>
                <input
                  type="text"
                  value={nuevo.detalles}
                  onChange={(e) => setNuevo((n) => ({ ...n, detalles: e.target.value }))}
                  placeholder="Ej: Incendio Estructural"
                  required
                  className="w-full bg-white/70 border border-white/60 rounded-lg py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">Ubicación</label>
                <input
                  type="text"
                  value={nuevo.ubicacion}
                  onChange={(e) => setNuevo((n) => ({ ...n, ubicacion: e.target.value }))}
                  placeholder="Ej: Av. Bicentenario, Maturín"
                  required
                  className="w-full bg-white/70 border border-white/60 rounded-lg py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-red-700 focus:border-red-700 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wide text-slate-700 mb-1">Estado</label>
                <select
                  value={nuevo.estado}
                  onChange={(e) => setNuevo((n) => ({ ...n, estado: e.target.value as EstadoIncidente }))}
                  className="w-full bg-white/70 border border-white/60 rounded-lg py-2.5 px-3 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-red-700 outline-none transition"
                >
                  <option value="En Ruta">En Ruta</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Controlado">Controlado</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2.5 rounded-lg text-sm font-bold text-slate-700 bg-white/60 hover:bg-white/90 border border-white/70 transition">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-[#8B1A1A] hover:bg-[#6A1414] shadow-lg shadow-red-900/30 transition">Registrar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardHome;
