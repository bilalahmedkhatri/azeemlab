'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md'
}) => {
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverClasses = hover 
    ? 'transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl' 
    : '';

  const baseClasses = `bg-white rounded-xl shadow-lg ${paddingStyles[padding]} ${hoverClasses} ${className}`;

  return <div className={baseClasses}>{children}</div>;
};
