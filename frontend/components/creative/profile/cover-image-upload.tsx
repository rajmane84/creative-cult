'use client';

import { useRef, useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { MAX_COVER_IMAGE_SIZE, ALLOWED_AVATAR_TYPES } from '@/constants';
import { useUpdateCoverImage } from '@/hooks/creative/profile';
import { CoverImageCropDialog } from './dialog';

interface CoverImageUploadProps {
  coverImage?: string | null;
}

interface PendingImage {
  src: string;
  fileName: string;
  mimeType: string;
}

export default function CoverImageUpload({
  coverImage,
}: CoverImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateCoverImageMutation } = useUpdateCoverImage();
  const isUploading = updateCoverImageMutation.isPending;
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);

  const handleButtonClick = () => {
    if (isUploading) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error('Please upload a JPEG, PNG, or WebP image');
      return;
    }

    if (file.size > MAX_COVER_IMAGE_SIZE) {
      toast.error('Image must be smaller than 5MB');
      return;
    }

    setPendingImage({
      src: URL.createObjectURL(file),
      fileName: file.name,
      mimeType: file.type,
    });
  };

  const closeCropDialog = () => {
    if (pendingImage) {
      URL.revokeObjectURL(pendingImage.src);
    }
    setPendingImage(null);
  };

  const handleCropSave = (file: File) => {
    updateCoverImageMutation.mutate(file, {
      onSuccess: closeCropDialog,
    });
  };

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        {coverImage ? (
          <img
            src={coverImage}
            alt=""
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-foreground via-foreground/85 to-primary/70" />
        )}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-foreground/50" />
      </div>

      <button
        type="button"
        onClick={handleButtonClick}
        disabled={isUploading}
        aria-busy={isUploading}
        className="absolute top-4 left-6 flex items-center gap-1.5 rounded-lg bg-background/95 backdrop-blur-sm border border-border px-3 py-1.5 text-xs font-body font-medium text-foreground cursor-pointer hover:bg-background transition-colors disabled:cursor-wait disabled:opacity-70"
      >
        {isUploading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Camera className="size-3.5" />
        )}
        Change cover
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {pendingImage && (
        <CoverImageCropDialog
          open={!!pendingImage}
          imageSrc={pendingImage.src}
          fileName={pendingImage.fileName}
          mimeType={pendingImage.mimeType}
          isSaving={isUploading}
          onOpenChange={(open) => {
            if (!open) closeCropDialog();
          }}
          onSave={handleCropSave}
        />
      )}
    </>
  );
}
