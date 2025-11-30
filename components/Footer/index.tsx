// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";
import { trackClick, trackFormSubmission } from "@/lib/analytics";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mb-12">
          {/* Brand & description */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="OROGUD home" onClick={() => trackClick('link', 'Logo', 'footer-logo')}>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: "var(--accent)" }}
              >
                <Image src="/og-image.png" alt="OROGUD" width={24} height={24} unoptimized className="h-full w-full" />
              </div>
              <span className="text-xl font-bold text-text tracking-tight">OROGUD</span>
            </Link>

            <p className="text-base text-muted leading-relaxed max-w-md">
              OROGUD curates wholesome homegrown and household products — from washed ghee and jaggery to wooden
              cookware and homewares. Natural, vetted, and delivered with care.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-base font-bold text-text mb-6 uppercase tracking-wide">Shop</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/products" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: All Products', 'footer-all-products')}>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Health%20%26%20Wellness" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Health & Wellness', 'footer-health-wellness')}>
                  Health & Wellness
                </Link>
              </li>
              <li>
                <Link href="/products?category=Food%20%26%20Pantry" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Food & Pantry', 'footer-food-pantry')}>
                  Food & Pantry
                </Link>
              </li>
              <li>
                <Link href="/products?category=Skin%20Care" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Skin Care', 'footer-skin-care')}>
                  Skin Care
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tea%20%26%20Beverages" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Tea & Beverages', 'footer-tea-beverages')}>
                  Tea & Beverages
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-base text-accent hover:text-accent-600 transition-colors font-semibold" onClick={() => trackClick('link', 'Footer: View All Categories', 'footer-view-all-categories')}>
                  View All Categories →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-bold text-text mb-6 uppercase tracking-wide">Resources</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/blogs" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Blog', 'footer-blog')}>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: About Us', 'footer-about-us')}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: Shipping & Returns', 'footer-shipping-returns')}>
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-base text-muted hover:text-accent transition-colors font-medium" onClick={() => trackClick('link', 'Footer: FAQ', 'footer-faq')}>
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-base font-bold text-text mb-6 uppercase tracking-wide">Newsletter</h4>
            <p className="text-base text-muted mb-6 leading-relaxed">Get product drops, tips, and offers — curated for simple living.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const input = target.querySelector<HTMLInputElement>("input[name=email]");
                if (input) {
                  trackFormSubmission('newsletter_signup', { email_domain: input.value.split('@')[1] });
                  alert(`Subscribed: ${input.value}`);
                  input.value = "";
                }
              }}
              className="flex flex-col gap-3"
            >
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="rounded-lg border px-4 py-3 text-base bg-surface border-border focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
              <button type="submit" className="btn btn-primary" onClick={() => trackClick('button', 'Newsletter Subscribe', 'newsletter-subscribe')}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-base text-muted font-medium">
              © {year} OROGUD · All rights reserved
            </div>
            <div className="text-base text-muted">
              <Link href="mailto:founders@orogud.com" className="text-accent hover:text-accent-600 transition-colors font-semibold" onClick={() => trackClick('link', 'Footer: Email', 'footer-email')}>
                founders@orogud.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
