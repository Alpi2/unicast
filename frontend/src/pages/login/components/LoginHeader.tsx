import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon.js";

// Component

const LoginHeader: React.FC = () => {
  return (
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to="/homepage"
        className="inline-flex items-center justify-center mb-6"
      >
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shadow-soft">
          <Icon name="BookOpen" size={28} />
        </div>
      </Link>
      <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
        Welcome Back
      </h1>
      <p className="text-muted-foreground text-base">
        Sign in to your Content Plattform account to continue creating and
        discovering amazing content.
      </p>
    </motion.div>
  );
};

export default LoginHeader;
