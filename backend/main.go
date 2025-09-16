package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"path/filepath"

	"fresherpaint/backend/db"
)

var database *db.Database

func main() {
	// Load configuration
	config := LoadConfig()

	// Initialize authentication system
	if err := InitializeAuth(); err != nil {
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
	http.HandleFunc("/api/health", corsMiddleware(healthCheckHandler))
	http.HandleFunc("/api/auth/login", corsMiddleware(loginHandler))
	
	// Protected routes (require authentication)
	http.HandleFunc("/api/auth/verify", corsMiddleware(authMiddleware(verifyTokenHandler)))
	http.HandleFunc("/api/analytics", corsMiddleware(authMiddleware(getAnalyticsDataHandler)))
	http.HandleFunc("/api/analytics/type", corsMiddleware(authMiddleware(getAnalyticsDataByTypeHandler)))

	// Start the server
	serverAddr := fmt.Sprintf(":%s", config.ServerPort)
	log.Printf("Server starting on http://localhost%s\n", serverAddr)
	log.Printf("Available endpoints:")
	log.Printf("  GET /api/health - Health check")
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
	
	log.Printf("Regenerating fresh sample data...")
	
	// Insert fresh sample data
	sampleDataSQL := `
-- Insert sample physics data
INSERT INTO analytics_data (title, description, data_type, data, created_at, updated_at) VALUES
('Quantum Mechanics Measurements', 'Experimental data from quantum state measurements', 'physics', 
 '{"measurements": [{"energy": 1.2, "time": 0.1}, {"energy": 1.5, "time": 0.2}, {"energy": 1.8, "time": 0.3}], "units": {"energy": "eV", "time": "ns"}}',
 '2025-09-10 10:00:00+00', '2025-09-14 15:30:00+00'),
('Particle Collision Data', 'High-energy particle collision analysis', 'physics',
 '{"collisions": [{"momentum": 150, "angle": 45}, {"momentum": 200, "angle": 30}, {"momentum": 180, "angle": 60}], "detector": "LHC", "energy_level": "14TeV"}',
 '2025-09-08 14:20:00+00', '2025-09-15 09:45:00+00');

-- Insert sample computer science data
INSERT INTO analytics_data (title, description, data_type, data, created_at, updated_at) VALUES
('Algorithm Performance Analysis', 'Runtime complexity measurements for sorting algorithms', 'computer_science',
 '{"algorithms": [{"name": "quicksort", "runtime": [0.1, 0.15, 0.12], "input_size": [1000, 5000, 10000]}, {"name":"bubble sort", "runtime": [0.09, 2.25, 50.15], "input_size": [1000, 5000, 10000]}, {"name": "mergesort", "runtime": [0.12, 0.18, 0.15], "input_size": [1000, 5000, 10000]}]}',
 '2025-09-05 11:15:00+00', '2025-09-12 16:20:00+00'),
('Network Traffic Analysis', 'Real-time network performance metrics', 'computer_science',
 '{"metrics": [{"timestamp": "2025-09-01T00:00:00Z", "bandwidth": 100, "latency": 20}, {"timestamp": "2025-09-01T01:00:00Z", "bandwidth": 150, "latency": 15}], "units": {"bandwidth": "Mbps", "latency": "ms"}}',
 '2025-09-07 13:45:00+00', '2025-09-15 11:30:00+00');
`
	
	_, err = database.GetDB().Exec(sampleDataSQL)
	if err != nil {
		return fmt.Errorf("failed to insert fresh sample data: %w", err)
	}
	
	log.Printf("Sample data regeneration completed successfully")
	return nil
}

func healthCheckHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"status": "ok"}`))
}
