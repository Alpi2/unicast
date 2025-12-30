import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn.js";
import Icon from "../AppIcon.js";

// Button varyasyonlarını tanımlıyoruz
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        danger: "bg-error text-error-foreground hover:bg-error/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xs: "h-8 rounded-md px-2 text-xs",
        xl: "h-12 rounded-md px-10 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// TypeScript Interface Tanımı (Hataları çözen kısım burası)
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconName?: string; // AppIcon'a gidecek isim
  iconPosition?: "left" | "right";
  iconSize?: number;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      loading = false,
      iconName,
      iconPosition = "left",
      iconSize,
      fullWidth = false,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Icon size mapping based on button size
    // Record<string, number> tipini ekledik ki TS kızmasın
    const iconSizeMap: Record<string, number> = {
      xs: 12,
      sm: 14,
      default: 16,
      lg: 18,
      xl: 20,
      icon: 16,
    };

    // size null/undefined gelirse default'a düşür
    const calculatedIconSize = iconSize || iconSizeMap[size || "default"] || 16;

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className="animate-spin -ml-1 mr-2 h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Icon rendering
    const renderIcon = () => {
      if (!iconName) return null;

      return (
        <Icon
          // AppIcon çok katı tip kontrolü yapıyorsa burada 'as any' ile geçiyoruz
          // çünkü string olarak gelen veriyi ikon ismine zorluyoruz.
          name={iconName as any}
          size={calculatedIconSize}
          className={cn(
            children && iconPosition === "left" && "mr-2",
            children && iconPosition === "right" && "ml-2"
          )}
        />
      );
    };

    // If using `asChild`, ensure we pass exactly one child element.
    // Clone that child and inject className, ref, disabled and content (spinner/icons).
    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement;
      const childClassName = cn(
        buttonVariants({ variant, size, className }),
        fullWidth && "w-full",
        // preserve child's own className if any
        (child.props && (child.props as any).className) || ""
      );

      const leftIcon =
        iconName && iconPosition === "left" ? (
          <Icon
            name={iconName as any}
            size={calculatedIconSize}
            className={cn(
              child.props && (child.props as any).children ? "mr-2" : ""
            )}
          />
        ) : null;

      const rightIcon =
        iconName && iconPosition === "right" ? (
          <Icon
            name={iconName as any}
            size={calculatedIconSize}
            className={cn(
              child.props && (child.props as any).children ? "ml-2" : ""
            )}
          />
        ) : null;

      return React.cloneElement(
        child,
        {
          ...props,
          className: childClassName,
          ref,
          disabled: disabled || loading,
        },
        <>
          {loading && <LoadingSpinner />}
          {leftIcon}
          {(child.props && (child.props as any).children) || null}
          {rightIcon}
        </>
      );
    }

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full"
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <LoadingSpinner />}
        {iconName && iconPosition === "left" && renderIcon()}
        {children}
        {iconName && iconPosition === "right" && renderIcon()}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
export default Button;
