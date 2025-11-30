'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView, trackScrollDepth, trackClick } from '@/lib/analytics';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Initialize dataLayer
    (window as any).dataLayer = (window as any).dataLayer || [];
    
    // Define gtag function
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    
    // Set gtag on window
    (window as any).gtag = gtag;
    
    // Initialize GA
    gtag('js', new Date());
    gtag('config', 'G-0F0579SN5C');
  }, []);

  // Track page views on route change
  useEffect(() => {
    trackPageView(pathname, document.title);
  }, [pathname]);

  // Track scroll depth
  useEffect(() => {
    const unsubscribe = trackScrollDepth();
    return () => unsubscribe?.();
  }, []);

  // Track clicks on buttons and cards
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Track button clicks
      if (target.tagName === 'BUTTON') {
        const buttonText = target.textContent || 'Unknown Button';
        const buttonId = target.id || undefined;
        trackClick('button', buttonText, buttonId);
      }
      
      // Track card clicks (elements with data-card attribute)
      const card = target.closest('[data-card]');
      if (card) {
        const cardName = card.getAttribute('data-card-name') || 'Unknown Card';
        const cardId = card.getAttribute('data-card-id') || undefined;
        trackClick('card', cardName, cardId);
      }
      
      // Track link clicks
      const link = target.closest('a');
      if (link && link.href) {
        const linkText = link.textContent || 'Unknown Link';
        const isExternal = !link.href.startsWith(window.location.origin);
        trackClick('link', linkText, link.id, { url: link.href, is_external: isExternal });
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0F0579SN5C"></script>
    </>
  );
}
