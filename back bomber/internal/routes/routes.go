package routes

import (
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"

	"backbomber/internal/handlers"
	"backbomber/internal/middleware"
	"backbomber/internal/store"
)

// Register monta todas las rutas del monolito.
func Register(app *fiber.App, s store.Store) {
	// CORS para permitir el frontend de Vite (localhost:5173).
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173,http://127.0.0.1:5173",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
	}))

	app.Use(recover.New())
	app.Use(logger.New(logger.Config{
		Format: "${time} ${status} ${method} ${path}\n",
	}))

	api := app.Group("/api")

	// Salud del servidor.
	api.Get("/health", func(c *fiber.Ctx) error {
		return c.JSON(fiber.Map{"status": "ok", "time": time.Now().Format(time.RFC3339)})
	})

	auth := handlers.NewAuth(s)
	tramites := handlers.NewTramites(s)
	constancia := handlers.NewConstancia(s)

	// Público.
	api.Post("/auth/login", auth.Login)
	api.Get("/constancia/:folio", constancia.Get)
	api.Get("/constancia", constancia.Get)

	// Protegidos (requieren Authorization: Bearer <token>).
	priv := api.Group("", middleware.RequireAuth(s))
	priv.Get("/auth/me", auth.Me)
	priv.Get("/tramites/solicitudes", tramites.ListSolicitudes)
	priv.Post("/tramites/solicitudes", tramites.CreateSolicitud)
	priv.Get("/tramites/certificados", tramites.ListCertificados)
}
