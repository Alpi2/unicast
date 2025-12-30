import React from "react";
import { cn } from "../../utils/cn.js";

// Input Props Arayüzü
// HTML input'un standart 'size' (genişlik karakter sayısı) özelliği ile çakışmaması için Omit ediyoruz.
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  error?: React.ReactNode;
  size?: "default" | "sm" | "lg"; // FilterSidebar'ın beklediği özellik
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      description,
      error,
      required = false,
      id,
      size = "default", // Varsayılan boyut
      ...props
    },
    ref
  ) => {
    // ID'yi her render'da değişmemesi için useMemo ile sabitliyoruz
    const inputId = React.useMemo(() => {
      return id || `input-${Math.random().toString(36).substr(2, 9)}`;
    }, [id]);

    // Boyutlandırma sınıfları
    const sizeClasses = {
      default: "h-10 px-3 py-2",
      sm: "h-8 px-2 py-1 text-xs",
      lg: "h-12 px-4 py-3 text-base",
    };

    // Temel input sınıfları (yükseklik ve padding'i çıkardık, yukarıdan gelecek)
    const baseInputClasses =
      "flex w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-sm";

    // Checkbox-specific styles
    if (type === "checkbox") {
      return (
        <input
          type="checkbox"
          className={cn(
            "h-4 w-4 rounded border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    // Radio button-specific styles
    if (type === "radio") {
      return (
        <input
          type="radio"
          className={cn(
            "h-4 w-4 rounded-full border border-input bg-background text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />
      );
    }

    // Normal text inputlar için wrapper yapı
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              error ? "text-destructive" : "text-foreground"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <input
          type={type}
          className={cn(
            baseInputClasses,
            sizeClasses[size], // Boyut sınıfını buraya ekliyoruz
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          ref={ref}
          id={inputId}
          {...props}
        />

        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
