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
  { name: "Categories", href: "/products" },
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
    <header className="bg-surface border-b py-2 px-8" role="banner">
      <div className="container-max flex items-center gap-4 h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3" aria-label="OROGUD home">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden"
              style={{ background: "var(--accent)" }}
            >
              {/* small svg mark — replace with your logo file if available */}
              <Image src="/og-image.png" alt="OROGUD" width={20} height={20} unoptimized className="h-full w-full" />
            </div>

          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-6 ml-6" aria-label="Primary navigation">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium ${active ? "text-accent" : "muted"} hover:text-accent`}
                aria-current={active ? "page" : undefined}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Search (desktop) + actions */}
        <div className="ml-auto flex items-center gap-3">


          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((s) => !s)}
            className="sm:hidden btn btn-ghost"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className={`${mobileOpen ? "block" : "hidden"} sm:hidden border-t border-subtle bg-surface-2`}>
        <div className="container-max py-3">

          <nav className="flex flex-col gap-2">
            {NAV.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 px-2 rounded-md ${active ? "text-accent" : "text-text"} hover:bg-surface`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
