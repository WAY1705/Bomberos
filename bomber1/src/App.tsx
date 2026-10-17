import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portal from './pages/Portal';
import Login from './pages/Login';
import Institucion from './pages/Institucion';
import Prevencion from './pages/Prevencion';
import Requisitos from './pages/Requisitos';
import ConsultaPublica from './pages/ConsultaPublica';

import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import Listado from './pages/tramites/Listado';
import Nuevas from './pages/tramites/Nuevas';
import Calendario from './pages/tramites/Calendario';
import AgendaTecnica from './pages/tramites/AgendaTecnica';
import Historial from './pages/tramites/Historial';
import Generacion from './pages/tramites/Generacion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/institucion" element={<Institucion />} />
        <Route path="/prevencion" element={<Prevencion />} />
        <Route path="/requisito" element={<Requisitos />} />
        <Route path="/certificado" element={<ConsultaPublica />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="tramites/listado" element={<Listado />} />
          <Route path="tramites/nuevas" element={<Nuevas />} />
          <Route path="tramites/calendario" element={<Calendario />} />
          <Route path="tramites/agenda" element={<AgendaTecnica />} />
          <Route path="tramites/historial" element={<Historial />} />
          <Route path="tramites/generacion" element={<Generacion />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
