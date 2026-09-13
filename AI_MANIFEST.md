# AI Manifest & Codebase Context Specification

> **System Target**: Machine-readable context document for LLMs and automated technical tools.
> **Repository**: `ticsol_frontend` (Project Name: `client`)
> **System Purpose**: Role-based Ticket Management System Frontend (React 19 SPA)
> **Specification Version**: 1.0.0

---

## 1. System Architecture & Data Flow

### 1.1 High-Level Architecture
`ticsol_frontend` is a client-side Single Page Application (SPA) constructed with React 19 and Vite 6. The architecture relies on declarative routing (`react-router-dom` v7), JWT-based stateless authentication, dynamic context state propagation (`AuthContext`), and modular API service layers (`axios`).

```
[ Browser / User Interface ]
            │
            ▼
[ Router Layer (react-router-dom v7) ]
  ├── RestrictedRoute (Unauthenticated / Public)
  ├── ProtectedRoute (Authenticated Users)
  └── AdminOnlyRoute (Role: Admin)
            │
            ▼
[ View Layer (Pages & Layouts) ] ◄──► [ React Context (AuthContext) ]
  ├── MainLayout (Sidebar / Navbar)             │ LocalStorage (JWT tokens)
  ├── User Pages (Dashboard, Tickets)           │ Status Check / Refresh Queue
  └── Admin Pages (Analytics, Users)            ▼
            │                         [ Axios Interceptor Layer ]
            └─────────────────────────►  ├── Request Header Injector
                                         └── 401 Auto-Refresh Queue
                                                    │
                                                    ▼
                                      [ External REST API Backend ]
```

### 1.2 Route & Authentication Flow
- **Application Bootstrap**: `index.html` mounts `/src/main.jsx`, which renders `<App />`.
- **Global Context & Layout**: `<App />` wraps the root router within `<AuthProvider>` (`src/context/AuthContext.jsx`) to enforce global authentication state propagation across all routes.
- **Route Guard Hierarchy**:
  - `RestrictedRoute`: Wraps guest pages (`/` Landing, `/login` Login). If an authenticated session exists, it redirects regular users to `/dashboard` and admins to `/admin`.
  - `ProtectedRoute`: Wraps user workspace routes (`/dashboard`, `/create-tickets`, `/tickets`, `/tickets/:id`). Redirects unauthenticated users or users with `userStatus === 'suspended'` to `/login`. Redirects admins to `/admin` unless `adminAllowed` is enabled.
  - `AdminOnlyRoute`: Wraps administrative routes (`/admin`, `/admin/create-user`, `/admin/users`, `/admin/tickets`, `/admin/tickets/:id`). Enforces `role === 'admin'`. Redirects non-admin authenticated users to `/`.

### 1.3 Token Refresh & Session Lifecycle Logic
1. **Token Persistence**: Tokens are stored in `localStorage` as `ACCESS_TOKEN` and `REFRESH_TOKEN`.
2. **Initial Validation**: Upon mounting, `AuthContext` calls `validateToken()`. It decodes `ACCESS_TOKEN` using `jwt-decode` to verify expiration (`exp`). If unexpired, it queries `GET auth/status/` to fetch current account status (`active` or `suspended`) and role (`user` or `admin`).
3. **Periodic Health Check**: `AuthContext` executes `checkUserStatus()` every 5 minutes (`300,000 ms`). If the backend returns `userStatus === 'suspended'`, session termination is triggered immediately.
4. **Axios 401 Interceptor Queue**:
   - All HTTP traffic uses `axiosInstance` (`src/services/axiosInstance.jsx`).
   - On a `401 Unauthorized` response, the interceptor sets `isRefreshing = true` and queues pending requests into `refreshQueue`.
   - It issues a `POST auth/token/refresh/` request with `{ refresh: REFRESH_TOKEN }`.
   - Upon successful refresh, `ACCESS_TOKEN` and `REFRESH_TOKEN` are updated in `localStorage`, and queued requests are re-executed with the new `Bearer` header.
   - Upon refresh failure, `localStorage` tokens are purged and a custom DOM event (`auth:logout`) is dispatched to trigger application-wide state reset.

---

## 2. Core Modules & Directory Layout

### 2.1 File Map

