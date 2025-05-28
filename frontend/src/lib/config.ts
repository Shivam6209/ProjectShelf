// Configuration for the application
export const config = {
  // API base URL without /api suffix (for direct fetch calls)
  API_BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  
  // API URL with /api suffix (for axios instance)
  API_URL: (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001') + '/api',
  
  // Other configuration options can be added here
  APP_NAME: 'ProjectShelf',
  DEFAULT_PAGE_SIZE: 10,
} as const;

export default config; 