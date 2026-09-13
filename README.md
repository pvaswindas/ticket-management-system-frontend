# TicSol — Ticket Management System Frontend

A single-page application (SPA) for support ticket tracking and user administration, built with React 19, Vite, and Tailwind CSS.

---

## Technical Stack

- **Core & Runtime**: React 19.0.0, React DOM 19.0.0, Vite 6.2.2
- **Routing**: React Router DOM 7.4.0
- **State & Networking**: Axios 1.8.4, JWT Decode 4.0.0, React Context API
- **Form Handling & Validation**: React Hook Form 7.54.2, Zod 3.24.2 (`@hookform/resolvers` 4.1.3)
- **UI & Styling**: Tailwind CSS 4.0.15 (`@tailwindcss/vite`), Material-UI 6.4.8, Emotion 11.14.0, Framer Motion 12.5.0, Lucide React 0.483.0
- **Data Visualization**: React ApexCharts 1.7.0

---

## Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Installation & Environment Setup

1. **Clone the repository & install dependencies**:
   ```bash
   git clone <repository-url>
   cd ticsol_frontend
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/
   ```

### Development Scripts

```bash
# Start local development server
npm run dev

# Run ESLint check
npm run lint

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Project Structure

```
src/
├── components/     # UI components (Admin, Common, Landing, Ticket Details, User)
├── context/        # Global AuthContext & JWT session handling
├── hooks/          # Custom hooks (useDashboardData, useLogout)
├── layouts/        # Application shell layout (MainLayout)
├── pages/          # Views (Admin, Auth, Common, Shared, User)
├── routes/         # Router configuration & route guards
├── services/       # Axios instance & REST API service clients
└── utils/          # Navigation helpers and date formatters
```

---

## License & Author
- **Author**: Aswin Das P V