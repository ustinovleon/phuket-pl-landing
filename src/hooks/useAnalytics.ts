import { useCallback } from 'react';
import type { AnalyticsEvent, AnalyticsPayload } from '../types';

export function useAnalytics() {
  const trackEvent = useCallback((
    event: AnalyticsEvent, 
    properties?: Record<string, string | number | boolean>
  ) => {
    const payload: AnalyticsPayload = {
      event,
      properties,
      timestamp: new Date(),
    };

    // Log to console in development
    console.log('📊 Analytics Event:', payload);

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, properties);
    }

    // Send to custom endpoint if needed
    // fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) });
  }, []);

  return { trackEvent };
}
