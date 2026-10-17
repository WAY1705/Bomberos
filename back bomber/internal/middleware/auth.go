package middleware

import (
	"strings"

	"github.com/gofiber/fiber/v2"

	"backbomber/internal/store"
)

// UserIDKey es la clave donde se guarda el ID del usuario autenticado
// para que los handlers posteriores puedan usarlo.
const UserIDKey = "userID"

// RequireAuth protege las rutas privadas validando el token Bearer.
func RequireAuth(s store.Store) fiber.Handler {
	return func(c *fiber.Ctx) error {
		header := c.Get("Authorization")
		if header == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "token ausente"})
		}

		token := strings.TrimSpace(strings.TrimPrefix(header, "Bearer"))
		if token == "" {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "token inválido"})
		}

		userID, ok := s.ValidateToken(token)
		if !ok {
			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "token inválido o expirado"})
		}

		c.Locals(UserIDKey, userID)
		return c.Next()
	}
}
