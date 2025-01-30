'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-xl p-8 text-center">
        <h2 className="mb-4 text-2xl font-bold text-red-500">¡Algo salió mal!</h2>
        <p className="mb-8 text-gray-300">
          {error.message || 'Ha ocurrido un error inesperado.'}
        </p>
        <button
          onClick={reset}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition-colors"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
} 