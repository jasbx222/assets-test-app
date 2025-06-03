'use client';

const getToken = (tokenKey: string): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(tokenKey);
};

export default getToken;
