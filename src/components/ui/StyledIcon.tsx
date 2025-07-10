
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StyledIconProps {
  icon: LucideIcon;
  className?: string;
  color?: 'primary' | 'accent' | 'secondary' | 'muted' | 'dark' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'contained' | 'glow' | 'minimal';
}

const StyledIcon = ({ 
  icon: Icon, 
  className = '', 
  color = 'accent',
  size = 'lg',
  variant = 'contained'
}: StyledIconProps) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-[#D9C0AA]',
    accent: 'text-[#9D4916]',
    secondary: 'text-[#A6B8C1]',
    muted: 'text-[#254C5A]',
    dark: 'text-[#0D181C]',
    destructive: 'text-destructive'
  };

  const variantClasses = {
    default: '',
    contained: 'p-3 rounded-full bg-[#0D181C]/80 backdrop-blur-sm border border-[#D9C0AA]/20',
    glow: 'p-3 rounded-full bg-[#0D181C]/80 backdrop-blur-sm border border-[#D9C0AA]/20 shadow-lg shadow-[#D9C0AA]/20',
    minimal: 'p-2'
  };

  return (
    <div className={`
      ${variantClasses[variant]}
      hover:scale-105 hover:shadow-xl hover:shadow-[#D9C0AA]/30 
      transition-all duration-300 ease-out
      ${className}
    `}>
      <Icon 
        className={`${sizeClasses[size]} ${colorClasses[color]}`} 
        strokeWidth={1.5} 
      />
    </div>
  );
};

export default StyledIcon;
