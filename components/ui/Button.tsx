import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, forwardRef } from 'react';

// Utility function for merging Tailwind classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// ============================================
// BUTTON VARIANTS USING CVA
// ============================================

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      theme: {
        classic: '',
        neon: '',
      },
      variant: {
        // Classic Theme Variants
        classicPrimary: 'btn-classic',
        classicSecondary: 'btn-classic-secondary',
        classicOutline: 'px-6 py-3 rounded-md font-medium border-2 border-amber-700 text-amber-700 hover:bg-amber-700 hover:text-white transition-all duration-300 ease-in-out',
        
        // Neon Theme Variants
        neonPrimary: 'btn-neon-filled',
        neonSecondary: 'btn-neon-secondary',
        neonOutline: 'btn-neon',
        neonGhost: 'px-6 py-3 rounded-lg font-medium bg-transparent text-cyan-400 hover:bg-white/5 transition-all duration-150 ease-out',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-sm',
        lg: 'h-12 rounded-md px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      theme: 'classic',
      variant: 'classicPrimary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  theme?: 'classic' | 'neon';
}

// ============================================
// BUTTON COMPONENT
// ============================================

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, theme = 'classic', variant, size, ...props }, ref) => {
    // Auto-detect variant based on theme if not explicitly provided
    const resolvedVariant = variant || (theme === 'classic' ? 'classicPrimary' : 'neonPrimary');
    
    return (
      <button
        className={cn(buttonVariants({ theme, variant: resolvedVariant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
