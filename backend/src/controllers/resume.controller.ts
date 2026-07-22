import type { Request, Response } from 'express';
import { asyncHandler } from '../middlewares/asyncHandler';
import { BadRequestError } from '../util/errors';
import { uploadToCloudinary } from '../util/cloudinary';
import { extractTextFromPDF, isLikelyScanned } from '../util/pdfExtractor';
import { extractResumeData } from '../services/claudeExtraction';
import { ApiResponse } from '../util/response';

export const parseResume = asyncHandler(async (req: Request, res: Response) => {
  // Check if file was uploaded
  if (!req.file) {
    throw new BadRequestError('No file uploaded');
  }

  // Upload file to Cloudinary in the 'resumes' folder
  const uploadResult = await uploadToCloudinary(
    req.file.buffer,
    'resumes',
    'raw'
  );

  // Extract text from PDF
  const text = await extractTextFromPDF(req.file.buffer);

  // Check if the document might be scanned
  if (isLikelyScanned(text)) {
    console.warn(
      'Document appears to be scanned, text extraction may be limited'
    );
  }

  // Use Claude AI to extract structured data
  const parsedData = await extractResumeData(text);

  // Return the structured data along with Cloudinary info
  return ApiResponse.success(
    res,
    {
      parsedData,
      cloudinary: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        fileName: uploadResult.fileName,
      },
    },
    'Resume parsed successfully'
  );
});
