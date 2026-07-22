import multer from 'multer';

// Configure multer to use memory storage
// This is useful for processing files before uploading to Cloudinary
const storage = multer.memoryStorage();

// File filter to accept only PDF files
const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype === 'application/pdf') {
    callback(null, true);
  } else {
    callback(new Error('Only PDF files are allowed'));
  }
};

// Configure multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export specific middleware for single file upload
export const uploadResume = upload.single('resume');
