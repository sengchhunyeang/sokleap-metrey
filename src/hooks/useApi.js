import { useState, useCallback } from 'react';

export default function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const get = useCallback((url) => request(url, { method: 'GET' }), [request]);

  const post = useCallback((url, body) => request(url, {
    method: 'POST',
    body: JSON.stringify(body),
  }), [request]);

  const put = useCallback((url, body) => request(url, {
    method: 'PUT',
    body: JSON.stringify(body),
  }), [request]);

  const del = useCallback((url) => request(url, { method: 'DELETE' }), [request]);

  return { loading, error, request, get, post, put, del };
}
