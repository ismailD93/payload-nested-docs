export const NEXT_PUBLIC_SERVER_URL = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SERVER_URL || '';

export const DATABASE_URL = process.env.DATABASE_URL || '';

export const CLOUDINARY_CLOUD_NAME = '';
export const CLOUDINARY_API_KEY = '';
export const CLOUDINARY_API_SECRET = '';
export const CLOUDINARY_UPLOAD_PRESET = '';
export const CLOUDINARY_UPLOAD_FOLDER = '';

export const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET || '';

export const NODE_ENV = process.env.NODE_ENV || 'development';
