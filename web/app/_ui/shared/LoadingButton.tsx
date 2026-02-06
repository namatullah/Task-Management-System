import { ReactNode } from "react";

interface LoadingButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  widthFull?: boolean;
}

export function LoadingButton({
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  loadingText = "Loading...",
  children,
  className = "",
  variant = "primary",
  size = "md",
  widthFull = false,
}: LoadingButtonProps) {
  // Variant styles
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
  };

  // Size styles
  const sizeStyles = {
    sm: "py-2 px-3 text-sm min-h-[36px] max-h-[36px]",
    md: "py-3 px-4 text-base min-h-[40px] max-h-[40px]",
    lg: "py-4 px-6 text-lg min-h-[52px] max-h-[52px]",
  };
  const width = widthFull ? "w-full" : "";
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${width} rounded transition disabled:opacity-50 disabled:cursor-not-allowed text-sm
        flex items-center justify-center cursor-pointer
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
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
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="ml-2">{loadingText}</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
