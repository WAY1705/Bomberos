import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TASA_RIESGO: Record<string, number> = { Bajo: 1.5, Medio: 2.5, Alto: 4 };

const formInicial = {
  razon: '',
  rif: '',
  direccion: '',
  parroquia: 'Seleccione...',
  actividad: 'Seleccione...',
  superficie: '',
  riesgo: 'Medio',
};

const Nuevas: React.FC = () => {
  const [form, setForm] = useState(formInicial);
  const [archivos, setArchivos] = useState<{ [k: string]: boolean }>({ rif: false, planos: false, memoria: false });
  const [registrado, setRegistrado] = useState<null | { expediente: string; arancel: string }>(null);
  const navigate = useNavigate();

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const superficie = parseFloat(form.superficie) || 0;
  const tasa = TASA_RIESGO[form.riesgo] ?? 2.5;
  const arancel = (superficie * tasa * 10).toFixed(2);

  const subir = (k: string) => setArchivos((a) => ({ ...a, [k]: !a[k] }));

  const registrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.razon.trim() || !form.rif.trim() || superficie <= 0) return;
    const n = 1046 + Math.floor(Math.random() * 3);
    setRegistrado({ expediente: `EXP-${n}`, arancel: `$${arancel}` });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (registrado) {
    return (
      <div className="px-6 pb-8 space-y-4 max-w-3xl mx-auto w-full">
        <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-3xl mb-4">✅</div>
          <h3 className="text-xl font-black text-slate-900 mb-1">Solicitud registrada</h3>
          <p className="text-sm font-semibold text-slate-700 mb-6">Expediente <b className="text-[#0B1B3D]">{registrado.expediente}</b> generado con arancel estimado <b className="text-[#0B1B3D]">{registrado.arancel}</b>.</p>
          <div className="flex justify-center gap-3">
            <button type="button" onClick={() => { setRegistrado(null); setForm(formInicial); setArchivos({ rif: false, planos: false, memoria: false }); }} className="px-5 py-2.5 rounded-lg font-bold text-sm text-slate-800 bg-white/40 hover:bg-white/60 transition border border-white/50">Otra solicitud</button>
            <button type="button" onClick={() => navigate('/dashboard/tramites/listado')} className="px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#0B1B3D] hover:bg-slate-800 transition shadow-lg">Ir al Listado</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-8 space-y-6 max-w-5xl mx-auto w-full">

      <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-6 md:p-8">
        <h3 className="font-black text-lg text-slate-900 mb-6 border-b border-white/40 pb-2">Datos del Establecimiento (HU-01)</h3>

        <form className="space-y-6" onSubmit={registrar}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label htmlFor="razon" className="text-xs font-bold text-slate-800">Razón Social</label>
              <input id="razon" type="text" required value={form.razon} onChange={set('razon')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner" placeholder="Ej. Inversiones Los Pinos C.A." />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="rif" className="text-xs font-bold text-slate-800">RIF</label>
              <input id="rif" type="text" required value={form.rif} onChange={set('rif')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner" placeholder="J-12345678-9" />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label htmlFor="direccion" className="text-xs font-bold text-slate-800">Dirección Fiscal / Ubicación</label>
              <textarea id="direccion" rows={2} value={form.direccion} onChange={set('direccion')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner" placeholder="Detalle la dirección exacta..."></textarea>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="parroquia" className="text-xs font-bold text-slate-800">Parroquia (Maturín)</label>
              <select id="parroquia" value={form.parroquia} onChange={set('parroquia')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner">
                <option>Seleccione...</option>
                <option>San Simón</option>
                <option>Boquerón</option>
                <option>Alto de Los Godos</option>
                <option>La Cruz</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="actividad" className="text-xs font-bold text-slate-800">Actividad Económica</label>
              <select id="actividad" value={form.actividad} onChange={set('actividad')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner">
                <option>Seleccione...</option>
                <option>Comercial Minorista</option>
                <option>Industrial / Manufactura</option>
                <option>Almacenamiento de Químicos</option>
                <option>Educativo / Institucional</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="superficie" className="text-xs font-bold text-slate-800">Superficie (Metros Cuadrados)</label>
              <input id="superficie" type="number" min={0} value={form.superficie} onChange={set('superficie')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner" placeholder="Ej. 150.5" />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="riesgo" className="text-xs font-bold text-slate-800">Clasificación de Riesgo</label>
              <select id="riesgo" value={form.riesgo} onChange={set('riesgo')} className="w-full bg-white/40 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none transition shadow-inner">
                <option>Bajo</option>
                <option>Medio</option>
                <option>Alto</option>
              </select>
            </div>
          </div>

          {/* Cálculo de arancel en vivo */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { l: 'Superficie', v: superficie ? `${superficie} m²` : '—' },
              { l: 'Tasa riesgo', v: `$${tasa.toFixed(2)}/m²` },
              { l: 'Recaudos', v: `${Object.values(archivos).filter(Boolean).length}/3` },
              { l: 'Arancel', v: `$${arancel}` },
            ].map((c) => (
              <div key={c.l} className="bg-white/30 border border-white/40 rounded-xl p-3 text-center shadow-md">
                <p className="text-[10px] font-bold text-slate-700 uppercase">{c.l}</p>
                <p className="text-lg font-black text-[#0B1B3D]">{c.v}</p>
              </div>
            ))}
          </div>

          {/* Carga de Recaudos Digitales */}
          <h3 className="font-black text-lg text-slate-900 mt-8 mb-4 border-b border-white/40 pb-2">Recaudos Digitales (PDF/JPG)</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { k: 'rif', e: '📄', t: 'Copia de RIF' },
              { k: 'planos', e: '🗺️', t: 'Planos (1:50)' },
              { k: 'memoria', e: '📝', t: 'Memoria Descriptiva' },
            ].map((r) => (
              <button
                key={r.k}
                type="button"
                onClick={() => subir(r.k)}
                className={`border rounded-xl p-4 flex flex-col items-center justify-center text-center transition ${archivos[r.k] ? 'bg-emerald-400/30 border-emerald-500' : 'bg-white/30 border-dashed border-slate-500 hover:bg-white/50'}`}
              >
                <span className="text-2xl mb-2">{archivos[r.k] ? '✅' : r.e}</span>
                <p className="text-xs font-bold text-slate-800">{r.t}</p>
                <p className="text-[10px] text-slate-600">{archivos[r.k] ? 'Adjuntado' : 'Subir archivo'}</p>
              </button>
            ))}
          </div>

          <div className="pt-6 flex justify-end gap-3">
            <Link to="/dashboard/tramites/listado" className="px-5 py-2.5 rounded-lg font-bold text-sm text-slate-800 bg-white/40 hover:bg-white/60 transition border border-white/50 self-center">Cancelar</Link>
            <button type="submit" className="px-5 py-2.5 rounded-lg font-bold text-sm text-white bg-[#0B1B3D] hover:bg-slate-800 transition shadow-lg border border-[#0B1B3D]">Registrar y Calcular Arancel (RF-03)</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default Nuevas;
