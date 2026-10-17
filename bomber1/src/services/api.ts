import axios from 'axios';

// Base URL del monolito Go (Fiber). Se puede sobreescribir con
// la variable de entorno VITE_API_URL en un archivo .env.
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

export const TOKEN_KEY = 'fbbv_token';
export const USER_KEY = 'fbbv_user';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Adjunta el token Bearer a cada petición.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Si el token expira o es inválido, limpia la sesión y vuelve al login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  },
);

export interface Usuario {
  id: number;
  usuario: string;
  nombre: string;
  rol: string;
}

export interface Solicitud {
  id: string;
  fecha: string;
  empresa: string;
  rif: string;
  estatus: string;
}

export interface Certificado {
  folio: string;
  empresa: string;
  rif: string;
  tipo: string;
  riesgo: string;
  superficie: string;
  emitido: string;
  vence: string;
  estado: 'Vigente' | 'Vencida' | 'Revocado';
  resolucion: string;
}

export function getUsuario(): Usuario | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as Usuario) : null;
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export async function iniciarSesion(usuario: string, password: string): Promise<Usuario> {
  const { data } = await api.post<{ token: string; user: Usuario }>('/auth/login', {
    usuario,
    password,
  });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
  return data.user;
}

export async function obtenerConstancia(consulta: string): Promise<Certificado | null> {
  const { data } = await api.get<{ found: boolean; constancia: Certificado }>(
    `/constancia/${encodeURIComponent(consulta)}`,
  );
  return data.found ? data.constancia : null;
}

export async function listarSolicitudes(): Promise<Solicitud[]> {
  const { data } = await api.get<{ solicitudes: Solicitud[] }>('/tramites/solicitudes');
  return data.solicitudes;
}

export async function listarCertificados(): Promise<Certificado[]> {
  const { data } = await api.get<{ certificados: Certificado[] }>('/tramites/certificados');
  return data.certificados;
}

// Traduce un error de Axios a un mensaje amigable en español.
export function mensajeError(
  error: unknown,
  fallback = 'No se pudo completar la operación. Intente de nuevo.',
): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { error?: string } | undefined;
    if (data?.error) return data.error;
    if (!error.response) return 'No hay conexión con el servidor.';
  }
  return fallback;
}
