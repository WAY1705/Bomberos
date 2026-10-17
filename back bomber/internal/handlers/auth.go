package handlers

import (
	"github.com/gofiber/fiber/v2"

	"backbomber/internal/middleware"
	"backbomber/internal/models"
	"backbomber/internal/store"
)

// Auth agrupa los handlers de autenticación.
type Auth struct {
	store store.Store
}

func NewAuth(s store.Store) *Auth {
	return &Auth{store: s}
}

// Login valida credenciales y emite un token de sesión.
// POST /api/auth/login
func (h *Auth) Login(c *fiber.Ctx) error {
	var req models.LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "cuerpo inválido"})
	}

	if req.Usuario == "" || req.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "usuario y contraseña son obligatorios"})
	}

	user, ok := h.store.FindUser(req.Usuario)
	if !ok || user.Password != req.Password {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "credenciales incorrectas"})
	}

	token, err := h.store.CreateToken(user.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "no se pudo crear la sesión"})
	}

	return c.JSON(models.LoginResponse{Token: token, User: user})
}

// Me devuelve el usuario de la sesión actual (requiere token).
// GET /api/auth/me
func (h *Auth) Me(c *fiber.Ctx) error {
	return c.JSON(fiber.Map{"userID": c.Locals(middleware.UserIDKey)})
}
