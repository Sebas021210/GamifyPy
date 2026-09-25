// URL base del backend. Se configura con la variable de entorno VITE_API_URL
// (archivo .env en local o en el panel de Vercel en producción).
export const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');
