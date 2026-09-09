import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'rounded-lg transition-all duration-300',
          'classic:bg-white classic:border classic:border-stone-200 classic:shadow-sm classic:hover:shadow-md',
          'neon:bg-white/5 neon:border neon:border-white/10 neon:backdrop-blur-md neon:hover:border-cyan-400/50 neon:hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          'flex flex-col space-y-1.5 p-6',
          'classic:border-b classic:border-stone-100',
          'neon:border-b neon:border-white/5',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <h3
      className={twMerge(
        clsx(
          'text-lg font-semibold leading-none tracking-tight',
          'classic:font-serif classic:text-stone-800',
          'neon:font-grotesk neon:text-white',
          className
        )
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={twMerge(clsx('p-6 pt-0', className))} {...props}>
      {children}
    </div>
  );
}
