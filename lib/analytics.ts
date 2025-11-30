/**
 * Analytics utility for tracking user interactions
 * All events are sent to Google Analytics (GA_ID: G-0F0579SN5C)
 */

/**
 * Track page view
 * Automatically called on route changes
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || document.title,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track scroll depth
 * Tracks when user scrolls to 25%, 50%, 75%, 100% of page
 */
export const trackScrollDepth = () => {
  if (typeof window === 'undefined') return;

  const trackingThresholds = [25, 50, 75, 100];
  const trackedThresholds = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / scrollHeight) * 100;

    trackingThresholds.forEach((threshold) => {
      if (scrolled >= threshold && !trackedThresholds.has(threshold)) {
        trackedThresholds.add(threshold);
        if (window.gtag) {
          window.gtag('event', 'scroll_depth', {
            scroll_percentage: threshold,
            page_title: document.title,
            timestamp: new Date().toISOString(),
          });
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => window.removeEventListener('scroll', handleScroll);
};

/**
 * Track button/card clicks
 * @param elementType - Type of element (button, card, link, etc.)
 * @param elementName - Name or label of the element
 * @param elementId - Optional ID of the element
 * @param additionalData - Any additional data to track
 */
export const trackClick = (
  elementType: string,
  elementName: string,
  elementId?: string,
  additionalData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'element_click', {
      element_type: elementType,
      element_name: elementName,
      element_id: elementId,
      ...additionalData,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track product view
 * @param productId - Product ID or slug
 * @param productName - Product name
 * @param category - Product category
 */
export const trackProductView = (
  productId: string,
  productName: string,
  category?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      items: [
        {
          item_id: productId,
          item_name: productName,
          item_category: category,
        },
      ],
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track blog/article view
 * @param articleId - Article ID or slug
 * @param articleTitle - Article title
 * @param category - Article category
 */
export const trackArticleView = (
  articleId: string,
  articleTitle: string,
  category?: string
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_article', {
      article_id: articleId,
      article_title: articleTitle,
      article_category: category,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track form submission
 * @param formName - Name of the form
 * @param formData - Optional form data (non-sensitive)
 */
export const trackFormSubmission = (
  formName: string,
  formData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'form_submit', {
      form_name: formName,
      ...formData,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track custom event
 * @param eventName - Name of the event
 * @param eventData - Event data
 */
export const trackCustomEvent = (
  eventName: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...eventData,
      timestamp: new Date().toISOString(),
    });
  }
};

/**
 * Track link click (external or internal)
 * @param linkUrl - URL of the link
 * @param linkText - Text of the link
 * @param isExternal - Whether the link is external
 */
export const trackLinkClick = (
  linkUrl: string,
  linkText: string,
  isExternal: boolean = false
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'link_click', {
      link_url: linkUrl,
      link_text: linkText,
      is_external: isExternal,
      timestamp: new Date().toISOString(),
    });
  }
};
