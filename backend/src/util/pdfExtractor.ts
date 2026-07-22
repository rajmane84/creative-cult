import { PDFParse } from 'pdf-parse';

/**
 * Extract text from a PDF buffer
 * @param buffer - PDF file buffer
 * @returns Promise with extracted text
 */
export async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();
    return result.text;
  } catch (error) {
    console.error('PDF extraction error:', error);
    throw new Error('Failed to extract text from PDF', { cause: error });
  } finally {
    // Always call destroy() to free memory
    await parser.destroy();
  }
}

/**
 * Check if the extracted text appears to be from a scanned document
 * This is a simple heuristic - if the text is very short or contains mostly special characters,
 * it might be a scanned PDF that needs OCR
 * @param text - Extracted text from PDF
 * @returns Boolean indicating if the document might be scanned
 */
export function isLikelyScanned(text: string): boolean {
  const cleanText = text.replace(/\s+/g, '').trim();

  if (cleanText.length < 50) {
    return true;
  }

  const specialCharRatio = (text.match(/[^\w\s]/g) || []).length / text.length;
  if (specialCharRatio > 0.3) {
    return true;
  }

  return false;
}
