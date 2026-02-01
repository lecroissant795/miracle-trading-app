import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-lg shadow-blue-200",
    secondary: "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-500",
    outline: "border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 focus:ring-slate-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
