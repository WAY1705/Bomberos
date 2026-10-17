package store

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"sync"
	"time"

	"backbomber/internal/models"
)

// Store define el contrato de datos del monolito. Hoy lo implementa una
// versión en memoria; más adelante una implementación MySQL (u otra SQL)
// podrá reemplazarla sin tocar los handlers ni las rutas.
type Store interface {
	// Auth
	FindUser(usuario string) (models.Usuario, bool)
	CreateToken(userID int) (string, error)
	ValidateToken(token string) (int, bool)

	// Trámites
	ListSolicitudes() []models.Solicitud
	CreateSolicitud(s models.Solicitud) (models.Solicitud, error)
	ListCertificados() []models.Certificado

	// Constancia (consulta pública)
	FindConstancia(query string) (models.Certificado, bool)
}

type tokenRecord struct {
	userID    int
	expiresAt time.Time
}

// InMemoryStore es una implementación de Store respaldada por memoria,
// con datos semilla equivalentes a los del frontend.
type InMemoryStore struct {
	mu           sync.RWMutex
	users        []models.Usuario
	solicitudes  []models.Solicitud
	certificados []models.Certificado
	tokens       map[string]tokenRecord
	tokenTTL     time.Duration
}

func NewInMemoryStore() *InMemoryStore {
	return &InMemoryStore{
		users: []models.Usuario{
			{ID: 1, Usuario: "capitan", Password: "fbbv2026", Nombre: "Cap. Javier Vargas", Rol: "Comando"},
			{ID: 2, Usuario: "analista", Password: "fbbv2026", Nombre: "Honimer Cabeza", Rol: "Analista Electromecánico"},
		},
		solicitudes: []models.Solicitud{
			{ID: "EXP-1045", Fecha: "23/07/2026", Empresa: "Panadería El Trigal C.A.", RIF: "J-30456123-1", Estatus: "En Revisión"},
			{ID: "EXP-1044", Fecha: "22/07/2026", Empresa: "Ferretería Monagas", RIF: "J-40112233-5", Estatus: "Solvente"},
			{ID: "EXP-1042", Fecha: "20/07/2026", Empresa: "Clínica Maturín S.A.", RIF: "J-09876543-2", Estatus: "Inspección Programada"},
			{ID: "EXP-1039", Fecha: "15/07/2026", Empresa: "Automercados Bicentenario", RIF: "J-11223344-0", Estatus: "Rechazada"},
		},
		certificados: []models.Certificado{
			{Folio: "FBBV-1044-CF", Empresa: "Ferretería Monagas", RIF: "J-40112233-5", Tipo: "Conformidad Técnica", Riesgo: "Medio", Superficie: "320 m²", Emitido: "22/07/2026", Vence: "22/07/2027", Estado: "Vigente", Resolucion: "Res. N.º 1044-2026 — Comando Operativo"},
			{Folio: "FBBV-1036-CF", Empresa: "Hotel Los Guaritos", RIF: "J-31567890-4", Tipo: "Conformidad Técnica", Riesgo: "Alto", Superficie: "780 m²", Emitido: "15/07/2026", Vence: "15/07/2027", Estado: "Vigente", Resolucion: "Res. N.º 1036-2026 — Comando Operativo"},
			{Folio: "FBBV-1035-RN", Empresa: "Clínica Maturín S.A.", RIF: "J-09876543-2", Tipo: "Aprobación de Vigencia", Riesgo: "Alto", Superficie: "540 m²", Emitido: "21/07/2026", Vence: "21/07/2027", Estado: "Vigente", Resolucion: "Res. N.º 1035-2026 — División Técnica"},
			{Folio: "FBBV-1032-RV", Empresa: "Automercados Bicentenario", RIF: "J-11223344-0", Tipo: "Conformidad Técnica", Riesgo: "Medio", Superficie: "900 m²", Emitido: "03/06/2024", Vence: "03/06/2025", Estado: "Revocado", Resolucion: "Res. N.º 1032-R — Incumplimiento de norma de evacuación"},
			{Folio: "FBBV-1024-RN", Empresa: "Inversiones Los Pinos C.A.", RIF: "J-28776655-3", Tipo: "Aprobación de Vigencia", Riesgo: "Bajo", Superficie: "150 m²", Emitido: "08/07/2024", Vence: "08/07/2025", Estado: "Vencida", Resolucion: "Res. N.º 1024-2024 — División Técnica"},
		},
		tokens:   make(map[string]tokenRecord),
		tokenTTL: 8 * time.Hour,
	}
}

// --- Auth ---

func (s *InMemoryStore) FindUser(usuario string) (models.Usuario, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, u := range s.users {
		if u.Usuario == usuario {
			return u, true
		}
	}
	return models.Usuario{}, false
}

func (s *InMemoryStore) CreateToken(userID int) (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", err
	}
	token := hex.EncodeToString(b)

	s.mu.Lock()
	defer s.mu.Unlock()
	s.tokens[token] = tokenRecord{userID: userID, expiresAt: time.Now().Add(s.tokenTTL)}
	return token, nil
}

func (s *InMemoryStore) ValidateToken(token string) (int, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	rec, ok := s.tokens[token]
	if !ok || time.Now().After(rec.expiresAt) {
		return 0, false
	}
	return rec.userID, true
}

// --- Trámites ---

func (s *InMemoryStore) ListSolicitudes() []models.Solicitud {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]models.Solicitud, len(s.solicitudes))
	copy(out, s.solicitudes)
	return out
}

func (s *InMemoryStore) CreateSolicitud(sol models.Solicitud) (models.Solicitud, error) {
	if sol.Empresa == "" || sol.RIF == "" {
		return models.Solicitud{}, errors.New("empresa y RIF son obligatorios")
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	s.solicitudes = append(s.solicitudes, sol)
	return sol, nil
}

func (s *InMemoryStore) ListCertificados() []models.Certificado {
	s.mu.RLock()
	defer s.mu.RUnlock()
	out := make([]models.Certificado, len(s.certificados))
	copy(out, s.certificados)
	return out
}

// --- Constancia (consulta pública) ---

func (s *InMemoryStore) FindConstancia(query string) (models.Certificado, bool) {
	s.mu.RLock()
	defer s.mu.RUnlock()
	for _, c := range s.certificados {
		if c.Folio == query || c.RIF == query {
			return c, true
		}
	}
	return models.Certificado{}, false
}
