"use client";
import { useEffect, useState, useCallback } from 'react';

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
}

interface PageView {
  path: string;
  title: string;
  timestamp: number;
  duration?: number;
}

interface UserBehavior {
  sessionId: string;
  pageViews: PageView[];
  events: AnalyticsEvent[];
  startTime: number;
  lastActivity: number;
}

export function useAnalytics() {
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const [userBehavior, setUserBehavior] = useState<UserBehavior>({
    sessionId,
    pageViews: [],
    events: [],
    startTime: Date.now(),
    lastActivity: Date.now(),
  });

  // Track page view
  const trackPageView = useCallback((path: string, title: string) => {
    const pageView: PageView = {
      path,
      title,
      timestamp: Date.now(),
    };

    setUserBehavior(prev => ({
      ...prev,
      pageViews: [...prev.pageViews, pageView],
      lastActivity: Date.now(),
    }));

    // Send to analytics service
    sendAnalyticsData('page_view', { path, title });
  }, []);

  // Track custom event
  const trackEvent = useCallback((event: string, properties: Record<string, any> = {}) => {
    const analyticsEvent: AnalyticsEvent = {
      event,
      properties,
      timestamp: Date.now(),
    };

    setUserBehavior(prev => ({
      ...prev,
      events: [...prev.events, analyticsEvent],
      lastActivity: Date.now(),
    }));

    // Send to analytics service
    sendAnalyticsData('custom_event', { event, properties });
  }, []);

  // Track user interaction
  const trackInteraction = useCallback((element: string, action: string, properties: Record<string, any> = {}) => {
    trackEvent('interaction', {
      element,
      action,
      ...properties,
    });
  }, [trackEvent]);

  // Track performance metrics
  const trackPerformance = useCallback((metric: string, value: number) => {
    trackEvent('performance', {
      metric,
      value,
    });
  }, [trackEvent]);

  // Send data to analytics service
  const sendAnalyticsData = useCallback(async (type: string, data: any) => {
    try {
      const payload = {
        type,
        data,
        sessionId,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        screen: {
          width: screen.width,
          height: screen.height,
        },
        language: navigator.language,
      };

      // Send to your analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  }, [sessionId]);

  // Track session duration
  useEffect(() => {
    const interval = setInterval(() => {
      const duration = Date.now() - userBehavior.startTime;
      trackPerformance('session_duration', duration);
    }, 60000); // Track every minute

    return () => clearInterval(interval);
  }, [userBehavior.startTime, trackPerformance]);

  // Track page load performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const trackPageLoad = () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          trackPerformance('page_load_time', navigation.loadEventEnd - navigation.loadEventStart);
          trackPerformance('dom_content_loaded', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart);
        }
      };

      if (document.readyState === 'complete') {
        trackPageLoad();
      } else {
        window.addEventListener('load', trackPageLoad);
        return () => window.removeEventListener('load', trackPageLoad);
      }
    }
  }, [trackPerformance]);

  return {
    trackPageView,
    trackEvent,
    trackInteraction,
    trackPerformance,
    userBehavior,
  };
}

// Analytics Dashboard Component
export function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState({
    pageViews: 0,
    events: 0,
    sessionDuration: 0,
    topPages: [] as string[],
  });

  const { userBehavior } = useAnalytics();

  useEffect(() => {
    // Calculate analytics from user behavior
    const pageViews = userBehavior.pageViews.length;
    const events = userBehavior.events.length;
    const sessionDuration = Date.now() - userBehavior.startTime;
    
    // Get top pages
    const pageCounts = userBehavior.pageViews.reduce((acc, page) => {
      acc[page.path] = (acc[page.path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topPages = Object.entries(pageCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([path]) => path);

    setAnalytics({
      pageViews,
      events,
      sessionDuration,
      topPages,
    });
  }, [userBehavior]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{analytics.pageViews}</div>
          <div className="text-sm text-gray-600">Pages vues</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{analytics.events}</div>
          <div className="text-sm text-gray-600">Événements</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {Math.round(analytics.sessionDuration / 1000)}s
          </div>
          <div className="text-sm text-gray-600">Durée session</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {userBehavior.sessionId.slice(0, 6)}
          </div>
          <div className="text-sm text-gray-600">Session ID</div>
        </div>
      </div>

      {analytics.topPages.length > 0 && (
        <div>
          <h4 className="text-md font-medium text-gray-900 mb-2">Pages les plus visitées</h4>
          <ul className="space-y-1">
            {analytics.topPages.map((page, index) => (
              <li key={page} className="text-sm text-gray-600">
                {index + 1}. {page}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
} 