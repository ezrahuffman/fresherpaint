package main

import (
	"log"
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type Config struct {
	ServerPort   string
	DBHost       string
	DBPort       string
	DBUser       string
	DBPassword   string
	DBName       string
	JWTSecret    string
	SitePassword string
}

func LoadConfig() *Config {
	// Load environment variables from .env file
	if err := godotenv.Load(); err != nil {
		log.Printf("Warning: .env file not found or could not be loaded: %v", err)
	}

	// Check for Render's DATABASE_URL first
	if databaseURL := os.Getenv("DATABASE_URL"); databaseURL != "" {
		return parsePostgresURL(databaseURL)
	}

	// Set default values for local development
	config := &Config{
		ServerPort:   getEnv("PORT", getEnv("SERVER_PORT", "8080")), // Render uses PORT
		DBHost:       getEnv("DB_HOST", "localhost"),
		DBPort:       getEnv("DB_PORT", "5432"),
		DBUser:       getEnv("DB_USER", "fresherpaint"),
		DBPassword:   getEnv("DB_PASSWORD", "password"),
		DBName:       getEnv("DB_NAME", "fresherpaint"),
		JWTSecret:    getEnv("JWT_SECRET", ""),
		SitePassword: getEnv("SITE_PASSWORD", "source.tide.white"),
	}
	return config
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// parsePostgresURL parses a PostgreSQL URL and returns a Config
func parsePostgresURL(databaseURL string) *Config {
	u, err := url.Parse(databaseURL)
	if err != nil {
		log.Printf("Error parsing DATABASE_URL: %v", err)
		return &Config{
			ServerPort: getEnv("PORT", "8080"),
			DBHost:     "localhost",
			DBPort:     "5432",
			DBUser:     "fresherpaint",
			DBPassword: "password",
			DBName:     "fresherpaint",
		}
	}

	password, _ := u.User.Password()
	host := u.Hostname()
	port := u.Port()
	if port == "" {
		port = "5432"
	}
	dbname := strings.TrimPrefix(u.Path, "/")

	return &Config{
		ServerPort:   getEnv("PORT", "8080"),
		DBHost:       host,
		DBPort:       port,
		DBUser:       u.User.Username(),
		DBPassword:   password,
		DBName:       dbname,
		JWTSecret:    getEnv("JWT_SECRET", ""),
		SitePassword: getEnv("SITE_PASSWORD", "source.tide.white"),
	}
}
