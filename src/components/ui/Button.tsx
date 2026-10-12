'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-dark',
    secondary: 'bg-neutral-dark text-white hover:opacity-90',
    outline: 'border border-border text-foreground bg-card hover:bg-muted',
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : ''}`}
    >
      {children}
    </button>
  );
};
