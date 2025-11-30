// app/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";

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
    <main className="container-max py-10">
      {/* Hero / Intro */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
          OROGUD — Simple, trusted products for home & wellness
        </h1>
        <p className="lead mt-2">
          Handpicked household and farm products — from washed ghee and jaggery to wooden cookware and daily essentials.
        </p>
      </section>

      {/* Products section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Latest products</h2>
          <Link href="/products" className="text-sm muted hover:text-accent">
            View all products →
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="card">
            <p className="muted">No products found in <code>data/products</code>.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((p) => (
              <article key={p.slug} className="card card-pad-md">
                {p.images && p.images.length ? (
                  <Link href={`/products/${p.slug}`} className="block overflow-hidden rounded-md">
                    <img src={p.images[0]} alt={p.title} className="w-full h-44 object-cover rounded-md" />
                  </Link>
                ) : null}

                <div className="mt-3">
                  <h3 className="text-lg font-semibold">
                    <Link href={`/products/${p.slug}`} className="text-text hover:underline">{p.title}</Link>
                  </h3>
                  {p.excerpt ? <p className="muted mt-2">{p.excerpt}</p> : null}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {p.category ? <span className="badge">{p.category}</span> : null}
                      {p.price ? <div className="text-sm font-semibold">{typeof p.price === "number" ? `₹${p.price}` : p.price}</div> : null}
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
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Latest articles</h2>
          <Link href="/blogs" className="text-sm muted hover:text-accent">
            View all blogs →
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="card">
            <p className="muted">No blog posts found in <code>data/blogs</code>.</p>
          </div>
        ) : (
          <div className="product-grid">
            {blogs.map((b) => (
              <article key={b.slug} className="card card-pad-md">
                {b.coverImage ? (
                  <Link href={`/blog/${b.slug}`} className="block overflow-hidden rounded-md">
                    <img src={b.coverImage} alt={b.title} className="w-full h-44 object-cover rounded-md" />
                  </Link>
                ) : null}

                <div className="mt-3">
                  <h3 className="text-lg font-semibold">
                    <Link href={`/blog/${b.slug}`} className="text-text hover:underline">{b.title}</Link>
                  </h3>
                  {b.excerpt ? <p className="muted mt-2">{b.excerpt}</p> : null}

                  <div className="mt-3 flex items-center justify-between">
                    <div className="muted text-sm">{b.author ? `By ${b.author}` : null}</div>
                    <Link href={`/blog/${b.slug}`} className="btn btn-primary btn-sm">Read</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
