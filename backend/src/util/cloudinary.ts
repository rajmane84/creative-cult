import { v2 as cloudinary } from 'cloudinary';
import { env } from './env';

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param file - File path or buffer
 * @param folder - Folder name in Cloudinary (e.g., 'resumes')
 * @param resourceType - Type of resource (image, raw, video, auto)
 * @returns Promise with upload result containing URL and public_id
 */
export async function uploadToCloudinary(
  file: string | Buffer,
  folder: string,
  resourceType: 'image' | 'raw' | 'video' | 'auto' = 'auto'
): Promise<{
  url: string;
  publicId: string;
  fileName?: string;
}> {
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true,
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      fileName: result.original_filename,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary', { cause: error });
  }
}

/**
 * Delete a file from Cloudinary using its public ID
 * @param publicId - Public ID of the file to delete
 * @param resourceType - Type of resource (image, raw, video, auto)
 * @returns Promise with deletion result
 */
export async function deleteFromCloudinary(
  publicId: string,
  resourceType: 'image' | 'raw' | 'video' | 'auto' = 'auto'
): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error('Cloudinary deletion error:', error);
    throw new Error('Failed to delete file from Cloudinary', { cause: error });
  }
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID of the file
 */
export function getPublicIdFromUrl(url: string): string {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  const publicId = fileName?.split('.')[0];
  const folderParts = parts.slice(-3, -1);
  return `${folderParts.join('/')}/${publicId}`;
}

export { cloudinary };
