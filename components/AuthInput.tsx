import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          className={`
            block w-full pl-10 pr-3 py-2.5 
            border border-gray-300 rounded-lg 
            text-gray-900 placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent
            transition-all duration-200
            bg-gray-50/50 hover:bg-white
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );
};
