import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

// Utilities & Shared Components
import ScrollToTop from "./components/ScrollToTop.js";
import ErrorBoundary from "./components/ErrorBoundary.js";

// Pages
import NotFound from "./pages/NotFound.js";
import AnalyticsDashboard from "./pages/analytics-dashboard/index.js";
import ContentCreationDashboard from "./pages/content-creation-dashboard/index.js";
import SearchResults from "./pages/search-results/index.js";
import Login from "./pages/login/index.js";
import ContentEditor from "./pages/content-editor/index.js";
import ArticleReading from "./pages/article-reading/index.js";
import CommentManagement from "./pages/comment-management/index.js";
import UserProfile from "./pages/user-profile/index.js";
import Register from "./pages/register/index.js";
import Homepage from "./pages/homepage/index.js";

// Component

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Dashboard & Analytics */}
          <Route path="/" element={<AnalyticsDashboard />} />
          <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />

          {/* Content Creation */}
          <Route
            path="/content-creation-dashboard"
            element={<ContentCreationDashboard />}
          />
          <Route path="/content-editor" element={<ContentEditor />} />

          {/* Discovery & Reading */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/article-reading" element={<ArticleReading />} />

          {/* User Management */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user-profile" element={<UserProfile />} />

          {/* Community */}
          <Route path="/comment-management" element={<CommentManagement />} />

          {/* System */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
