import React, { useState } from 'react';

interface Expediente {
  id: string;
  empresa: string;
  rif: string;
  riesgo: string;
  superficie: number;
  estado: 'Solvente' | 'En Revisión';
}

const EXPEDIENTES: Expediente[] = [
  { id: 'EXP-1044', empresa: 'Ferretería Monagas', rif: 'J-40112233-5', riesgo: 'Medio', superficie: 320, estado: 'Solvente' },
  { id: 'EXP-1036', empresa: 'Hotel Los Guaritos', rif: 'J-31567890-4', riesgo: 'Alto', superficie: 780, estado: 'Solvente' },
  { id: 'EXP-1042', empresa: 'Clínica Maturín S.A.', rif: 'J-09876543-2', riesgo: 'Alto', superficie: 540, estado: 'En Revisión' },
  { id: 'EXP-1045', empresa: 'Panadería El Trigal C.A.', rif: 'J-30456123-1', riesgo: 'Bajo', superficie: 150, estado: 'En Revisión' },
];

const Generacion: React.FC = () => {
  const [sel, setSel] = useState<string>(EXPEDIENTES[0].id);
  const [tipo, setTipo] = useState<'Conformidad' | 'Vigencia' | 'Ajuste de Planos'>('Conformidad');
  const [generado, setGenerado] = useState<null | { folio: string; fecha: string }>(null);

  const expediente = EXPEDIENTES.find((e) => e.id === sel)!;
  const habilitado = expediente.estado === 'Solvente';

  const folio = `FBBV-${expediente.id.replace('EXP-', '')}-${tipo === 'Conformidad' ? 'CF' : tipo === 'Vigencia' ? 'VG' : 'AP'}`;

  const generar = () => {
    const fecha = new Date().toLocaleDateString('es-VE', { day: '2-digit', month: 'long', year: 'numeric' });
    setGenerado({ folio, fecha });
  };

  const descargar = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    const ancho = doc.internal.pageSize.getWidth();

    doc.setFillColor(11, 27, 61);
    doc.rect(0, 0, ancho, 18, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(17);
    doc.setTextColor(11, 27, 61);
    doc.text('BOMBEROS VOLUNTARIOS DE MONAGAS', ancho / 2, 66, { align: 'center' });

    doc.setFontSize(11);
    doc.setTextColor(139, 26, 26);
    doc.text('FBBV · Estado Monagas · Venezuela', ancho / 2, 84, { align: 'center' });

    doc.setFontSize(15);
    doc.setTextColor(15, 23, 42);
    doc.text(`Certificado de ${tipo}`, ancho / 2, 114, { align: 'center' });

    doc.setDrawColor(11, 27, 61);
    doc.setLineWidth(1);
    doc.line(60, 128, ancho - 60, 128);

    const filas: [string, string][] = [
      ['Folio', folio],
      ['Expediente', expediente.id],
      ['Empresa', expediente.empresa],
      ['RIF', expediente.rif],
      ['Tipo de certificado', `Certificado de ${tipo}`],
      ['Clasificacion de riesgo', expediente.riesgo],
      ['Superficie', `${expediente.superficie} m2`],
      ['Estatus del expediente', expediente.estado],
      ['Fecha de emision', new Date().toLocaleDateString('es-VE')],
    ];

    let y = 160;
    doc.setFontSize(11);
    filas.forEach(([k, v]) => {
      doc.setDrawColor(203, 213, 225);
      doc.setLineWidth(0.5);
      doc.line(70, y + 8, ancho - 70, y + 8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(100, 116, 139);
      doc.text(`${k}:`, 70, y);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 23, 42);
      doc.text(v, 230, y);
      y += 30;
    });

    y += 40;
    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(1);
    doc.line(70, y, 250, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105);
    doc.text('Ing. A. Rodriguez - Director Tecnico FBBV', 70, y + 16);

    doc.save(`${folio}.pdf`);
  };

  return (
    <div className="px-6 pb-8 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Selector */}
        <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5 space-y-5">
          <h3 className="font-black text-slate-900 text-sm drop-shadow-sm">Generar certificado</h3>

          <div className="space-y-1.5">
            <label htmlFor="exp" className="text-xs font-bold text-slate-800">Expediente habilitado</label>
            <select id="exp" value={sel} onChange={(e) => { setSel(e.target.value); setGenerado(null); }} className="w-full bg-white/50 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none font-semibold">
              {EXPEDIENTES.map((e) => (
                <option key={e.id} value={e.id}>{e.id} — {e.empresa}{e.estado !== 'Solvente' ? ' (no solvente)' : ''}</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="tipo" className="text-xs font-bold text-slate-800">Tipo de certificado</label>
            <select id="tipo" value={tipo} onChange={(e) => { setTipo(e.target.value as typeof tipo); setGenerado(null); }} className="w-full bg-white/50 border border-white/50 rounded-lg p-2.5 text-sm text-slate-900 focus:ring-2 focus:ring-[#0B1B3D] outline-none font-semibold">
              <option value="Conformidad">Conformidad Técnica</option>
              <option value="Vigencia">Aprobación de Vigencia</option>
              <option value="Ajuste de Planos">Ajuste de Planos</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/30 border border-white/40 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-700 uppercase">Folio</p>
              <p className="text-sm font-black text-[#0B1B3D]">{folio}</p>
            </div>
            <div className="bg-white/30 border border-white/40 rounded-xl p-3 text-center">
              <p className="text-[10px] font-bold text-slate-700 uppercase">Estatus</p>
              <p className={`text-sm font-black ${habilitado ? 'text-emerald-700' : 'text-red-700'}`}>{expediente.estado}</p>
            </div>
          </div>

          {!habilitado && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-400 text-red-800 rounded-xl px-3 py-2 text-xs font-bold">
              ⚠️ El expediente debe estar <b>solvente</b> para generar el certificado.
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => { setGenerado(null); setSel(EXPEDIENTES[0].id); }} className="px-5 py-2.5 rounded-lg font-bold text-sm text-slate-800 bg-white/40 hover:bg-white/60 transition border border-white/50">Limpiar</button>
            <button
              type="button"
              onClick={generar}
              disabled={!habilitado}
              className={`px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg transition ${habilitado ? 'text-white bg-[#0B1B3D] hover:bg-slate-800 border border-[#0B1B3D]' : 'bg-slate-400 text-slate-600 cursor-not-allowed border border-slate-400'}`}
            >
              Generar
            </button>
          </div>
        </div>

        {/* Vista previa del documento */}
        <div className="bg-[#0B1B3D]/30 backdrop-blur-xl border border-white/30 rounded-2xl shadow-xl p-5 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-extrabold uppercase tracking-wide text-slate-600">Vista previa</p>
            {generado && (
              <button type="button" onClick={() => void descargar()} className="text-[11px] font-extrabold text-white bg-[#8B1A1A] hover:bg-[#6A1414] rounded-md px-3 py-1.5 transition">Descargar PDF ⬇</button>
            )}
          </div>

          {/* Documento */}
          <div className="flex-1 bg-white border-2 border-[#0B1B3D] rounded-xl p-6 text-slate-900 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#0B1B3D]"></div>
            <div className="text-center border-b border-slate-300 pb-4 mb-4">
              <p className="text-[10px] font-extrabold tracking-widest text-[#8B1A1A]">BOMBEROS VOLUNTARIOS DE MONAGAS</p>
              <h4 className="font-black text-lg text-[#0B1B3D] leading-tight">Certificado de {tipo}</h4>
              <p className="text-[10px] font-bold text-slate-500 tracking-wider">FBBV · Estado Monagas · Venezuela</p>
            </div>

            <dl className="space-y-2 text-xs">
              {[
                ['Folio', folio],
                ['Expediente', expediente.id],
                ['Empresa', expediente.empresa],
                ['RIF', expediente.rif],
                ['Clasificación de riesgo', expediente.riesgo],
                ['Superficie', `${expediente.superficie} m²`],
                ['Estatus del expediente', expediente.estado],
                ['Emitido', generado ? generado.fecha : '— pendiente —'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-dotted border-slate-300 pb-1.5">
                  <dt className="font-bold text-slate-600">{k}</dt>
                  <dd className="font-extrabold text-slate-900 text-right">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex justify-between items-end">
              <div className="text-center">
                <div className="w-32 border-t-2 border-slate-700 mb-1"></div>
                <p className="text-[10px] font-bold text-slate-700">Ing. A. Rodríguez</p>
                <p className="text-[9px] text-slate-500">Director Técnico FBBV</p>
              </div>
              <div className="w-16 h-16 rounded-full border-4 border-[#8B1A1A] flex items-center justify-center text-center text-[8px] font-black text-[#8B1A1A] leading-none rotate-[-12deg]">
                FBBV<br/>VÁLIDO
              </div>
            </div>

            {generado && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/85 backdrop-blur-[1px]">
                <div className="bg-emerald-500 text-white rounded-xl px-6 py-4 text-center shadow-2xl">
                  <div className="text-3xl mb-1">✓</div>
                  <p className="font-black">Certificado generado</p>
                  <p className="text-xs font-semibold">Folio {generado.folio}</p>
                </div>
              </div>
            )}
          </div>

          {!generado && (
            <p className="text-[11px] font-bold text-slate-600 text-center mt-3">Completa los datos y pulsa <b>Generar</b> para emitir el documento.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Generacion;
