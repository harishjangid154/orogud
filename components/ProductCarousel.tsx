"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { trackClick, trackProductView } from "@/lib/analytics";

type Product = {
  slug: string;
  title: string;
  price?: string | number;
  excerpt?: string;
  images?: string[];
  category?: string;
};

type ProductCarouselProps = {
  products: Product[];
  title: string;
  viewAllLink?: string;
};

export default function ProductCarousel({ products, title, viewAllLink }: ProductCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`carousel-${title.replace(/\s+/g, "-")}`);
    if (!container) return;

    const scrollAmount = 320; // card width + gap
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    container.scrollTo({ left: clampedPosition, behavior: "smooth" });
    setScrollPosition(clampedPosition);
    trackClick('button', `Carousel: Scroll ${direction}`, `carousel-scroll-${direction}`);
  };

  if (products.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink} 
            className="text-sm text-accent hover:text-accent-600 font-medium transition-colors"
            onClick={() => trackClick('link', `View all: ${title}`, `carousel-view-all-${title.toLowerCase().replace(/\s+/g, '-')}`)}
          >
            View all →
          </Link>
        )}
      </div>

      <div className="relative">
        {/* Scroll buttons */}
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-surface border border-border rounded-full p-2 shadow-md hover:bg-surface-2 transition-colors"
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div
          id={`carousel-${title.replace(/\s+/g, "-")}`}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {products.map((product) => (
            <article
              key={product.slug}
              className="card card-pad-md hover:shadow-md transition-all flex-shrink-0 w-[300px]"
            >
              {product.images && product.images.length > 0 && (
                <Link href={`/products/${product.slug}`} className="block overflow-hidden rounded-lg mb-2" onClick={() => trackProductView(product.slug, product.title, product.category)}>
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-44 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    height={176}
                    width={300}
                    quality={100}
                    priority
                    unoptimized
                  />
                </Link>
              )}

              <div>
                <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
                  <Link href={`/products/${product.slug}`} className="hover:text-accent transition-colors" onClick={() => trackProductView(product.slug, product.title, product.category)}>
                    {product.title}
                  </Link>
                </h3>
                {product.excerpt && (
                  <p className="text-muted text-sm mb-2 line-clamp-2">{product.excerpt}</p>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    {product.category && (
                      <span className="badge text-xs">{product.category}</span>
                    )}
                    {product.price && (
                      <div className="text-sm font-semibold text-accent">
                        {typeof product.price === "number" ? `₹${product.price}` : product.price}
                      </div>
                    )}
                  </div>
                  <Link href={`/products/${product.slug}`} className="btn btn-primary btn-sm" onClick={() => trackProductView(product.slug, product.title, product.category)}>
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {scrollPosition < (products.length * 320 - 1200) && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-surface border border-border rounded-full p-2 shadow-md hover:bg-surface-2 transition-colors"
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

