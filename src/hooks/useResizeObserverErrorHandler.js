// hooks/useResizeObserverErrorHandler.js
import { useEffect } from 'react';

const useResizeObserverErrorHandler = () => {
  useEffect(() => {
    const resizeObserverErrHandler = (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', resizeObserverErrHandler);

    return () => {
      window.removeEventListener('error', resizeObserverErrHandler);
    };
  }, []);
};

export default useResizeObserverErrorHandler;
