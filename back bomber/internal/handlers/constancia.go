package handlers

import (
	"strings"

	"github.com/gofiber/fiber/v2"

	"backbomber/internal/store"
)

// Constancia agrupa los handlers de consulta pública de certificados.
type Constancia struct {
	store store.Store
}

func NewConstancia(s store.Store) *Constancia {
	return &Constancia{store: s}
}

// Get verifica una constancia por folio o RIF (público, sin token).
// GET /api/constancia/:folio  o  GET /api/constancia?rif=J-00000000-0
func (h *Constancia) Get(c *fiber.Ctx) error {
	query := strings.TrimSpace(c.Params("folio"))
	if query == "" {
		query = strings.TrimSpace(c.Query("rif"))
	}
	if query == "" {
		query = strings.TrimSpace(c.Query("q"))
	}
	query = strings.ToUpper(query)

	if query == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "indique el folio o el RIF a consultar"})
	}

	cert, found := h.store.FindConstancia(query)
	if !found {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"found": false,
			"error": "no se encontró ninguna constancia para esa consulta",
		})
	}

	return c.JSON(fiber.Map{
		"found":     true,
		"constancia": cert,
	})
}