```
/home/aswin/code/broto/ticsol_frontend/
├── .gitignore                                 # Git exclusion rules
├── README.md                                  # Human-readable documentation
├── AI_MANIFEST.md                             # AI context specification
├── eslint.config.js                           # ESLint v9 configuration
├── index.html                                 # HTML5 entry point & root mount node
├── package.json                               # Dependencies & npm scripts
├── package-lock.json                          # Lockfile for dependency tree
├── vercel.json                                # SPA URL rewrite configuration for Vercel
├── vite.config.js                             # Vite configuration & path aliases (@ -> src)
├── public/
│   └── images/
│       ├── ticsol-landing-preview.png         # Landing page preview asset
│       └── ticsol-user-dashboard-preview.png  # User dashboard preview asset
└── src/
    ├── App.jsx                                # Root component, body style setup & Provider wrapper
    ├── index.css                              # Tailwind CSS v4 setup, color theme, scrollbar hides
    ├── main.jsx                               # React DOM root render entry
    ├── components/
    │   ├── AlertSnackbar.jsx                  # Material-UI Snackbar alert wrapper
    │   ├── Logo.jsx                           # Application branding logo component
    │   ├── admin/
    │   │   ├── ChartCard.jsx                  # Container wrapper for dashboard charts
    │   │   ├── DashboardLayout.jsx            # Loading/error state shell for admin dashboard
    │   │   ├── RecentTicketsTable.jsx         # Compact admin recent tickets table
    │   │   ├── StatCard.jsx                   # Metric indicator card with growth percentage
    │   │   ├── TicketPriorityChart.jsx        # Donut chart for priority distribution
    │   │   ├── TicketStatusChart.jsx          # Donut chart for status breakdown
    │   │   ├── TicketTrendsChart.jsx          # Area chart for ticket creation over time
    │   │   ├── UserActivityWidget.jsx         # User activity score & active/inactive breakdown
    │   │   ├── UserGrowthChart.jsx            # Bar chart for user registration trends
    │   │   └── create-user/
    │   │       └── UserFormPanel.jsx          # Admin form for user creation
    │   ├── common/
    │   │   ├── InfoPanel.jsx                  # Sidebar graphic panel for forms
    │   │   ├── manage-tickets/
    │   │   │   ├── BatchActions.jsx           # Selection/batch controls for ticket tables
    │   │   │   ├── Pagination.jsx             # Previous/Next pagination controller
    │   │   │   ├── PriorityIndicator.jsx      # Visual badge for ticket priority (low/medium/high)
    │   │   │   └── StatusPill.jsx             # Visual badge for status (open/in-progress/resolved)
    │   │   ├── navigation/
    │   │   │   ├── BottomBar.jsx              # Mobile bottom navigation bar
    │   │   │   ├── Navbar.jsx                 # Top bar with title display & logout toggle
    │   │   │   └── Sidebar.jsx                # Desktop collapsible navigation sidebar
    │   │   └── table/
    │   │       ├── TabFilter.jsx              # Tabbed status filter navigation
    │   │       └── TicketTable.jsx            # Main interactive ticket data table
    │   ├── landing/
    │   │   ├── ContactSection.jsx             # Landing page contact callout
    │   │   ├── FeatureCard.jsx                # Feature item renderer card
    │   │   ├── FeaturesSection.jsx            # Platform highlights grid
    │   │   ├── Footer.jsx                     # Landing page footer section
    │   │   ├── HeroSection.jsx                # Primary call-to-action hero banner
    │   │   └── IntegrationSection.jsx         # Technology partner icons grid
    │   ├── ticket-details/
    │   │   ├── LoadingState.jsx               # Skeleton loading indicator for ticket detail
    │   │   ├── NotFoundState.jsx              # 404/Not found state view
    │   │   ├── TicketActions.jsx              # Action buttons for ticket state operations
    │   │   ├── TicketAssigneeForm.jsx         # Form for assigning ticket to agent/user
    │   │   ├── TicketDetailHeader.jsx         # Navigation header for ticket detail page
    │   │   ├── TicketForm.jsx                 # Edit form for title, description & priority
    │   │   └── TicketViewMode.jsx             # Read-only viewer for ticket attributes
    │   └── user/
    │       ├── create-ticket/
    │       │   ├── SuccessMessage.jsx         # Submission success banner
    │       │   └── TicketFormPanel.jsx        # Ticket creation input form
    │       └── dashboard/
    │           ├── Header.jsx                 # User dashboard title header
    │           ├── StatCard.jsx               # Individual ticket stat widget
    │           └── StatsRow.jsx               # Metrics row container
    ├── context/
    │   └── AuthContext.jsx                    # Auth state provider & session management
    ├── hooks/
    │   ├── useDashboardData.jsx               # Custom hook for fetching admin stats
    │   └── useLogout.jsx                      # Custom hook providing logout helper function
    ├── layouts/
    │   └── MainLayout.jsx                     # Application layout container with Navbar & Sidebar
    ├── pages/
    │   ├── admin/
    │   │   ├── AddNewUser.jsx                 # Admin view for user creation
    │   │   ├── AdminDashboard.jsx             # Admin metrics & analytics dashboard
    │   │   └── UserManagement.jsx             # Admin user list management & active toggle
    │   ├── auth/
    │   │   └── LoginPage.jsx                  # Credentials authentication view
    │   ├── common/
    │   │   ├── LandingPage.jsx                # Public landing page
    │   │   └── LoadingPage.jsx                # Full-screen spinner loading page
    │   ├── shared/
    │   │   ├── TicketDetail.jsx               # Ticket detail & modification view
    │   │   └── TicketManagement.jsx           # Main ticket listing page
    │   └── user/
    │       ├── CreateTicket.jsx               # User ticket creation page
    │       └── Dashboard.jsx                  # User summary dashboard page
    ├── routes/
    │   ├── AdminOnlyRoute.jsx                 # Guard for admin-only routes
    │   ├── ProtectedRoute.jsx                 # Guard for authenticated routes
    │   ├── RestrictedRoute.jsx                # Guard for guest-only routes
    │   └── router.jsx                         # React Router DOM configuration
    ├── services/
    │   ├── axiosInstance.jsx                  # Axios configuration with JWT refresh interceptor
    │   ├── auth/
    │   │   └── auth.js                        # Authentication service handlers
    │   ├── tickets/
    │   │   └── ticketServices.js              # Ticket API operations
    │   └── users/
    │       └── userServices.jsx               # User management API operations
    └── utils/
        ├── formats.jsx                        # Date formatting utilities
        └── pageNavUtils.jsx                   # Dynamic navigation items & title resolution
```

