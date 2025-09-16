-- Initial schema for FresherPaint analytics platform
-- Create analytics_data table
CREATE TABLE IF NOT EXISTS analytics_data (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    data_type VARCHAR(50) NOT NULL CHECK (data_type IN ('physics', 'computer_science')),
    data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_data_type ON analytics_data(data_type);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_data(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_data_gin ON analytics_data USING GIN (data);

-- Sample data is now handled by the cleanupAndRegenerateData() function in main.go
-- This ensures fresh data on each server restart without duplicates
