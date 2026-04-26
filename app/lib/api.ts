const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path: string, options: any = {}) {
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token')
      : null;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Request failed');
  }

  return res.json();
}