# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run ESLint
npm run lint

# Preview production build
npm run preview

# Start mock API server (requires separate terminal)
npm run mock-api

# Start mock API with watch mode
npm run mock-api:dev
```

## Architecture

This is a React + TypeScript + Vite application with a mock Express API server.

### Tech Stack
- **React 19** with React Compiler (babel-plugin-react-compiler)
- **Vite 7** for build tooling
- **Ant Design** for UI components
- **React Router 7** for routing
- **TanStack Query** for server state management
- **Axios** for HTTP requests with interceptors

### Project Structure
```
src/
├── api/           # API services and axios configuration
├── components/    # Reusable components (ErrorBoundary, PrivateRoute)
├── hooks/         # Custom hooks (useAuth)
├── layouts/       # Layout components (MainLayout, AuthLayout)
├── pages/         # Page components in feature folders
├── routes/        # React Router configuration
└── utils/         # Utility functions
mock-api/          # Express.js mock API server (port 3001)
```

### Key Patterns
- **Routing**: Uses `createBrowserRouter` with private route wrapper for authentication
- **API**: Axios instance with request/response interceptors for auth tokens and error handling
- **API Base URL**: `http://localhost:3001/api`
- **Authentication**: Token stored in localStorage, automatically added to requests via interceptor

### Running the App
The mock API must be running on port 3001 before starting the dev server:
```bash
npm run mock-api  # Terminal 1
npm run dev       # Terminal 2
```
