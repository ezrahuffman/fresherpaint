package main

import (
	"crypto/rand"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

// AuthConfig holds authentication configuration
type AuthConfig struct {
	JWTSecret    string
	PasswordHash string
}

// LoginRequest represents the login request payload
type LoginRequest struct {
	Password string `json:"password"`
}

// LoginResponse represents the login response
type LoginResponse struct {
	Token     string `json:"token"`
	ExpiresAt int64  `json:"expires_at"`
}

// JWTClaims represents the JWT token claims
type JWTClaims struct {
	UserID string `json:"user_id"`
	jwt.RegisteredClaims
}

var authConfig *AuthConfig

// InitializeAuth initializes the authentication system
func InitializeAuth() error {
	// Generate a secure JWT secret if not provided via environment
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		// Generate a random 32-byte secret
		bytes := make([]byte, 32)
		if _, err := rand.Read(bytes); err != nil {
			return fmt.Errorf("failed to generate JWT secret: %w", err)
		}
		jwtSecret = hex.EncodeToString(bytes)
		fmt.Printf("Generated JWT secret (set JWT_SECRET env var in production): %s\n", jwtSecret)
	}

	// Hash the password (in production, this should be stored securely)
	password := os.Getenv("SITE_PASSWORD")
	if password == "" {
		password = "source.tide.white" // Default password, should be changed in production
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("failed to hash password: %w", err)
	}

	authConfig = &AuthConfig{
		JWTSecret:    jwtSecret,
		PasswordHash: string(hashedPassword),
	}

	return nil
}

// loginHandler handles user authentication
func loginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		response := APIResponse{
			Success: false,
			Error:   "Invalid request body",
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	// Verify password
	if err := bcrypt.CompareHashAndPassword([]byte(authConfig.PasswordHash), []byte(loginReq.Password)); err != nil {
		response := APIResponse{
			Success: false,
			Error:   "Invalid credentials",
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusUnauthorized)
		json.NewEncoder(w).Encode(response)
		return
	}

	// Generate JWT token
	expiresAt := time.Now().Add(24 * time.Hour) // Token expires in 24 hours
	claims := &JWTClaims{
		UserID: "fresherpaint_user",
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expiresAt),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "fresherpaint",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString([]byte(authConfig.JWTSecret))
	if err != nil {
		response := APIResponse{
			Success: false,
			Error:   "Failed to generate token",
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(response)
		return
	}

	loginResp := LoginResponse{
		Token:     tokenString,
		ExpiresAt: expiresAt.Unix(),
	}

	response := APIResponse{
		Success: true,
		Data:    loginResp,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// authMiddleware validates JWT tokens for protected routes
func authMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			response := APIResponse{
				Success: false,
				Error:   "Authorization header required",
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
			return
		}

		// Extract token from "Bearer <token>" format
		tokenParts := strings.Split(authHeader, " ")
		if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
			response := APIResponse{
				Success: false,
				Error:   "Invalid authorization header format",
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
			return
		}

		tokenString := tokenParts[1]

		// Parse and validate token
		token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(authConfig.JWTSecret), nil
		})

		if err != nil {
			response := APIResponse{
				Success: false,
				Error:   "Invalid token",
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
			return
		}

		if !token.Valid {
			response := APIResponse{
				Success: false,
				Error:   "Token is not valid",
			}
			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(http.StatusUnauthorized)
			json.NewEncoder(w).Encode(response)
			return
		}

		// Token is valid, proceed to the next handler
		next(w, r)
	}
}

// verifyTokenHandler verifies if a token is still valid
func verifyTokenHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// If we reach here, the token is valid (verified by authMiddleware)
	response := APIResponse{
		Success: true,
		Data:    map[string]string{"status": "valid"},
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
