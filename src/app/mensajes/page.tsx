'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';

const DEFAULT_COLOR = '#FF8000';
const DEFAULT_SIZE = 48;
const DEFAULT_SPEED = 60;
const DEFAULT_LOOPS = 3;
const DEFAULT_Y = -36;
const COOLDOWN_MS = 15000;
const HEALTHCHECK_URL = 'https://moderador.afonicanaranjo.com/health';
const POLL_INTERVAL_MS = 10000;
const TIMEOUT_MS = 3000;

type LiveStatus = 'checking' | 'online' | 'offline';

export default function MensajesPage() {
  const [text, setText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [liveStatus, setLiveStatus] = useState<LiveStatus>('checking');
  const tenorLoadedRef = useRef(false);

  const isInCooldown =
    lastSentAt !== null && Date.now() - lastSentAt < COOLDOWN_MS;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage('');
    setErrorMessage('');

    if (isSending || isInCooldown) return;

    const trimmed = text.trim();
    if (!trimmed) {
      setErrorMessage('Escribe un mensaje antes de enviarlo.');
      return;
    }

    if (trimmed.length > 120) {
      setErrorMessage('El mensaje no puede tener más de 120 caracteres.');
      return;
    }

    setIsSending(true);

    try {
      const payload = {
        text: trimmed,
        color: DEFAULT_COLOR,
        size: DEFAULT_SIZE,
        speed: DEFAULT_SPEED,
        loops: DEFAULT_LOOPS,
        y: DEFAULT_Y,
      };

      const response = await fetch(
        'https://moderador.afonicanaranjo.com/api/messages',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      setSuccessMessage(
        'Mensaje enviado. En unos segundos debería aparecer en la pantalla del concierto.'
      );
      setText('');
      setLastSentAt(Date.now());
    } catch (error) {
      setErrorMessage(
        'No hemos podido enviar tu mensaje. Prueba otra vez en unos segundos.'
      );
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkHealth = async () => {
      const controller = new AbortController();
      const timeoutId = window.setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const response = await fetch(HEALTHCHECK_URL, {
          method: 'GET',
          signal: controller.signal,
        });

        if (!response.ok) {
          if (isMounted) {
            setLiveStatus('offline');
          }
          return;
        }

        let data: unknown;
        try {
          data = await response.json();
        } catch {
          if (isMounted) {
            setLiveStatus('offline');
          }
          return;
        }

        if (
          isMounted &&
          typeof data === 'object' &&
          data !== null &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data as any).ok === true
        ) {
          setLiveStatus('online');
        } else if (isMounted) {
          setLiveStatus('offline');
        }
      } catch {
        if (isMounted) {
          setLiveStatus('offline');
        }
      } finally {
        window.clearTimeout(timeoutId);
      }
    };

    checkHealth();
    const intervalId = window.setInterval(checkHealth, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (liveStatus === 'offline' && !tenorLoadedRef.current) {
      const script = document.createElement('script');
      script.src = 'https://tenor.com/embed.js';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      tenorLoadedRef.current = true;
    }
  }, [liveStatus]);

  const remainingChars = 120 - text.length;

  return (
    <div className="min-h-screen bg-black text-white py-8 md:py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(#FF5733_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="container mx-auto px-4 max-w-2xl relative">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 text-center text-brand-orange">
          Envía tu mensaje al concierto
        </h1>
        <p className="text-center text-gray-300 mb-8 text-sm md:text-base">
          Escribe un mensaje corto y lo mandaremos a la pantalla LED del
          concierto. Sé breve, respetuoso y recuerda que hay más gente
          esperando para enviar el suyo.
        </p>

        <div className="text-center text-xs text-gray-400 mb-4">
          {liveStatus === 'checking' && 'Comprobando directo…'}
          {liveStatus === 'online' &&
            'Estamos en directo: puedes enviar tu mensaje.'}
          {liveStatus === 'offline' &&
            'Ahora mismo el sistema de mensajes está desactivado.'}
        </div>

        {liveStatus === 'online' && (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-4 md:p-6 space-y-6 shadow-lg"
          >
            <div>
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium text-gray-200 mb-2"
              >
                Mensaje (máx. 120 caracteres)
              </label>
              <textarea
                id="mensaje"
                value={text}
                onChange={(event) =>
                  setText(event.target.value.slice(0, 120))
                }
                maxLength={120}
                rows={4}
                className="w-full rounded-lg bg-black/60 border border-zinc-800 text-white px-3 py-2 text-sm md:text-base focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-none"
                placeholder="Ejemplo: ¡Viva Afónica Naranjo y mi pueblo entero!"
              />
              <div className="mt-1 text-xs text-gray-400 text-right">
                {remainingChars} caracteres restantes
              </div>
            </div>

            <div className="text-xs text-gray-400">
              <ul className="space-y-1 list-disc list-inside">
                <li>Máx. 120 caracteres.</li>
                <li>Sin insultos, odio ni datos personales.</li>
                <li>Podemos moderar o rechazar mensajes.</li>
              </ul>
            </div>

            {successMessage && (
              <div className="text-sm text-green-400 bg-green-900/20 border border-green-700/50 rounded-md px-3 py-2">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="text-sm text-red-400 bg-red-900/20 border border-red-700/50 rounded-md px-3 py-2">
                {errorMessage}
              </div>
            )}

            {isInCooldown && (
              <div className="text-xs text-amber-300 bg-amber-900/20 border border-amber-700/50 rounded-md px-3 py-2">
                Gracias por tu mensaje. Espera unos segundos antes de enviar
                otro para no saturar la pantalla.
              </div>
            )}

            <button
              type="submit"
              disabled={isSending || isInCooldown}
              className="w-full inline-flex items-center justify-center rounded-lg bg-brand-orange text-black font-semibold px-4 py-3 text-sm md:text-base disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#ff9440] transition-colors"
            >
              {isSending
                ? 'Enviando mensaje...'
                : isInCooldown
                ? 'Espera un momento antes de enviar otro'
                : 'Enviar mensaje a la pantalla'}
            </button>
          </form>
        )}

        {liveStatus === 'offline' && (
          <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-xl p-4 md:p-6 space-y-4 shadow-lg mt-4">
            <p className="text-center text-base md:text-lg font-semibold text-brand-orange">
              OH OH ahora mismo no estamos en directo
            </p>
            <div className="mt-2">
              <div
                className="tenor-gif-embed"
                data-postid="11062411"
                data-share-method="host"
                data-aspect-ratio="0.840625"
                data-width="100%"
              >
                <a href="https://tenor.com/view/dennis-nedry-no-jurassic-park-wayne-knight-gif-11062411">
                  Dennis Nedry No GIF
                </a>
                from{' '}
                <a href="https://tenor.com/search/dennis+nedry-gifs">
                  Dennis Nedry GIFs
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

