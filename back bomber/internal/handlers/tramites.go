package handlers

import (
	"fmt"
	"strconv"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"

	"backbomber/internal/models"
	"backbomber/internal/store"
)

// Tasa arancelaria por clasificación de riesgo (Bs/m² por unidad).
var tasaRiesgo = map[string]float64{"Bajo": 1.5, "Medio": 2.5, "Alto": 4}

// Tramites agrupa los handlers de gestión de trámites (protegidos).
type Tramites struct {
	store store.Store
}

func NewTramites(s store.Store) *Tramites {
	return &Tramites{store: s}
}

// ListSolicitudes devuelve el listado de expedientes.
// GET /api/tramites/solicitudes
func (h *Tramites) ListSolicitudes(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{
		"total":       len(h.store.ListSolicitudes()),
		"solicitudes": h.store.ListSolicitudes(),
	})
}

// CreateSolicitud registra una nueva solicitud (RF-02) y calcula el arancel.
// POST /api/tramites/solicitudes
func (h *Tramites) CreateSolicitud(c *fiber.Ctx) error {
	var req models.NuevaSolicitudRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cuerpo inválido"})
	}

	if req.Empresa == "" || req.RIF == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "empresa y RIF son obligatorios"})
	}
	if req.Superficie <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "la superficie debe ser mayor que cero"})
	}

	tasa, ok := tasaRiesgo[req.Riesgo]
	if !ok {
		tasa = tasaRiesgo["Medio"]
	}
	arancel := req.Superficie * tasa * 10

	sol := models.Solicitud{
		ID:      fmt.Sprintf("EXP-%d", 1046+len(h.store.ListSolicitudes())),
		Fecha:   time.Now().Format("02/01/2006"),
		Empresa: strings.TrimSpace(req.Empresa),
		RIF:     strings.TrimSpace(req.RIF),
		Estatus: "En Revisión",
	}

	created, err := h.store.CreateSolicitud(sol)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"solicitud": created,
		"arancel":   strconv.FormatFloat(arancel, 'f', 2, 64),
	})
}

// ListCertificados devuelve el historial de certificaciones.
// GET /api/tramites/certificados
func (h *Tramites) ListCertificados(c *fiber.Ctx) error {
	certs := h.store.ListCertificados()
	return c.JSON(fiber.Map{
		"total":        len(certs),
		"certificados": certs,
	})
}
