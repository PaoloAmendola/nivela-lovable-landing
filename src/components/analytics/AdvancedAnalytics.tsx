import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  userId?: string;
}

interface ConversionGoal {
  id: string;
  name: string;
  trigger: string;
  value?: number;
}

interface UserSession {
  id: string;
  startTime: number;
  endTime?: number;
  pageViews: number;
  events: AnalyticsEvent[];
  referrer: string;
  userAgent: string;
  device: string;
  browser: string;
}

class AdvancedAnalytics {
  private events: AnalyticsEvent[] = [];
  private session: UserSession;
  private goals: ConversionGoal[] = [];
  private heatmapData: Array<{ x: number; y: number; intensity: number }> = [];

  constructor() {
    this.session = this.initializeSession();
    this.setupEventListeners();
    this.initializeGoals();
  }

  private initializeSession(): UserSession {
    const sessionId = this.generateSessionId();
    return {
      id: sessionId,
      startTime: Date.now(),
      pageViews: 0,
      events: [],
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      device: this.detectDevice(),
      browser: this.detectBrowser()
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private detectDevice(): string {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
    
    if (isMobile && !isTablet) return 'mobile';
    if (isTablet) return 'tablet';
    return 'desktop';
  }

  private detectBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'chrome';
    if (userAgent.includes('Firefox')) return 'firefox';
    if (userAgent.includes('Safari')) return 'safari';
    if (userAgent.includes('Edge')) return 'edge';
    return 'unknown';
  }

  private initializeGoals() {
    this.goals = [
      { id: 'contact_form', name: 'Formulário de Contato', trigger: 'form_submit' },
      { id: 'distributor_form', name: 'Formulário Distribuidor', trigger: 'distributor_submit' },
      { id: 'video_watch', name: 'Vídeo Assistido', trigger: 'video_complete' },
      { id: 'scroll_depth', name: 'Scroll 80%', trigger: 'scroll_80' },
      { id: 'time_on_site', name: 'Tempo no Site 5min', trigger: 'time_5min' }
    ];
  }

  private setupEventListeners() {
    // Tracking de cliques
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const elementInfo = this.getElementInfo(target);
      
      this.track('click', {
        element: elementInfo.tagName,
        text: elementInfo.text,
        classes: elementInfo.classes,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });

      // Heatmap data
      this.heatmapData.push({
        x: e.clientX,
        y: e.clientY,
        intensity: 1
      });
    });

