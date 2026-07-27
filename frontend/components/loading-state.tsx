import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading...' }: LoadingStateProps) {
  return (
    <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-muted-foreground">
        <Loader2 className="size-8 animate-spin text-primary selection:text-background selection:bg-primary" />
        <span className="font-mono text-xs uppercase tracking-widest">
          {message}
        </span>
      </div>
    </div>
  );
}
