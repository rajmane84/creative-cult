import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
  'group relative overflow-hidden inline-flex shrink-0 items-center justify-center border font-mono text-[11px] uppercase tracking-widest whitespace-nowrap transition-all outline-none select-none focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-border bg-transparent text-foreground',
        outline:
          'border-border bg-transparent hover:bg-muted hover:text-foreground',
        secondary: 'border-border text-secondary-foreground text-foreground',
        ghost: 'border-transparent hover:bg-muted hover:text-foreground',
        destructive: 'border-border text-destructive',
        link: 'border-transparent text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'px-5 py-3 md:px-6 md:py-4',
        xs: 'px-2 py-1 text-[9px]',
        sm: 'px-4 py-2 text-[10px]',
        lg: 'px-8 py-4 md:px-10 md:py-5 text-[12px]',
        icon: 'size-10',
        'icon-xs': 'size-6',
        'icon-sm': 'size-8',
        'icon-lg': 'size-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {variant === 'default' && (
        <span className="absolute inset-0 translate-y-full bg-primary transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
      )}
      {variant === 'secondary' && (
        <span className="absolute inset-0 translate-y-full bg-foreground transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
      )}
      {variant === 'destructive' && (
        <span className="absolute inset-0 translate-y-full bg-destructive transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" />
      )}
      <span
        className={cn(
          'relative z-10 flex items-center justify-center gap-2 transition-colors duration-500',
          variant === 'default' && 'group-hover:text-primary-foreground',
          variant === 'destructive' &&
            'group-hover:text-destructive-foreground',
          variant === 'secondary' && 'group-hover:text-background'
        )}
      >
        {children}
      </span>
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
