# UniCast — Content Platform

**UniCast** is a content publishing and analytics frontend built with Vite, React 18, and TypeScript. This repository contains the frontend application (Vite + React + TailwindCSS) used for content creation, reading, and analytics dashboards.

## 🚀 Key Features

- React 18 + TypeScript
- Vite 5 build & dev server
- Tailwind CSS (with plugins: forms, typography, aspect-ratio, container queries, animate)
- Data visualization with D3 / Recharts
- Framer Motion for animations
- React Router v6 for routing
- Ready-made page layouts/components for dashboards, article reading, content editor, comments, and user profile

---

## 📦 Tech stack & notable versions

- Node: **recommend Node 18+ (LTS)**
- React: **18.2.0**
- Vite: **5.0.0**
- TypeScript: **5.9.3**
- Tailwind CSS: **3.4.6**
- @vitejs/plugin-react: **4.3.4**
- vite-tsconfig-paths: **3.6.0**

(Exact versions are taken from `package.json` — update there as needed.)

## 📋 Prerequisites

- Node >= 18 (recommended LTS)
- npm, yarn, or pnpm

---

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   # or
   npm start
   ```

---

## 📁 Project Structure

```
frontend/
├─ public/                # static assets (manifest, robots, icons)
├─ src/
│  ├─ pages/              # page groups (analytics-dashboard, article-reading, ...)
│  ├─ components/         # shared components and UI primitives
│  ├─ styles/             # Tailwind & global styles
│  ├─ App.tsx
│  └─ index.tsx
├─ index.html             # HTML template
├─ package.json
├─ tsconfig.json
└─ tailwind.config.js
```

## 🧩 Adding Routes

Edit `src/Routes.tsx` to add or modify application routes.

Example (concise):

```tsx
// src/Routes.tsx (simplified)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import NotFound from "./pages/NotFound";

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* add routes here */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

````

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.

## 📦 Deployment

Build the application for production:

```bash
npm run build
````
