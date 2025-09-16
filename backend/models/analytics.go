package models

import (
	"database/sql"
	"time"
)

type AnalyticsType string

const (
	AnalyticsTypePhysics   AnalyticsType = "physics"
	AnalyticsTypeCS        AnalyticsType = "computer_science"
)

type AnalyticsData struct {
	ID          string        `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	DataType    AnalyticsType `json:"data_type"`
	Data        interface{}   `json:"data"`
	CreatedAt   time.Time     `json:"created_at"`
	UpdatedAt   time.Time     `json:"updated_at"`
}

type AnalyticsDataDB struct {
	ID          string       `db:"id"`
	Title       string       `db:"title"`
	Description string       `db:"description"`
	DataType    string       `db:"data_type"`
	Data        []byte       `db:"data"`
	CreatedAt   time.Time    `db:"created_at"`
	UpdatedAt   sql.NullTime `db:"updated_at"`
}
