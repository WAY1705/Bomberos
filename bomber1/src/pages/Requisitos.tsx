import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/portal/Header';
import Footer from '../components/portal/Footer';

const requisitosGenerales = [
  {
    title: 'Edad',
    desc: 'Tener entre 18 y 40 años al momento de presentar la solicitud. La edad máxima podrá evaluarse según la convocatoria vigente.',
    color: 'border-t-red-600',
  },
  {
    title: 'Nacionalidad y Residencia',
    desc: 'Ser venezolano(a) y residir en el estado Monagas o zonas de influencia que permitan cumplir con la disponibilidad operativa.',
    color: 'border-t-blue-600',
  },
  {
    title: 'Buena Conducta',
    desc: 'No registrar antecedentes penales ni disciplinarios que afecten la idoneidad para el servicio público humanitario.',
    color: 'border-t-emerald-500',
  },
  {
    title: 'Estado de Salud',
    desc: 'Encontrarse en buen estado físico, mental y emocional, apto para realizar actividades operativas exigentes.',
    color: 'border-t-amber-500',
  },
  {
    title: 'Disponibilidad',
    desc: 'Contar con disponibilidad para guardias, entrenamientos, simulacros, capacitaciones y atención de emergencias (24/7).',
    color: 'border-t-red-600',
  },
  {
    title: 'Vocación de Servicio',
    desc: 'Demostrar espíritu solidario, respeto, ética, disciplina, trabajo en equipo y compromiso con la comunidad.',
    color: 'border-t-blue-600',
  },
];

const academicos = [
  { req: 'Escolaridad Mínima', esp: 'Título de Bachiller o certificado de culminación de estudios secundarios. En casos especiales se evaluará conforme a la convocatoria.' },
  { req: 'Conocimientos Básicos', esp: 'Lectura, escritura, cálculo básico y habilidades para seguir instrucciones operativas.' },
  { req: 'Formación Inicial', esp: 'Aprobación del curso de inducción, entrenamiento básico y evaluación física conforme lo establezca el Comando.' },
  { req: 'Capacitación Continua', esp: 'Compromiso para asistir a capacitaciones, simulacros y cursos de actualización y especialización.' },
];

const documentacion = [
  'Cédula de identidad vigente (ampliada o copia legible).',
  'Certificado de antecedentes penales (reciente).',
  'Antecedentes disciplinarios (si aplica al sector público).',
  'Partida de nacimiento.',
  'Título o certificado de bachillerato.',
  'Hoja de vida actualizada (con datos de contacto completos).',
  'Certificado médico de aptitud física y mental (profesional autorizado).',
  'Fotografía reciente tipo documento (fondo azul o blanco).',
  'Formulario de solicitud debidamente diligenciado (plataforma de trámites).',
  'Soportes adicionales que indique la convocatoria vigente.',
];

const proceso = [
  { step: 'Convocatoria', desc: 'Se publica la convocatoria con fechas, cupos, requisitos y medios de inscripción.' },
  { step: 'Inscripción y Radicación', desc: 'Diligencie y radique su solicitud adjuntando la documentación requerida.' },
  { step: 'Verificación', desc: 'Revisión de documentos para comprobar el cumplimiento de los requisitos mínimos.' },
  { step: 'Evaluación Física', desc: 'Pruebas de condición física, resistencia, agilidad y aptitud operativa.' },
  { step: 'Evaluación Psicológica y Médica', desc: 'Valoración de aptitud psicológica, médica y de idoneidad para el servicio.' },
  { step: 'Entrevista y Selección', desc: 'Entrevista personal, análisis integral y publicación del listado de admitidos.' },
  { step: 'Inducción y Formación', desc: 'Ingreso al programa de formación inicial (Inducción Bomberil), de carácter obligatorio.' },
  { step: 'Período de Prueba', desc: 'Superación del período de prueba y entrenamiento para ser integrado a la unidad correspondiente.' },
];

const condiciones = [
  { title: 'Carácter Voluntario', desc: 'El ingreso es a título voluntario, con alto sentido de servicio, abnegación y responsabilidad hacia la comunidad.' },
  { title: 'Disciplina y Uniformidad', desc: 'Cumplimiento del Reglamento Interno, uso adecuado del uniforme, dotación y normas de seguridad.' },
  { title: 'Confidencialidad y Ética', desc: 'Guardar reserva sobre información operativa, respetar la dignidad de las víctimas y actuar con imparcialidad.' },
  { title: 'Protección y Seguridad', desc: 'Cumplir los protocolos de seguridad, autoprotección y reporte de actos inseguros.' },
  { title: 'Compromiso de Permanencia', desc: 'Asistir a guardias y entrenamientos, manteniendo la preparación operativa continua.' },
  { title: 'Respeto a la Institución', desc: 'Promover los valores institucionales: Honor, Servicio, Disciplina, Lealtad, Humanidad y Solidaridad.' },
];

