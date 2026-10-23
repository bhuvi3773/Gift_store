import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef(new Map());

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const notify = useCallback(
    ({ title, message = '', type = 'success', duration = 3800 }) => {
      const id = ++toastId;
      setToasts((current) => [...current.slice(-2), { id, title, message, type }]);
      const timer = window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
        timers.current.delete(id);
      }, duration);
      timers.current.set(id, timer);
      return id;
    },
    []
  );

  useEffect(
    () => () => {
      timers.current.forEach((timer) => window.clearTimeout(timer));
      timers.current.clear();
    },
    []
  );

  return (
    <ToastContext.Provider value={{ notify, dismiss, toasts }}>
      {children}
      <div className="toast-viewport" role="region" aria-label="Notifications">
        {toasts.map((toast) => (
          <div className={`toast toast--${toast.type}`} key={toast.id} role="status">
            <span className="toast__icon" aria-hidden="true">
              {toast.type === 'success' ? (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m5 12.5 4.2 4.2L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : toast.type === 'error' ? (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 8v5M12 16.5v.1" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 20s-7-4.1-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.9 12 20 12 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <div className="toast__body">
              <p className="toast__title">{toast.title}</p>
              {toast.message ? <p className="toast__message">{toast.message}</p> : null}
            </div>
            <button
              type="button"
              className="toast__close"
              onClick={() => dismiss(toast.id)}
              aria-label="Dismiss notification"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
