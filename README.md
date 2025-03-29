# TekoKard Application

## Architecture Overview

TekoKard is built using a modern client-server architecture, with a Vue.js frontend and Node.js backend. The application follows a clean architecture pattern that separates concerns and maintains a clear data flow.

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
        │   ├── middleware/
        │   ├── routes/
        │   └── controllers/
        ├── business/     # Business logic layer
        │   └── services/
        ├── data/         # Data access layer
        │   ├── models/
        │   ├── types/
        │   ├── migrations/
        │   └── seeds/
        └── config/       # Configuration files
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
