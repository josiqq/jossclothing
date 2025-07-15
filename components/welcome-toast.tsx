'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    // ignore if screen height is too small
    if (window.innerHeight < 650) return;
    if (!document.cookie.includes('welcome-toast=2')) {
      toast('🛍️ ¡Bienvenido!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          document.cookie = 'welcome-toast=2; max-age=31536000; path=/';
        },
        description: (
          <>
            ¡Bienvenido a la tienda de ropa!
            <a
              href="/"
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              Explora la tienda
            </a>
            .
          </>
        )
      });
    }
  }, []);

  return null;
}
