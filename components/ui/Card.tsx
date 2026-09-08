import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { HTMLAttributes, forwardRef } from 'react';

// Utility function for merging Tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// CARD VARIANTS
// ============================================

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'classic' | 'neon';
  variant?: 'default' | 'elevated' | 'bordered';
}

// ============================================
// CARD COMPONENT
// ============================================

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, theme = 'classic', variant = 'default', ...props }, ref) => {
    const baseStyles = 'transition-all';
    
    // Theme-specific styles
    const themeStyles = theme === 'classic' 
      ? 'card-classic' 
      : 'card-neon';
    
    // Variant-specific overrides
    const variantStyles = {
      default: '',
      elevated: theme === 'classic' 
        ? 'shadow-lg hover:shadow-xl' 
        : 'shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      bordered: theme === 'classic'
        ? 'border-2 border-amber-700/30'
        : 'border-2 border-cyan-400/50',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, themeStyles, variantStyles[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

// ============================================
// CARD HEADER COMPONENT
// ============================================

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'classic' | 'neon';
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, theme = 'classic', ...props }, ref) => {
    const themeStyles = theme === 'classic'
      ? 'mb-4 pb-4 border-b border-stone-200 dark:border-slate-700'
      : 'mb-4 pb-4 border-b border-white/10';

    return (
      <div
        ref={ref}
        className={cn(themeStyles, className)}
        {...props}
      />
    );
  }
);

CardHeader.displayName = 'CardHeader';

// ============================================
// CARD TITLE COMPONENT
// ============================================

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  theme?: 'classic' | 'neon';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, theme = 'classic', as: Component = 'h3', ...props }, ref) => {
    const sizeClasses = {
      h1: 'text-3xl font-bold',
      h2: 'text-2xl font-semibold',
      h3: 'text-xl font-medium',
      h4: 'text-lg font-medium',
      h5: 'text-base font-medium',
      h6: 'text-sm font-medium',
    };

    const themeStyles = theme === 'classic'
      ? 'text-stone-800 dark:text-stone-100'
      : 'text-white';

    return (
      <Component
        ref={ref}
        className={cn(sizeClasses[Component], themeStyles, className)}
        {...props}
      />
    );
  }
);

CardTitle.displayName = 'CardTitle';

// ============================================
// CARD CONTENT COMPONENT
// ============================================

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  theme?: 'classic' | 'neon';
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, theme = 'classic', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-sm', className)}
        {...props}
      />
    );
  }
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
