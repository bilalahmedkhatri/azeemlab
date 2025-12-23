// API Configuration
export const config = {
  // Backend API URL
  backendUrl: process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL || process.env.NEXT_PUBLIC_BACKEND_API_URL,
  
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
