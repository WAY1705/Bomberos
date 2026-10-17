import type { Dispatch, SetStateAction } from 'react';
import { useOutletContext } from 'react-router-dom';

export interface Alerta {
  id: number;
  icono: string;
  color: string;
  texto: string;
}

export interface DashboardContextType {
  alertas: Alerta[];
  setAlertas: Dispatch<SetStateAction<Alerta[]>>;
  showAlerts: boolean;
  setShowAlerts: Dispatch<SetStateAction<boolean>>;
}

export const useDashboard = () => useOutletContext<DashboardContextType>();
