# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Node.js/Express backend project** for a Vietnamese story/novel reading platform (tvtruyen). The project follows a layered architecture with separate directories for controllers, services, models, routes, middleware, validators, and types.

## Commands

Since this is a new project, initialize it first:

```bash
npm init -y
```

Common commands to set up after initialization:

```bash
npm install express typescript cors helmet morgan    # core dependencies
npm install -D typescript @types/node @types/express @types/cors nodemon ts-node
npx tsc --init                                       # initialize TypeScript
npm run dev                                          # start development server
npm run build                                        # compile TypeScript
npm start                                            # run production build
```

## Architecture

The project uses a **layered architecture**:

- `src/controllers/` - Request handlers, contain business logic orchestration
- `src/services/` - Business logic layer, data processing
- `src/models/` - Database models/schemas
- `src/routes/` - Express route definitions
- `src/middleware/` - Express middleware (auth, validation, error handling)
- `src/validators/` - Input validation logic
- `src/types/` - TypeScript type definitions
- `src/utils/` - Utility functions
- `src/config/` - Configuration files (DB, env, etc.)

## Request Flow Diagram

```
CLIENT REQUEST
      │
      ▼
┌─────────────────────────────────┐
│          ROUTES                 │
│  /api/stories, /api/auth, ...  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│         MIDDLEWARE              │
│  CORS → Helmet → Morgan → Auth  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│        VALIDATORS               │
│  Input validation (body/params) │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│       CONTROLLERS               │
│  StoryCtrl → AuthCtrl → UserCtrl│
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│         SERVICES                │
│  StoryService → AuthService     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│          MODELS                 │
│   Story ← User ← Chapter        │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│         DATABASE                │
│         (MongoDB)               │
└─────────────────────────────────┘
```

## Data Flow Examples

### Authentication Flow
```
Register/Login → Validator → AuthService → bcrypt → UserModel → JWT生成 → Response
```

### CRUD Story Flow
```
GET /stories    → StoryController.getAll()     → StoryService.getAll()    → StoryModel.find()
POST /stories   → StoryController.create()     → StoryService.create()    → StoryModel.create()
PUT /stories/:id → StoryController.update()    → StoryService.update()    → StoryModel.findByIdAndUpdate()
DELETE /stories/:id → StoryController.delete() → StoryService.delete()    → StoryModel.findByIdAndDelete()
```

## Project Structure

```
src/
├── config/           # Database & env configuration
├── controllers/     # Request handlers
│   ├── story.controller.ts
│   ├── auth.controller.ts
│   └── user.controller.ts
├── middleware/      # Express middleware
│   ├── auth.middleware.ts
│   └── error.middleware.ts
├── models/          # Database schemas
│   ├── story.model.ts
│   ├── user.model.ts
│   └── chapter.model.ts
├── routes/          # Route definitions
├── services/        # Business logic
├── types/           # TypeScript interfaces
├── utils/           # Helper functions
└── validators/     # Input validation
```

## Development Notes

- Use TypeScript for type safety
- Follow the controller -> service -> model flow for new endpoints
- Place validators in `src/validators/` before implementing routes
- Keep routes thin - delegate to controllers

## Permissions and Auto-Approval

Claude Code is authorized to perform standard development tasks without requiring user confirmation, including:

- Installing dependencies (npm install)
- Running build and development commands
- Creating and editing files within the project structure
- Running tests and linters
- Making code changes as per the development plan

This setup allows for efficient and uninterrupted development workflow.
