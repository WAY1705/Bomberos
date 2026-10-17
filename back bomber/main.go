package main

import (
	"log"

	"github.com/gofiber/fiber/v2"

	"backbomber/internal/config"
	"backbomber/internal/routes"
	"backbomber/internal/store"
)

func main() {
	cfg := config.Load()

	// Capa de datos. Hoy en memoria; para conectar MySQL bastará con
	// construir otra implementación de store.Store y pasarla aquí.
	s := store.NewInMemoryStore()

	app := fiber.New(fiber.Config{
		AppName:      "FBBV Backend v1.0",
		ServerHeader: "FBBV",
	})

	routes.Register(app, s)

	log.Printf("FBBV backend escuchando en http://localhost:%s", cfg.Port)
	if err := app.Listen(":" + cfg.Port); err != nil {
		log.Fatalf("error al iniciar el servidor: %v", err)
	}
}
