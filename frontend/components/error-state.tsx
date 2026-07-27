import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Couldn't load this page",
  message = 'Something went wrong. Please try again.',
  onRetry,
  retryLabel = 'Try Again',
}: ErrorStateProps) {
  return (
    <div className="w-full bg-background min-h-[70vh] p-6 sm:p-10 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center max-w-sm">
        <AlertCircle className="size-8 text-muted-foreground" />
        <div className="space-y-1.5">
          <h2 className="font-editorial text-2xl font-bold text-foreground">
            {title}
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {message}
          </p>
        </div>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 gap-1.5 font-mono text-xs uppercase tracking-wider"
          >
            <RefreshCw className="size-3.5" />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