const Requisitos: React.FC = () => {
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
          <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 w-full space-y-16">

            {/* Cabecera de la Página */}
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-base md:text-lg text-slate-600 font-medium leading-relaxed">
                Conoce los requisitos, la documentación y el proceso de selección para ingresar a la Federación de Bomberos y Bomberas de Venezuela.
              </p>
              <div className="h-1 w-24 bg-red-700 mx-auto rounded-full mt-6 shadow-sm"></div>
            </div>

            {/* 1. Requisitos Generales */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">1. Requisitos Generales</h2>
                <p className="text-slate-600 mt-2 font-medium">Condiciones básicas que debe cumplir todo aspirante.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {requisitosGenerales.map((item) => (
                  <div
                    key={item.title}
                    className={`bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 ${item.color}`}
                  >
                    <h3 className="text-xl font-extrabold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Separador Full-Width Técnico */}
            <div className="w-full flex items-center justify-center py-8 relative">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent w-full"></div>
              <div className="absolute w-3 h-3 bg-slate-800 rotate-45 shadow-sm"></div>
            </div>

            {/* 2. Requisitos Académicos y Formativos */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">2. Requisitos Académicos</h2>
                <p className="text-slate-600 mt-2 font-medium">Formación mínima y compromisos de capacitación.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {academicos.map((item) => (
                  <div
                    key={item.req}
                    className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 shadow-lg rounded-[32px] p-8 hover:bg-white transition duration-500"
                  >
                    <h3 className="text-lg font-black text-slate-900 mb-2 uppercase tracking-wide">{item.req}</h3>
                    <p className="text-slate-600 text-base leading-relaxed text-justify font-medium">{item.esp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="w-full flex items-center justify-center py-8 relative">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent w-full"></div>
              <div className="absolute w-3 h-3 bg-red-500 rotate-45 shadow-sm"></div>
            </div>

            {/* 3. Documentación Requerida */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">3. Documentación Requerida</h2>
                <p className="text-slate-600 mt-2 font-medium">Presentar en original y/o copia legible, según la convocatoria vigente.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documentacion.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 bg-[#0B1B3D]/10 backdrop-blur-md border border-white/70 rounded-2xl p-4 hover:bg-white shadow-md transition duration-300"
                  >
                    <span className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-700 text-white text-sm font-bold shrink-0 shadow-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 text-sm md:text-base font-medium leading-relaxed">{doc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="w-full flex items-center justify-center py-8 relative">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent w-full"></div>
              <div className="absolute w-3 h-3 bg-slate-800 rotate-45 shadow-sm"></div>
            </div>

            {/* 4. Proceso de Selección */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">4. Proceso de Selección</h2>
                <p className="text-slate-600 mt-2 font-medium">Etapas que conforman el ingreso.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {proceso.map((item, i) => (
                  <div
                    key={item.step}
                    className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 hover:bg-white shadow-md transition duration-300 relative"
                  >
                    <div className="text-4xl font-black text-red-700/30 mb-2">{String(i + 1).padStart(2, '0')}</div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2 uppercase tracking-wide">{item.step}</h3>
                    <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Separador */}
            <div className="w-full flex items-center justify-center py-8 relative">
              <div className="h-px bg-gradient-to-r from-transparent via-slate-400 to-transparent w-full"></div>
              <div className="absolute w-3 h-3 bg-red-500 rotate-45 shadow-sm"></div>
            </div>

            {/* 5. Condiciones y Compromisos */}
            <div className="space-y-10">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 drop-shadow-sm uppercase">5. Condiciones y Compromisos</h2>
                <p className="text-slate-600 mt-2 font-medium">Principios y deberes que asume el voluntario.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {condiciones.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#0B1B3D]/20 backdrop-blur-md border border-white/80 rounded-2xl p-6 text-center hover:bg-white shadow-md transition duration-300 border-t-4 border-t-red-600"
                  >
                    <h3 className="text-lg font-extrabold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nota Importante */}
            <div className="bg-[#0B1B3D]/20 backdrop-blur-xl border border-white/80 border-l-4 border-l-red-600 shadow-lg rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-black text-slate-900 uppercase tracking-wide mb-2">Nota Importante</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                Los requisitos aquí descritos son de carácter general. Para cada proceso de ingreso se publicará una
                <strong> Convocatoria Oficial </strong> con cupos, fechas, cronograma, lugar de inscripción y cualquier
                modificación. Toda información oficial se dará a conocer por los canales institucionales.
              </p>
            </div>

            {/* Llamado a la acción */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/dashboard/tramites/nuevas"
                className="bg-red-700 hover:bg-red-800 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-red-900/50 transition border border-red-500 tracking-wide"
              >
                Radicar Solicitud de Ingreso
              </Link>
              <Link
                to="/institucion"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-slate-900 px-8 py-3.5 rounded-full font-bold shadow-lg transition tracking-wide"
              >
                Conocer la Institución
              </Link>
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

export default Requisitos;
