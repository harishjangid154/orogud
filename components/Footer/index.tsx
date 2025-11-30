// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { JSX } from "react";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border mt-16">
      <div className="container-max py-12 px-4 md:px-8">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-5 mb-8">
          {/* Brand & description */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="OROGUD home">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
                style={{ background: "var(--accent)" }}
              >
                <Image src="/og-image.png" alt="OROGUD" width={20} height={20} unoptimized className="h-full w-full" />
              </div>
              <span className="text-lg font-semibold text-text">OROGUD</span>
            </Link>

            <p className="text-muted text-sm leading-relaxed max-w-sm">
              OROGUD curates wholesome homegrown and household products — from washed ghee and jaggery to wooden
              cookware and homewares. Natural, vetted, and delivered with care.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">Shop</h4>
            <ul className="flex flex-col gap-3 footer-quiet">
              <li>
                <Link href="/products" className="text-sm">All Products</Link>
              </li>
              <li>
                <Link href="/products?category=food" className="text-sm">Food & Pantry</Link>
              </li>
              <li>
                <Link href="/products?category=home" className="text-sm">Home & Living</Link>
              </li>
              <li>
                <Link href="/products?category=skincare" className="text-sm">Wellness & Care</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">Resources</h4>
            <ul className="flex flex-col gap-3 footer-quiet">
              <li>
                <Link href="/blogs" className="text-sm">Blog</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm">About Us</Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm">Shipping & Returns</Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-text mb-4">Newsletter</h4>
            <p className="text-muted text-sm mb-4 leading-relaxed">Get product drops, tips, and offers — curated for simple living.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const target = e.target as HTMLFormElement;
                const input = target.querySelector<HTMLInputElement>("input[name=email]");
                if (input) {
                  alert(`Subscribed: ${input.value}`);
                  input.value = "";
                }
              }}
              className="flex flex-col gap-2"
            >
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="rounded-md border px-3 py-2 text-sm bg-surface border-border"
              />
              <button type="submit" className="btn btn-primary btn-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted">
              © {year} OROGUD · All rights reserved
            </div>
            <div className="text-sm text-muted">
              <Link href="mailto:founders@orogud.com" className="text-accent hover:text-accent-600 transition-colors">
                founders@orogud.com
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
