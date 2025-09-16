# FresherPaint

A modern analytics platform for physics and computer science data visualization.

## Project Structure

```
fresherpaint/
├── backend/           # Go backend server
├── frontend/          # React/TypeScript frontend
└── docs/             # Project documentation
```

## Tech Stack

- **Backend**: Go 1.21+
- **Frontend**: React 18, TypeScript, Vite
- **Database**: PostgreSQL 15+
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Data Visualization**: Recharts

## Getting Started

### Prerequisites

- Go 1.21+
- Node.js 18+
- PostgreSQL 15+
- Git

### Installation

1. Clone the repository
2. Set up the backend:
   ```bash
   cd backend
   go mod download
   ```
3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Development

1. Start the backend server:
   ```bash
   cd backend
   go run main.go
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## Color Scheme

- **Primary**: White (#FFFFFF)
- **Secondary**: Dark Blue (#1E3A8A)
- **Accent**: Red (#DC2626)

## License

MIT
