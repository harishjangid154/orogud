declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: any[]) => void;
  }
}

export {};
