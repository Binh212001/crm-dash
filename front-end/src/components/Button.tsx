import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'completed' | 'work' | 'processing' | 'friends' | 'rejected' | 'social' | 'onhold' | 'intransit';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-200 focus:outline-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-blue-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    completed: 'bg-label-completed text-gray-800 hover:bg-teal-200 focus:ring-teal-500',
    work: 'bg-label-work text-red-800 hover:bg-red-200 focus:ring-red-500',
    processing: 'bg-label-processing text-violet-300 hover:bg-violet-800 focus:ring-violet-500',
    friends: 'bg-label-friends text-purple-800 hover:bg-purple-200 focus:ring-purple-500',
    rejected: 'bg-label-rejected text-red-800 hover:bg-red-300 focus:ring-red-500',
    social: 'bg-label-social text-blue-800 hover:bg-blue-200 focus:ring-blue-500',
    onhold: 'bg-label-onhold text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
    intransit: 'bg-label-intransit text-fuchsia-800 hover:bg-fuchsia-200 focus:ring-fuchsia-500',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`;

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
