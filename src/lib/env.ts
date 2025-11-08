// Helper function to get the site URL with better fallback logic
export const getSiteUrl = (): string => {
  // First try environment variable
  const envSiteUrl = process.env.AUTH_URL;
  if (envSiteUrl) return envSiteUrl;
  
  // In production, try to construct from request headers or use a reasonable default
  if (process.env.NODE_ENV === 'production') {
    // If we're in a server context, we could potentially get this from headers
    // For now, we'll use a more descriptive fallback
    return 'https://html-playground-v2.paulballestra.com'; // Replace with your actual domain
  }
  
  // Development fallback
  return 'http://localhost:3000';
};

export const DATABASE_URL = process.env.DATABASE_URL || '';
export const AUTH_URL = getSiteUrl();
export const AUTH_SECRET = process.env.AUTH_SECRET || '';
export const LIVEBLOCKS_SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY || '';
export const NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY || '';
export const AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID || '';
export const AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET || '';