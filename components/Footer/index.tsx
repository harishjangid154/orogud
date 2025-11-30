// components/Footer.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-subtle mt-16 px-8">
      <div className="container-max py-10 grid gap-6 grid-cols-1 md:grid-cols-4">
        {/* Brand & short */}
        <div>
          <Link href="/" className="flex items-center gap-3 mb-3" aria-label="OROGUD home">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ background: "var(--accent)" }}
            >
              <Image src="/og-image.png" alt="OROGUD" width={20} height={20} unoptimized className="h-full w-full" />
            </div>
            <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>
              OROGUD
            </span>
          </Link>

          <p className="muted max-w-xs">
            OROGUD curates wholesome homegrown and household products — from washed ghee and jaggery to wooden
            cookware and homewares. Natural, vetted, and delivered with care.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Shop</h4>
          <ul className="flex flex-col gap-2 footer-quiet">
            <li>
              <Link href="/products">All Products</Link>
            </li>
            <li>
              <Link href="/products?category=food">Food & Pantry</Link>
            </li>
            <li>
              <Link href="/products?category=home">Home & Living</Link>
            </li>
            <li>
              <Link href="/products?category=skincare">Wellness & Care</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Resources</h4>
          <ul className="flex flex-col gap-2 footer-quiet">
            <li>
              <Link href="/blogs">Blog</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/shipping">Shipping & Returns</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter / contact */}
        <div>
          <h4 className="text-sm font-semibold mb-3">Stay in the loop</h4>
          <p className="muted text-sm mb-3">Get product drops, tips, and offers — curated for simple living.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              // implement subscription action
              // keep it simple for now; replace with your API call
              const target = e.target as HTMLFormElement;
              const input = target.querySelector<HTMLInputElement>("input[name=email]");
              if (input) {
                alert(`Subscribed: ${input.value}`);
                input.value = "";
              }
            }}
            className="flex gap-2"
          >
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="rounded-md border px-3 py-2 text-sm bg-surface border-subtle flex-1"
            />
            <button type="submit" className="btn btn-primary btn-sm">
              Subscribe
            </button>
          </form>

          <div className="mt-4 text-sm muted">
            <div>Contact: <Link href="mailto:founders@orogud.com">founders@orogud.com</Link></div>
            <div className="mt-2">© {year} OROGUD · All rights reserved</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
