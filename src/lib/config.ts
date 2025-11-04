// API Configuration
export const config = {
  // Backend API URL
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000',
  
  // API endpoints
  endpoints: {
    chat: '/api/chat',
    contact: '/api/contact',
  },
  
  // Feature flags
  features: {
    useExternalBackend: process.env.NEXT_PUBLIC_USE_EXTERNAL_BACKEND === 'true',
  },
};
