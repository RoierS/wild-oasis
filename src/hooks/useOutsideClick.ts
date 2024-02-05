import { useEffect, useRef } from 'react';

export const useOutsideClick = (handler: () => void, listenCapture = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) =>
      !ref.current?.contains(e.target as Node) && handler();

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
