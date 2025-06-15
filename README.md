# Trello-Style Todo Application

A modern, responsive todo application built with React, TypeScript, and Vite, featuring a Trello-style interface for task management.

## 🚀 Features

- Drag-and-drop task management
  - Responsive drag and drop that adapts to different screen sizes
  - Touch-friendly drag and drop for mobile devices
  - Visual feedback during drag operations
- Multiple task lists/boards
- Modern UI with Tailwind CSS
  - Responsive design optimized for all screen sizes
  - Special layout adjustments for screens below 800px
  - Mobile-first approach with progressive enhancement
- State management with Redux Toolkit
- Type-safe development with TypeScript
- Responsive design for all devices

## 🛠️ Tech Stack

- **Frontend Framework:** React 18.3
- **Language:** TypeScript 5.6
- **Build Tool:** Vite 6.0
- **State Management:** Redux Toolkit 2.8
- **Routing:** React Router DOM 6.30
- **Styling:** Tailwind CSS 4.1
- **HTTP Client:** Axios 1.9
- **Code Quality:** ESLint 9.17

## 📦 Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd trello-style-todo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── services/      # API and external service integrations
├── store/         # Redux store configuration
├── types/         # TypeScript type definitions
├── utils/         # Utility functions and helpers
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
└── index.css      # Global styles
```

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 🔧 Development

The project uses TypeScript for type safety and better development experience. Key development tools include:

- **ESLint** for code linting
- **TypeScript** for type checking
- **Vite** for fast development and building

## 📝 Code Style

The project follows modern React best practices and uses ESLint for code quality. The configuration includes:

- TypeScript-aware linting
- React-specific rules
- Modern JavaScript features

## 🏗️ Building for Production

To create a production build:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