---

## 3. Data Models & State Management Structures

### 3.1 Authentication State Model (`AuthContext.jsx`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AuthState",
  "type": "object",
  "properties": {
    "isAuthorized": { "type": ["boolean", "null"] },
    "role": { "type": "string", "enum": ["user", "admin"] },
    "isLoading": { "type": "boolean" },
    "userStatus": { "type": ["string", "null"], "enum": ["active", "suspended", null] }
  },
  "required": ["isAuthorized", "role", "isLoading", "userStatus"]
}
```

### 3.2 User Model (`src/pages/admin/UserManagement.jsx`, `src/services/users/userServices.jsx`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "UserModel",
  "type": "object",
  "properties": {
    "id": { "type": ["number", "string"] },
    "email": { "type": "string", "format": "email" },
    "role": { "type": "string", "enum": ["user", "admin"] },
    "date_joined": { "type": "string", "format": "date-time" },
    "last_login": { "type": ["string", "null"], "format": "date-time" },
    "is_active": { "type": "boolean" }
  },
  "required": ["id", "email", "role", "date_joined", "is_active"]
}
```

### 3.3 Ticket Model (`src/services/tickets/ticketServices.js`, `src/pages/shared/TicketDetail.jsx`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TicketModel",
  "type": "object",
  "properties": {
    "id": { "type": ["number", "string"] },
    "title": { "type": "string" },
    "description": { "type": "string" },
    "priority": { "type": "string", "enum": ["low", "medium", "high"] },
    "status": { "type": "string", "enum": ["open", "in-progress", "resolved"] },
    "created_at": { "type": "string", "format": "date-time" },
    "updated_at": { "type": "string", "format": "date-time" },
    "created_by": { "type": ["string", "object"] },
    "assigned_to": { "type": ["string", "null"] }
  },
  "required": ["id", "title", "description", "priority", "status"]
}
```

### 3.4 Admin Dashboard Aggregate State Model (`src/hooks/useDashboardData.jsx`)
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AdminDashboardState",
  "type": "object",
  "properties": {
    "ticketData": {
      "type": "object",
      "properties": {
        "totalTickets": { "type": "integer" },
        "openTickets": { "type": "integer" },
        "inProgressTickets": { "type": "integer" },
        "resolvedTickets": { "type": "integer" },
        "ticketsByPriority": {
          "type": "object",
          "properties": {
            "low": { "type": "integer" },
            "medium": { "type": "integer" },
            "high": { "type": "integer" }
          }
        },
        "ticketCreationByMonth": {
          "type": "array",
          "items": { "type": "integer" },
          "minItems": 12,
          "maxItems": 12
        },
        "ticketsByStatus": {
          "type": "array",
          "items": { "type": "integer" },
          "minItems": 3,
          "maxItems": 3
        },
        "recentTickets": { "type": "array" }
      }
    },
    "userData": {
      "type": "object",
      "properties": {
        "totalUsers": { "type": "integer" },
        "activeUsers": { "type": "integer" },
        "inactiveUsers": { "type": "integer" },
        "adminUsers": { "type": "integer" },
        "regularUsers": { "type": "integer" },
        "userGrowthByMonth": {
          "type": "array",
          "items": { "type": "integer" },
          "minItems": 12,
          "maxItems": 12
        },
        "userActivityScore": { "type": "number" }
      }
    }
  }
}
```

