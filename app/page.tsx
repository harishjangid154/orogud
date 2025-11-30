// app/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";

type BlogData = {
  title: string;
  date?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  tags?: string[];
  content?: string;
};

type ProductData = {
  title: string;
  slug?: string;
  date?: string;
  price?: string | number;
  excerpt?: string;
  images?: string[]; // relative paths like "/images/p-1.jpg"
  category?: string;
  featured?: boolean;
  content?: string;
};

const BLOGS_DIR = path.join(process.cwd(), "data", "blogs");
const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

async function readJsonDir(dir: string): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(dir);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/i, ""));
  } catch {
    return [];
  }
}

async function loadJson<T>(dir: string, slug: string): Promise<T | null> {
  const file = path.join(dir, `${slug}.json`);
  try {
    const raw = await fs.promises.readFile(file, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function loadLatestBlogs(limit = 3): Promise<Array<BlogData & { slug: string }>> {
  const slugs = await readJsonDir(BLOGS_DIR);
  const arr: Array<BlogData & { slug: string }> = [];
  for (const s of slugs) {
    const b = await loadJson<BlogData>(BLOGS_DIR, s);
    if (!b) continue;
    arr.push({ ...b, slug: s });
  }
  arr.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  return arr.slice(0, limit);
}

async function loadLatestProducts(limit = 6): Promise<Array<ProductData & { slug: string }>> {
  const slugs = await readJsonDir(PRODUCTS_DIR);
  const arr: Array<ProductData & { slug: string }> = [];
  for (const s of slugs) {
    const p = await loadJson<ProductData>(PRODUCTS_DIR, s);
    if (!p) continue;
    arr.push({ ...p, slug: s });
  }
  // sort by date (newest first), fallback keep original order
  arr.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  return arr.slice(0, limit);
}

export default async function HomePage(): Promise<JSX.Element> {
  const [products, blogs] = await Promise.all([loadLatestProducts(6), loadLatestBlogs(3)]);

  return (
    <main className="bg-primary">
      {/* Hero Section */}
      <section className="container-max px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-text leading-tight mb-6">
            Simple, trusted products for home & wellness
          </h1>
          <p className="lead text-lg mb-8">
            Handpicked household and farm products — from washed ghee and jaggery to wooden cookware and daily essentials. Curated for simple living.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products" className="btn btn-primary btn-lg">
              Explore Products
            </Link>
            <Link href="/blogs" className="btn btn-outline btn-lg">
              Read Our Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-surface">
        <div className="container-max px-4 md:px-8 py-16">
          {/* Products section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text">Latest products</h2>
                <p className="text-muted mt-2">Discover our newest additions</p>
              </div>
              <Link href="/products" className="text-sm text-accent hover:text-accent-600 font-medium transition-colors">
                View all →
              </Link>
            </div>

            {products.length === 0 ? (
              <div className="card card-pad-md">
                <p className="text-muted">No products found in <code>data/products</code>.</p>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((p) => (
                  <article key={p.slug} className="card card-pad-md hover:shadow-md transition-all">
                    {p.images && p.images.length ? (
                      <Link href={`/products/${p.slug}`} className="block overflow-hidden rounded-lg mb-4">
                        <img src={p.images[0]} alt={p.title} className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
                      </Link>
                    ) : null}

                    <div>
                      <h3 className="text-lg font-semibold text-text mb-2">
                        <Link href={`/products/${p.slug}`} className="hover:text-accent transition-colors">{p.title}</Link>
                      </h3>
                      {p.excerpt ? <p className="text-muted text-sm mb-4 line-clamp-2">{p.excerpt}</p> : null}

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2">
                          {p.category ? <span className="badge">{p.category}</span> : null}
                          {p.price ? <div className="text-sm font-semibold text-accent">{typeof p.price === "number" ? `₹${p.price}` : p.price}</div> : null}
                        </div>
                        <Link href={`/products/${p.slug}`} className="btn btn-primary btn-sm">View</Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Blogs section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-text">Latest articles</h2>
                <p className="text-muted mt-2">Insights and guides for simple living</p>
              </div>
              <Link href="/blogs" className="text-sm text-accent hover:text-accent-600 font-medium transition-colors">
                View all →
              </Link>
            </div>

            {blogs.length === 0 ? (
              <div className="card card-pad-md">
                <p className="text-muted">No blog posts found in <code>data/blogs</code>.</p>
              </div>
            ) : (
              <div className="product-grid">
                {blogs.map((b) => {
                  const displayDate = b.date
                    ? new Date(b.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
                    : null;

                  return (
                    <article key={b.slug} className="card card-pad-md hover:shadow-md transition-all">
                      {b.coverImage ? (
                        <Link href={`/blog/${b.slug}`} className="block overflow-hidden rounded-lg mb-4">
                          <img src={b.coverImage} alt={b.title} className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
                        </Link>
                      ) : null}

                      <div>
                        <h3 className="text-lg font-semibold text-text mb-2">
                          <Link href={`/blog/${b.slug}`} className="hover:text-accent transition-colors">{b.title}</Link>
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-muted mb-3">
                          {b.author ? <span>{b.author}</span> : null}
                          {displayDate ? <span>·</span> : null}
                          {displayDate ? <span>{displayDate}</span> : null}
                        </div>

                        {b.excerpt ? <p className="text-muted text-sm mb-4 line-clamp-2">{b.excerpt}</p> : null}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            {b.tags?.slice(0, 2).map((t) => (
                              <span key={t} className="badge text-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                          <Link href={`/blog/${b.slug}`} className="btn btn-primary btn-sm">Read</Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
