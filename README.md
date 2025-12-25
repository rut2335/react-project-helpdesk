# Ticket Management System

A comprehensive ticket management system built with React, TypeScript, and Material-UI. This application provides role-based access control for admins, agents, and customers to manage support tickets efficiently.

## 🚀 Features

### Role-Based Dashboards
- **Admin Dashboard**: Full system control including user management, ticket oversight, and priority/status configuration
- **Agent Dashboard**: Handle assigned tickets, add comments, and update ticket status
- **Customer Dashboard**: Create new tickets, track ticket status, and communicate with support agents

### Core Functionality
- **Authentication System**: Secure login and registration with JWT token management
- **Ticket Management**: Create, view, update, and track support tickets
- **Comment System**: Real-time communication between customers and support agents
- **Priority & Status Management**: Customizable ticket priorities and status workflows
- **User Management**: Admin-level user creation and role assignment

## 🛠️ Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite 7.2.4
- **UI Library**: Material-UI (MUI) 7.3.6
- **Routing**: React Router DOM 7.11.0
- **State Management**: Zustand 5.0.9 & Redux Toolkit 2.11.2
- **Form Handling**: React Hook Form 7.68.0
- **HTTP Client**: Axios 1.13.2
- **Notifications**: Notistack 3.0.2 & SweetAlert2 11.26.15
- **Animations**: Motion 12.23.26

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API server running (for full functionality)

## 🔧 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-client
```

2. Install dependencies:
```bash
npm install
```

3. Configure API endpoint (if needed):
Update the API base URL in your service files located in `src/services/`

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # Reusable React components
│   ├── addTickets.tsx
│   ├── adminDashboard.tsx
│   ├── agentDashboard.tsx
│   ├── customerDashboard.tsx
│   ├── Layout.tsx
│   ├── MessageBubble.tsx
│   ├── ticketDetail.tsx
│   ├── tickets.tsx
│   ├── userManagement.tsx
│   └── ...
├── context/         # React Context providers
│   ├── authContext.tsx
│   └── ticketContext.tsx
├── model/           # TypeScript interfaces and types
│   ├── user.ts
│   ├── tickets.ts
│   ├── comment.ts
│   └── ...
├── pages/           # Page components
│   ├── LandingPage.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── dashboard.tsx
├── services/        # API service layer
│   ├── api.service.ts
│   ├── auth-service.ts
│   ├── ticket-service.tsx
│   ├── comment-service.ts
│   └── users-service.ts
├── App.tsx          # Main application component
├── routes.tsx       # Application routing configuration
└── main.tsx         # Application entry point
```

## 🔐 User Roles

### Customer
- Create new support tickets
- View own tickets
- Add comments to tickets
- Track ticket status

### Agent
- View assigned tickets
- Update ticket status
- Add comments and responses
- Manage ticket priorities

### Admin
- Full system access
- User management (create, edit, delete users)
- Configure ticket priorities and statuses
- View all tickets and statistics
- System-wide oversight

## 🎨 UI Components

The application uses Material-UI for a consistent, modern interface with:
- Responsive design for mobile and desktop
- Custom theme configuration
- Accessible components
- Smooth animations and transitions

## 🔒 Authentication

The application implements JWT-based authentication with:
- Secure token storage in localStorage
- Protected routes with role-based guards
- Automatic token refresh handling
- Session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is private and proprietary.

## 👥 Support

For support, please create a ticket in the system or contact the development team.

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
