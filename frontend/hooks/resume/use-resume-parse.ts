import { useMutation } from '@tanstack/react-query';
import { resumeService, type ResumeParseResponse } from '@/services/resume';
import { toast } from 'sonner';
import { ApiError } from '@/types/api';

export function useResumeParse(options?: {
  onSuccess?: (data: ResumeParseResponse) => void;
  onError?: () => void;
}) {
  const resumeParseMutation = useMutation({
    mutationFn: (file: File) => resumeService.parseResume(file),
    onSuccess: (data: ResumeParseResponse) => {
      toast.success('Resume parsed successfully!');
      options?.onSuccess?.(data);
    },
    onError: (error: unknown) => {
      console.error('Resume parse error:', error);
      if (error instanceof ApiError) {
        toast.error(error.message || 'Failed to parse resume');
      } else {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to parse resume';
        toast.error(errorMessage);
      }
      options?.onError?.();
    },
  });

  return {
    resumeParseMutation,
    parseResume: resumeParseMutation.mutate,
    isParsing: resumeParseMutation.isPending,
  };
}
