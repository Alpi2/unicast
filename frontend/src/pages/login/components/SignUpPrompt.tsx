import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../../components/ui/Button.js";

// Component

const SignUpPrompt: React.FC = () => {
  return (
    <motion.div
      className="mt-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.3 }}
    >
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">
            Don't have an account?
          </span>
        </div>
      </div>

      <div className="mt-6">
        <Link to="/register">
          <Button
            variant="outline"
            fullWidth
            className="h-12 text-base font-medium neumorphism-outset hover:neumorphism-inset transition-all duration-200"
          >
            Create New Account
          </Button>
        </Link>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        By signing in, you agree to our{" "}
        <button
          type="button"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Terms of Service
        </button>{" "}
        and{" "}
        <button
          type="button"
          className="text-primary hover:text-primary/80 transition-colors"
        >
          Privacy Policy
        </button>
      </p>
    </motion.div>
  );
};

export default SignUpPrompt;
