package main

import (
	"encoding/json"
	"net/http"
	"fresherpaint/backend/models"
)

type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty"`
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func getAnalyticsDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Query the database for all analytics data
	data, err := queryAnalyticsData("")
	if err != nil {
		response := APIResponse{
			Success: false,
			Error:   "Failed to fetch analytics data: " + err.Error(),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := APIResponse{
		Success: true,
		Data:    data,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func getAnalyticsDataByTypeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	dataType := r.URL.Query().Get("type")
	if dataType == "" {
		http.Error(w, "Missing type parameter", http.StatusBadRequest)
		return
	}

	// Query the database with the type filter
	data, err := queryAnalyticsData(dataType)
	if err != nil {
		response := APIResponse{
			Success: false,
			Error:   "Failed to fetch analytics data: " + err.Error(),
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	response := APIResponse{
		Success: true,
		Data:    data,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// queryAnalyticsData queries the database for analytics data, optionally filtered by type
func queryAnalyticsData(dataType string) ([]models.AnalyticsData, error) {
	var query string
	var args []interface{}

	if dataType == "" {
		query = "SELECT id, title, description, data_type, data, created_at, updated_at FROM analytics_data ORDER BY created_at DESC"
	} else {
		query = "SELECT id, title, description, data_type, data, created_at, updated_at FROM analytics_data WHERE data_type = $1 ORDER BY created_at DESC"
		args = append(args, dataType)
	}

	rows, err := database.GetDB().Query(query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []models.AnalyticsData
	for rows.Next() {
		var item models.AnalyticsData
		var dataJSON []byte

		err := rows.Scan(
			&item.ID,
			&item.Title,
			&item.Description,
			&item.DataType,
			&dataJSON,
			&item.CreatedAt,
			&item.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		// Parse the JSON data
		err = json.Unmarshal(dataJSON, &item.Data)
		if err != nil {
			return nil, err
		}

		results = append(results, item)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return results, nil
}
