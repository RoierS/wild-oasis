import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  listenCapture = true,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handler();
    };

    document.addEventListener('click', handleClick, listenCapture);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick, listenCapture);
    };
  }, [handler, listenCapture]);

  return { ref };
};
