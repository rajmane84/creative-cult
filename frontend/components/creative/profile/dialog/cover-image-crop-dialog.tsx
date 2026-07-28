'use client';

import { useCallback, useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { COVER_IMAGE_ASPECT_RATIO } from '@/constants';
import { getCroppedImageFile } from '@/lib/crop-image';

interface CoverImageCropDialogProps {
  open: boolean;
  imageSrc: string;
  fileName: string;
  mimeType: string;
  isSaving: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (file: File) => void;
}

export function CoverImageCropDialog({
  open,
  imageSrc,
  fileName,
  mimeType,
  isSaving,
  onOpenChange,
  onSave,
}: CoverImageCropDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleCropComplete = useCallback((_area: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleOpenChange = (nextOpen: boolean) => {
    if (isSaving) return;
    if (!nextOpen) {
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
    onOpenChange(nextOpen);
  };

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    const file = await getCroppedImageFile(
      imageSrc,
      croppedAreaPixels,
      fileName,
      mimeType
    );
    onSave(file);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Position your cover image</DialogTitle>
        </DialogHeader>

        <div className="relative w-full h-96 overflow-hidden bg-muted">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={COVER_IMAGE_ASPECT_RATIO}
            objectFit="contain"
            cropSize={{ width: 320, height: 320 / COVER_IMAGE_ASPECT_RATIO }}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            style={{
              cropAreaStyle: {
                border: '2px solid white',
                boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
              },
            }}
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
            Zoom
          </span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="w-full accent-primary"
            aria-label="Zoom"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSave}
            disabled={isSaving || !croppedAreaPixels}
            aria-busy={isSaving}
          >
            {isSaving ? <Loader2 className="size-3.5 animate-spin" /> : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
