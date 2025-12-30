import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../../components/ui/Header.js";
import LoginHeader from "./components/LoginHeader.js";
import SocialLoginButtons from "./components/SocialLoginButtons.js";
import LoginForm from "./components/LoginForm.js";
import type { LoginFormData } from "./components/LoginForm.js";
import SignUpPrompt from "./components/SignUpPrompt.js";
import LoadingSkeleton from "./components/LoadingSkeleton.js";

// Types & Interfaces

type UserRole = "reader" | "creator" | "admin";

interface Credential {
  email: string;
  password: string;
}

type MockCredentials = Record<UserRole, Credential>;

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  joinedDate: Date | string;
  preferences: {
    theme: string;
    notifications: boolean;
    newsletter: boolean;
  };
}

interface LocationState {
  from?: {
    pathname: string;
  };
}

// Component

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const location = useLocation();

  // Safely read the location state
  const state = location.state as LocationState;

  // Mock credentials for different user types
  const mockCredentials: MockCredentials = {
    reader: { email: "reader@contenthub.com", password: "reader123" },
    creator: { email: "creator@contenthub.com", password: "creator123" },
    admin: { email: "admin@contenthub.com", password: "admin123" },
  };

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = async (formData: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check against mock credentials
      // Cast because Object.keys returns string[]
      const userType = (Object.keys(mockCredentials) as UserRole[]).find(
        (type) =>
          mockCredentials[type].email === formData.email &&
          mockCredentials[type].password === formData.password
      );

      if (userType) {
        // Mock successful login
        const userData: UserData = {
          id: Math.random().toString(36).substr(2, 9),
          name:
            userType === "reader"
              ? "John Reader"
              : userType === "creator"
              ? "Jane Creator"
              : "Admin User",
          email: formData.email,
          role: userType,
          avatar: `https://randomuser.me/api/portraits/${
            userType === "creator" ? "women" : "men"
          }/${Math.floor(Math.random() * 50)}.jpg`,
          joinedDate: new Date(), // API may return a string, but use a Date object for mock
          preferences: {
            theme: "light",
            notifications: true,
            newsletter: formData.rememberMe,
          },
        };

        // Store user data in localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("isAuthenticated", "true");

        // Redirect to intended page or dashboard
        const from = state?.from?.pathname || "/homepage";
        navigate(from, { replace: true });
      } else {
        setError(
          "Invalid email or password. Please check your credentials and try again."
        );
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate social login delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mock successful social login
      const userData: UserData = {
        id: Math.random().toString(36).substr(2, 9),
        name: provider === "google" ? "Google User" : "Facebook User",
        email: `${provider}user@example.com`,
        role: "reader",
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 50
        )}.jpg`,
        joinedDate: new Date(),
        preferences: {
          theme: "light",
          notifications: true,
          newsletter: false,
        },
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("isAuthenticated", "true");

      const from = state?.from?.pathname || "/homepage";
      navigate(from, { replace: true });
    } catch (err) {
      setError(`${provider} login failed. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />
      <main className="flex items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="bg-card/80 border border-border rounded-2xl p-8 glassmorphism soft-shadow">
            <LoginHeader />

            <div className="space-y-6">
              <SocialLoginButtons
                onSocialLogin={handleSocialLogin}
                isLoading={isLoading}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-card text-muted-foreground">
                    Or continue with email
                  </span>
                </div>
              </div>

              <LoginForm
                onSubmit={handleLogin}
                isLoading={isLoading}
                error={error}
              />
            </div>

            <SignUpPrompt />
          </div>

          {/* Demo Credentials Info */}
          <motion.div
            className="mt-6 p-4 bg-muted/50 border border-border rounded-xl text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <h4 className="font-medium text-foreground mb-2">
              Demo Credentials:
            </h4>
            <div className="space-y-1 text-xs">
              <div>
                <strong>Reader:</strong> reader@contenthub.com / reader123
              </div>
              <div>
                <strong>Creator:</strong> creator@contenthub.com / creator123
              </div>
              <div>
                <strong>Admin:</strong> admin@contenthub.com / admin123
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Login;
