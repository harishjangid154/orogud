// components/Header.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

type NavItem = { name: string; href: string };

const NAV: NavItem[] = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
  { name: "Categories", href: "/categories" },
  { name: "Blogs", href: "/blogs" },
  { name: "About", href: "/about" },
];

export default function Header(): JSX.Element {
  const pathname = usePathname?.() ?? "/";
  const router = useRouter();

  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<"terracotta" | "teal">(
    (typeof window !== "undefined" && (document.documentElement.getAttribute("data-theme") as any)) || "terracotta"
  );

  useEffect(() => {
    // sync document theme (if absent, default to terracotta)
    if (typeof window !== "undefined") {
      if (!document.documentElement.getAttribute("data-theme")) {
        document.documentElement.setAttribute("data-theme", theme);
      }
    }
  }, []);

  function toggleTheme() {
    const next = theme === "terracotta" ? "teal" : "terracotta";
    setTheme(next);
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", next);
    }
  }

  function onSearchSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return router.push("/products");
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
    setMobileOpen(false);
  }

  return (
    <header className="bg-surface border-b border-border sticky top-0 z-40 shadow-soft" role="banner">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 flex items-center gap-6 h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 flex-shrink-0" aria-label="OROGUD home">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: "var(--accent)" }}
          >
            <Image src="/og-image.png" alt="OROGUD" width={24} height={24} unoptimized className="h-full w-full" />
          </div>
          <span className="hidden sm:inline font-bold text-text text-xl tracking-tight">OROGUD</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10 ml-8" aria-label="Primary navigation">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base font-semibold transition-colors ${
                  active ? "text-accent" : "text-text hover:text-accent"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-4">

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="md:hidden btn btn-ghost"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t border-border bg-surface-2">
          <nav className="px-4 md:px-6 lg:px-8 xl:px-12 py-4 flex flex-col gap-2">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-3 px-4 rounded-lg transition-colors text-base font-semibold ${
                    active ? "text-accent bg-accent-light" : "text-text hover:bg-surface"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
