export const getAppApiBase = (): string => {
  return process.env.NEXT_PUBLIC_API_APP_BASE || 'http://localhost:3000';
};

export const getWwwUrl = (): string => {
  return process.env.NEXT_PUBLIC_WWW_URL || 'http://localhost:3001';
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

