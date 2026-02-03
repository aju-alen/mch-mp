export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

/** Use this URL when sharing the contribute page so WhatsApp/Google show the correct preview */
export const CONTRIBUTE_SHARE_URL =
  import.meta.env.VITE_CONTRIBUTE_SHARE_URL ||
  `${VITE_BACKEND_URL.replace(/\/$/, '')}/contribute`;  