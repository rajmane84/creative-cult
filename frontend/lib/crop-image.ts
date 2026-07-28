import type { Area } from 'react-easy-crop';

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = url;
  });
}

export async function getCroppedImageFile(
  imageSrc: string,
  croppedAreaPixels: Area,
  fileName: string,
  mimeType: string
): Promise<File> {
  const image = await loadImage(imageSrc);

  const canvas = document.createElement('canvas');
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Failed to get canvas context');
  }

  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height
  );

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mimeType)
  );

  if (!blob) {
    throw new Error('Failed to crop image');
  }

  return new File([blob], fileName, { type: mimeType });
}
