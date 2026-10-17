package config

import "os"

// Config centraliza la configuración del monolito. Las variables DB_*
// quedan listas para cuando se conecte MySQL en el futuro.
type Config struct {
	Port string

	// Reservas para la futura conexión a MySQL.
	DBDriver string
	DBDSN    string
}

func Load() Config {
	return Config{
		Port:     getEnv("PORT", "8080"),
		DBDriver: getEnv("DB_DRIVER", "mysql"),
		DBDSN:    getEnv("DB_DSN", "user:password@tcp(127.0.0.1:3306)/fbbv?parseTime=true"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