---

## 4. API Endpoints & Integration Points

All API requests rely on base URL `import.meta.env.VITE_API_BASE_URL`.

### 4.1 Authentication & User Endpoints (`src/services/auth/auth.js`, `src/services/users/userServices.jsx`)

| Method | Endpoint | Handler File | Request Payload | Response / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `auth/login/` | `src/services/auth/auth.js` | `{ email, password }` | `{ access: string, refresh: string, role: "user" \| "admin" }` |
| `POST` | `auth/token/refresh/` | `src/services/axiosInstance.jsx` | `{ refresh: string }` | `{ access: string, refresh: string }` |
| `GET` | `auth/status/` | `src/context/AuthContext.jsx` | None (Bearer Token) | `{ status: "active" \| "suspended", role: "user" \| "admin" }` |
| `OPTIONS`| `auth/logout` | `src/context/AuthContext.jsx`, `src/services/auth/auth.js` | Raw refresh string | Invalidates refresh session |
| `POST` | `accounts/logout/` | `src/hooks/useLogout.jsx` | `{ refresh_token: string }` | Alternative logout endpoint |
| `POST` | `auth/register/` | `src/services/users/userServices.jsx` | `{ email, password, confirm_password, role? }` | Creates a new user record |
| `GET` | `auth/users/` | `src/services/users/userServices.jsx` | None (Bearer Token) | Array of `UserModel` items |
| `PATCH` | `auth/users/{id}/status/` | `src/services/users/userServices.jsx` | `{ is_active: boolean }` | Updates active state for specified user ID |
| `GET` | `auth/users/stats/` | `src/hooks/useDashboardData.jsx` | None (Bearer Token) | Returns user analytics data for admin dashboard |

### 4.2 Ticket Operations Endpoints (`src/services/tickets/ticketServices.js`)

| Method | Endpoint | Query Parameters | Request Payload | Response / Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `GET` | `tickets/` | `status`, `priority`, `page_size` | None | `{ count: number, next: string \| null, previous: string \| null, results: TicketModel[] }` |
| `GET` | `tickets/{id}/` | None | None | Single `TicketModel` object |
| `POST` | `tickets/` | None | `{ title, description, priority }` | Created `TicketModel` object |
| `PUT` | `tickets/{id}/` | None | `{ title, description, priority }` | Updated `TicketModel` object |
| `PATCH` | `tickets/{id}/` | None | `{ assigned_to: string }` \| `{ status: "resolved" }` | Partially updated `TicketModel` |
| `DELETE`| `tickets/{id}/` | None | None | Deletes ticket record |
| `GET` | `tickets/user-stats/` | None | None | `{ totalTickets: number, openTickets: number, inProgressTickets: number, resolvedTickets: number }` |
| `GET` | `tickets/stats/` | None | None | Global ticket analytics payload for `useDashboardData` |

---

## 5. Setup Instructions & Environment Configuration

### 5.1 Prerequisites
- **Node.js**: Version `>= 18.0.0`
- **Package Manager**: `npm` Version `>= 9.0.0`

### 5.2 Environment Variables Setup
Create a `.env` file in the root project directory:
```env
VITE_API_BASE_URL=http://localhost:8000/api/
```

### 5.3 Installation & Local Execution Commands
```bash
# Install dependencies
npm install

# Run Vite local development server (Default: http://localhost:5173)
npm run dev

# Run ESLint static check
npm run lint

# Compile production bundle to /dist
npm run build

# Preview compiled production build
npm run preview
```

---

## 6. Documented Anomalies & Legacy Dependency Discrepancies

The following items are documented exactly as they exist in the current codebase without modification:

1. **Logout API Endpoint Ambiguity**:
   - `AuthContext.jsx` line 20 and `auth.js` line 20 issue an HTTP `OPTIONS` request to `auth/logout`.
   - `useLogout.jsx` line 11 issues an HTTP `POST` request to `accounts/logout/` with payload `{ refresh_token }`.
2. **File Extension Heterogeneity**:
   - Service layer contains a mix of `.js` files (`auth.js`, `ticketServices.js`) and `.jsx` files (`userServices.jsx`, `axiosInstance.jsx`) despite some files containing no JSX markup.
3. **Tailwind CSS v4 Configuration Pattern**:
   - The project uses `@tailwindcss/vite` v4.0.15 with `@theme` block definitions in `src/index.css`. `tailwindcss` is present in both `dependencies` and `devDependencies`.
4. **Router Guard Redundancy**:
   - In `src/routes/router.jsx`, `/` is declared twice at the top level: once for public guest access (`LandingPage` under `RestrictedRoute`) and once as a parent layout route (`MainLayout` under `ProtectedRoute`) with `create-tickets` and `tickets` as children.
