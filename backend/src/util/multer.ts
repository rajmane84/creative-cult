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

// File filter to accept only common image formats
const imageFileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Only JPEG, PNG, and WebP images are allowed'));
  }
};

// Configure multer instance for image uploads
const imageUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

// Export specific middleware for avatar upload
export const uploadAvatar = imageUpload.single('avatar');

// Configure multer instance for portfolio cover image uploads
const portfolioImageUpload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Export specific middleware for portfolio cover image upload
export const uploadPortfolioCover = portfolioImageUpload.single('coverImage');
