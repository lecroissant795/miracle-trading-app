import React from 'react';
import { Loader2 } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<AuthButtonProps> = ({ 
  variant = 'primary', 
  isLoading = false, 
  fullWidth = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-3 text-sm font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 focus:ring-blue-500 border border-transparent",
    secondary: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 focus:ring-gray-200",
    outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-200",
    ghost: "bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-200"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
};
