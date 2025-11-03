'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent-dark focus:ring-accent shadow-md hover:shadow-lg',
    secondary: 'bg-neutral-dark text-white hover:bg-opacity-90 focus:ring-neutral-dark shadow-md hover:shadow-lg',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white focus:ring-accent',
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  const motionProps = {
    whileHover: !disabled ? { scale: 1.05 } : undefined,
    whileTap: !disabled ? { scale: 0.95 } : undefined,
    transition: { duration: 0.2 },
  };
  
  if (href) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
};
