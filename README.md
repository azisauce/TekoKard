# TekoKard Application

## Architecture Overview

TekoKard is built using a modern client-server architecture, with a Vue.js frontend and Node.js backend. The application follows a clean architecture pattern that separates concerns and maintains a clear data flow.

## Data Flow

### Backend (Server)

The backend follows a layered architecture pattern with the following components:

1. **Controllers** (`/server/src/api/controllers`)
   - Entry point for all HTTP requests
   - Handle request validation
   - Route requests to appropriate services
   - Format and send responses back to the client

2. **Services** (`/server/src/business/services`)
   - Contain business logic
   - Orchestrate data flow between controllers and repositories
   - Handle complex operations and data transformations
   - Implement business rules and validations

3. **Repositories** (`/server/src/data/repositories`)
   - Handle database operations
   - Abstract database access from services
   - Implement CRUD operations
   - Map database entities to domain models

4. **Models** (`/server/src/data/models`)
   - Define data structures
   - Represent database schemas
   - Provide data validation rules

### Frontend (Client)

The frontend follows the Vue.js architecture with these key components:

1. **Views** (`/client/src/views`)
   - Page-level components
   - Handle route-level UI logic
   - Compose smaller components

2. **Components** (`/client/src/components`)
   - Reusable UI elements
   - Handle component-level logic
   - Maintain their own state

3. **Services** (`/client/src/services`)
   - Handle API communications
   - Abstract HTTP requests
   - Format data for components

4. **Store** (`/client/src/store`)
   - Manage application state using Pinia
   - Handle state mutations
   - Provide actions for async operations

5. **Models** (`/client/src/models`)
   - Define client-side data structures
   - Provide data validation
   - Format data for UI

## Project Structure

```
tekokard/
├── client/                 # Frontend Vue.js application
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── controllers/    # Frontend controllers
│       ├── models/        # Frontend data models
│       ├── services/      # API communication services
│       ├── store/         # Vuex state management
│       └── views/         # Page components
│
└── server/                # Backend Node.js application
    └── src/
        ├── api/          # API layer
        │   └── controllers/
        ├── business/     # Business logic layer
        │   └── services/
        └── data/         # Data access layer
            ├── models/
            └── repositories/
```
## Database Design 

### Overview
This database schema supports a social media web application with user management, posts, comments, reactions, and tagging features.

### Entity Descriptions

#### Users
- Unique identifier and authentication
- Profile management
- Role-based access control

#### Posts
- User-generated content
- Supports anonymous and public posts
- Multiple status states (draft, published, archived)

#### Comments
- Attached to specific posts
- Supports anonymous and public comments

#### Reactions
- Users can react to posts
- Multiple reaction types supported

#### Roles
- Defines user permissions
- Flexible permission management via JSON

#### RefreshTokens
- Stores refresh tokens for users
- Enables secure token rotation
- Tracks token usage and expiration
- Supports multiple device sessions

### Token Authentication Mechanism

The application implements a secure JWT-based authentication system with refresh token rotation:

#### Access Token
- Short-lived JWT token (15 minutes)
- Contains user claims and permissions
- Used for API authentication
- Sent in Authorization header

#### Refresh Token
- Long-lived token (7 days)
- Stored securely in RefreshTokens table
- One-time use with automatic rotation
- Used to obtain new access tokens

#### Authentication Flow
1. User logs in with credentials
2. Server issues both access and refresh tokens
3. Client stores tokens securely
   - Access token in memory
   - Refresh token in HTTP-only cookie
4. Access token used for API requests
5. When access token expires:
   - Client uses refresh token to get new pair
   - Old refresh token is invalidated
   - New refresh token is issued
6. If refresh token is expired/invalid:
   - User must log in again
   - All related refresh tokens are revoked
