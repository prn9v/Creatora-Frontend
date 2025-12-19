export const getBackendUrl = () => {
  const value = process.env.NEXT_PUBLIC_BASE_URL + '/backend';

  if (!value) throw new Error('Missing environment variable: NEXT_PUBLIC_BACKEND_URL');

  return value;
};