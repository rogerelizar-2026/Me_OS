import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
        ghost: '',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-11 px-8',
      },
    },
    compoundVariants: [
      // Classic theme variants
      {
        variant: 'default',
        class: 'classic:bg-amber-600 classic:text-white classic:hover:bg-amber-700 classic:shadow-md neon:bg-cyan-500 neon:text-black neon:hover:bg-cyan-400 neon:shadow-[0_0_15px_rgba(6,182,212,0.5)]',
      },
      {
        variant: 'outline',
        class: 'classic:border-2 classic:border-amber-600 classic:text-amber-600 classic:hover:bg-amber-50 neon:border-2 neon:border-cyan-400 neon:text-cyan-400 neon:hover:bg-cyan-400/10 neon:hover:shadow-[0_0_10px_rgba(6,182,212,0.3)]',
      },
      {
        variant: 'ghost',
        class: 'classic:text-stone-600 classic:hover:bg-stone-100 neon:text-gray-400 neon:hover:bg-white/5',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge(clsx(buttonVariants({ variant, size }), className))}
      {...props}
    />
  );
};

export { Button, buttonVariants };