    // Tracking de scroll
    let lastScrollPercent = 0;
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent > lastScrollPercent && scrollPercent % 25 === 0) {
        this.track('scroll', { percent: scrollPercent });
        
        if (scrollPercent >= 80) {
          this.trackGoal('scroll_depth');
        }
      }
      
      lastScrollPercent = scrollPercent;
    });

    // Tracking de tempo na página
    let timeOnPage = 0;
    setInterval(() => {
      timeOnPage += 1;
      
      if (timeOnPage === 300) { // 5 minutos
        this.trackGoal('time_on_site');
      }
    }, 1000);

    // Tracking de saída
    window.addEventListener('beforeunload', () => {
      this.session.endTime = Date.now();
      this.sendSession();
    });

    // Tracking de visibilidade
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.track('page_hidden');
      } else {
        this.track('page_visible');
      }
    });
  }

  private getElementInfo(element: HTMLElement) {
    return {
      tagName: element.tagName.toLowerCase(),
      text: element.textContent?.trim() || '',
      classes: element.className,
      id: element.id
    };
  }

  track(eventName: string, properties: Record<string, any> = {}) {
    const event: AnalyticsEvent = {
      name: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
        device: this.session.device,
        browser: this.session.browser
      },
      timestamp: Date.now(),
      sessionId: this.session.id
    };

    this.events.push(event);
    this.session.events.push(event);

    // Enviar evento para analytics
    this.sendEvent(event);
  }

  trackGoal(goalId: string, value?: number) {
    const goal = this.goals.find(g => g.id === goalId);
    if (!goal) return;

    this.track('conversion', {
      goalId: goal.id,
      goalName: goal.name,
      value: value || goal.value || 0
    });
  }

  trackPageView(path?: string) {
    this.session.pageViews++;
    
    this.track('page_view', {
      path: path || window.location.pathname,
      title: document.title,
      search: window.location.search,
      hash: window.location.hash
    });
  }

  // Tracking de formulários
  trackFormStart(formName: string) {
    this.track('form_start', { formName });
  }

  trackFormSubmit(formName: string, formData: Record<string, any>) {
    this.track('form_submit', { 
      formName, 
      fields: Object.keys(formData),
      hasErrors: false
    });
    
    // Trackear goal baseado no formulário
    if (formName === 'contact') {
      this.trackGoal('contact_form');
    } else if (formName === 'distributor') {
      this.trackGoal('distributor_form');
    }
  }

  trackFormError(formName: string, errors: string[]) {
    this.track('form_error', { formName, errors });
  }

  // Tracking de vídeo
  trackVideoStart(videoId: string) {
    this.track('video_start', { videoId });
  }

  trackVideoComplete(videoId: string, duration: number) {
    this.track('video_complete', { videoId, duration });
    this.trackGoal('video_watch');
  }

  trackVideoProgress(videoId: string, progress: number) {
    if (progress % 25 === 0) { // 25%, 50%, 75%, 100%
      this.track('video_progress', { videoId, progress });
    }
  }

  // Tracking de performance
  trackPerformance(metrics: Record<string, number>) {
    this.track('performance', metrics);
  }

  // Tracking de erros
  trackError(error: Error, context?: string) {
    this.track('error', {
      message: error.message,
      stack: error.stack,
      context: context || 'unknown'
    });
  }

  // Enviar eventos para serviços de analytics
  private sendEvent(event: AnalyticsEvent) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event);
      return;
    }

    // Google Analytics 4
    if (typeof (window as any).gtag !== 'undefined') {
      (window as any).gtag('event', event.name, event.properties);
    }

    // Facebook Pixel
    if (typeof (window as any).fbq !== 'undefined') {
      (window as any).fbq('track', event.name, event.properties);
    }

    // Custom analytics endpoint
    this.sendToCustomEndpoint(event);
  }

  private sendToCustomEndpoint(event: AnalyticsEvent) {
    // Implementar envio para endpoint customizado
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(event)
    }).catch(error => {
      console.warn('Erro ao enviar evento:', error);
    });
  }

  private sendSession() {
    if (process.env.NODE_ENV === 'development') {
      console.log('Session Data:', this.session);
      return;
    }

    // Enviar dados da sessão
    fetch('/api/analytics/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.session)
    }).catch(error => {
      console.warn('Erro ao enviar sessão:', error);
    });
  }

  // Obter dados de analytics
  getSessionData() {
    return this.session;
  }

  getEvents() {
    return this.events;
  }

  getHeatmapData() {
    return this.heatmapData;
  }

  getConversionFunnel() {
    const funnelSteps = [
      { name: 'Página Inicial', events: this.events.filter(e => e.name === 'page_view') },
      { name: 'Scroll 50%', events: this.events.filter(e => e.name === 'scroll' && e.properties.percent >= 50) },
      { name: 'Interação', events: this.events.filter(e => e.name === 'click') },
      { name: 'Conversão', events: this.events.filter(e => e.name === 'conversion') }
    ];

    return funnelSteps.map(step => ({
      name: step.name,
      count: step.events.length,
      rate: step.events.length / this.session.pageViews
    }));
  }
}

const analytics = new AdvancedAnalytics();

export const AdvancedAnalyticsProvider = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    analytics.trackPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    // Expor analytics globalmente
    (window as any).analytics = analytics;

    // Setup error tracking
    window.addEventListener('error', (e) => {
      analytics.trackError(e.error, 'window_error');
    });

    window.addEventListener('unhandledrejection', (e) => {
      analytics.trackError(new Error(e.reason), 'unhandled_promise');
    });

  }, []);

  return null;
};

// Hook para usar analytics
export const useAdvancedAnalytics = () => {
  const track = useCallback((eventName: string, properties?: Record<string, any>) => {
    analytics.track(eventName, properties);
  }, []);

  const trackGoal = useCallback((goalId: string, value?: number) => {
    analytics.trackGoal(goalId, value);
  }, []);

  const trackForm = useCallback((action: 'start' | 'submit' | 'error', formName: string, data?: any) => {
    switch (action) {
      case 'start':
        analytics.trackFormStart(formName);
        break;
      case 'submit':
        analytics.trackFormSubmit(formName, data);
        break;
      case 'error':
        analytics.trackFormError(formName, data);
        break;
    }
  }, []);

  const trackVideo = useCallback((action: 'start' | 'complete' | 'progress', videoId: string, data?: any) => {
    switch (action) {
      case 'start':
        analytics.trackVideoStart(videoId);
        break;
      case 'complete':
        analytics.trackVideoComplete(videoId, data);
        break;
      case 'progress':
        analytics.trackVideoProgress(videoId, data);
        break;
    }
  }, []);

  return {
    track,
    trackGoal,
    trackForm,
    trackVideo,
    trackError: analytics.trackError.bind(analytics),
    trackPerformance: analytics.trackPerformance.bind(analytics),
    getSessionData: analytics.getSessionData.bind(analytics),
    getConversionFunnel: analytics.getConversionFunnel.bind(analytics)
  };
};