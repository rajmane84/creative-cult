import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';

import { cn } from '@/lib/cn';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <div
      className={cn(
        'group relative flex w-full min-w-0 border-b-2 border-border transition-colors has-[[aria-invalid=true]]:border-destructive',
        className
      )}
    >
      <InputPrimitive
        type={type}
        data-slot="input"
        className="font-editorial peer flex-1 min-w-0 w-full bg-transparent px-0 py-2 text-xl md:text-2xl tracking-tight outline-none placeholder:text-foreground/25 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        {...props}
      />
      <span className="absolute bottom-[-2px] left-0 h-[2px] w-0 bg-primary transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] peer-focus-visible:w-full pointer-events-none group-has-[[aria-invalid=true]]:bg-destructive" />
    </div>
  );
}

export { Input };
