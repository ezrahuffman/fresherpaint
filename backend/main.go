package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"
	"time"

	"fresherpaint/backend/db"
)

var database *db.Database

func main() {
	// Load configuration
	config := LoadConfig()

	// Initialize authentication system
	if err := InitializeAuth(config); err != nil {
		log.Fatalf("Failed to initialize authentication: %v", err)
	}

	// Initialize database connection
	dbConfig := &db.Config{
		DBHost:     config.DBHost,
		DBPort:     config.DBPort,
		DBUser:     config.DBUser,
		DBPassword: config.DBPassword,
		DBName:     config.DBName,
	}

	var err error
	database, err = db.NewDatabase(dbConfig)
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	defer database.Close()

	log.Printf("Connected to database successfully")

	// Run database migrations
	if err := runMigrations(); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	// Clean up and regenerate sample data
	if err := cleanupAndRegenerateData(); err != nil {
		log.Fatalf("Failed to cleanup and regenerate data: %v", err)
	}

	// Setup routes
	// Public routes
	http.HandleFunc("/health", corsMiddleware(healthCheckHandler))
	http.HandleFunc("/api/auth/login", corsMiddleware(loginHandler))

	// Protected routes (require authentication)
	http.HandleFunc("/api/auth/verify", corsMiddleware(authMiddleware(verifyTokenHandler)))
	http.HandleFunc("/api/analytics", corsMiddleware(authMiddleware(getAnalyticsDataHandler)))
	http.HandleFunc("/api/analytics/type", corsMiddleware(authMiddleware(getAnalyticsDataByTypeHandler)))

	// Start the server
	serverAddr := fmt.Sprintf(":%s", config.ServerPort)
	log.Printf("Server starting on http://localhost%s\n", serverAddr)
	log.Printf("Available endpoints:")
	log.Printf("  GET /health - Health check")
	log.Printf("  POST /api/auth/login - User authentication")
	log.Printf("  POST /api/auth/verify - Verify JWT token (protected)")
	log.Printf("  GET /api/analytics - Get all analytics data (protected)")
	log.Printf("  GET /api/analytics/type?type=physics|computer_science - Get filtered data (protected)")

	if err := http.ListenAndServe(serverAddr, nil); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func runMigrations() error {
	log.Printf("Running database migrations...")

	// Read the migration file
	migrationPath := filepath.Join("migrations", "001_initial_schema.sql")
	migrationSQL, err := ioutil.ReadFile(migrationPath)
	if err != nil {
		return fmt.Errorf("failed to read migration file: %w", err)
	}

	// Execute the migration
	_, err = database.GetDB().Exec(string(migrationSQL))
	if err != nil {
		return fmt.Errorf("failed to execute migration: %w", err)
	}

	log.Printf("Database migrations completed successfully")
	return nil
}

func cleanupAndRegenerateData() error {
	log.Printf("Cleaning up existing sample data...")

	// Delete all existing sample data
	_, err := database.GetDB().Exec("DELETE FROM analytics_data")
	if err != nil {
		return fmt.Errorf("failed to cleanup existing data: %w", err)
	}

	log.Printf("Generating real-world datasets...")

	// Generate real physics datasets
	physicsDatasets, err := generateRealPhysicsData()
	if err != nil {
		return fmt.Errorf("failed to generate physics data: %w", err)
	}

	// Generate real computer science datasets
	csDatasets, err := generateRealCSData()
	if err != nil {
		return fmt.Errorf("failed to generate CS data: %w", err)
	}

	// Insert physics datasets
	for _, dataset := range physicsDatasets {
		if err := insertDataset(dataset); err != nil {
			return fmt.Errorf("failed to insert physics dataset: %w", err)
		}
	}

	// Insert computer science datasets
	for _, dataset := range csDatasets {
		if err := insertDataset(dataset); err != nil {
			return fmt.Errorf("failed to insert CS dataset: %w", err)
		}
	}

	log.Printf("Real-world data generation completed successfully")
	return nil
}

// insertDataset inserts a single dataset into the database
func insertDataset(dataset map[string]interface{}) error {
	// Convert data to JSON
	dataJSON, err := json.Marshal(dataset["data"])
	if err != nil {
		return fmt.Errorf("failed to marshal data to JSON: %w", err)
	}

	// Set timestamps
	now := time.Now()
	createdAt := now.Add(-time.Duration(len(dataset)) * 24 * time.Hour) // Stagger creation dates
	updatedAt := now

	// Insert into database
	query := `
		INSERT INTO analytics_data (title, description, data_type, data, created_at, updated_at) 
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	_, err = database.GetDB().Exec(
		query,
		dataset["title"],
		dataset["description"],
		dataset["data_type"],
		dataJSON,
		createdAt,
		updatedAt,
	)

	if err != nil {
		return fmt.Errorf("failed to insert dataset into database: %w", err)
	}

	return nil
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "healthy"}`))
}
