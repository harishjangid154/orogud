"use client";

import Link from "next/link";
import { useState } from "react";

type Blog = {
  slug: string;
  title: string;
  date?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
};

type BlogCarouselProps = {
  blogs: Blog[];
  title: string;
  viewAllLink?: string;
};

export default function BlogCarousel({ blogs, title, viewAllLink }: BlogCarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction: "left" | "right") => {
    const container = document.getElementById(`blog-carousel-${title.replace(/\s+/g, "-")}`);
    if (!container) return;

    const scrollAmount = 320;
    const newPosition = direction === "left" 
      ? scrollPosition - scrollAmount 
      : scrollPosition + scrollAmount;
    
    const maxScroll = container.scrollWidth - container.clientWidth;
    const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));
    
    container.scrollTo({ left: clampedPosition, behavior: "smooth" });
    setScrollPosition(clampedPosition);
  };

  if (blogs.length === 0) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-bold text-text">{title}</h2>
        {viewAllLink && (
          <Link 
            href={viewAllLink} 
            className="text-sm text-accent hover:text-accent-600 font-medium transition-colors"
          >
            View all →
          </Link>
        )}
      </div>

      <div className="relative">
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
          id={`blog-carousel-${title.replace(/\s+/g, "-")}`}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onScroll={(e) => setScrollPosition(e.currentTarget.scrollLeft)}
        >
          {blogs.map((blog) => {
            const displayDate = blog.date
              ? new Date(blog.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : null;

            return (
              <article
                key={blog.slug}
                className="card card-pad-md hover:shadow-md transition-all flex-shrink-0 w-[300px]"
              >
                {blog.coverImage && (
                  <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden rounded-lg mb-2">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-full h-44 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                )}

                <div>
                  <h3 className="text-lg font-semibold text-text mb-2 line-clamp-2">
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-accent transition-colors">
                      {blog.title}
                    </Link>
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-muted mb-2">
                    {blog.author && <span>{blog.author}</span>}
                    {displayDate && (
                      <>
                        <span>·</span>
                        <span>{displayDate}</span>
                      </>
                    )}
                  </div>

                  {blog.excerpt && (
                    <p className="text-muted text-sm mb-2 line-clamp-2">{blog.excerpt}</p>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-2 flex-wrap">
                      {blog.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="badge text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={`/blogs/${blog.slug}`} className="btn btn-primary btn-sm">
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {scrollPosition < (blogs.length * 320 - 1200) && (
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

