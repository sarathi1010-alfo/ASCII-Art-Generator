declare global {
  interface Window {
    gtag?: (command: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type EventParams = Record<string, string | number | boolean | null | undefined | unknown>;

export function trackEvent(eventName: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  try {
    const win = window as unknown as {
      gtag?: (command: string, ...args: unknown[]) => void;
      dataLayer?: unknown[];
    };
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    } else if (Array.isArray(win.dataLayer)) {
      win.dataLayer.push({ event: eventName, ...params });
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[GA4] Failed to track event "${eventName}":`, error);
    }
  }
}
