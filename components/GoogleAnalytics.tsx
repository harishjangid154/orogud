'use client';

import { useEffect } from 'react';

export default function GoogleAnalytics() {
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

  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-0F0579SN5C"></script>
    </>
  );
}
