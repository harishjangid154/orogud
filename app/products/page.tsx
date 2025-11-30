// app/products/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";
import { Metadata } from "next";

type ProductData = {
  title: string;
  date?: string;
  price?: string | number;
  excerpt?: string;
  images?: string[];
  category?: string;
  featured?: boolean;
  content?: string;
};

const PRODUCTS_DIR = path.join(process.cwd(), "data", "products");

async function readProductSlugs(): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(PRODUCTS_DIR);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/i, ""));
  } catch {
    return [];
  }
}

async function loadProduct(slug: string): Promise<ProductData | null> {
  try {
    const raw = await fs.promises.readFile(path.join(PRODUCTS_DIR, `${slug}.json`), "utf8");
    return JSON.parse(raw) as ProductData;
  } catch {
    return null;
  }
}

async function loadAllProducts(): Promise<Array<ProductData & { slug: string }>> {
  const slugs = await readProductSlugs();
  const out: Array<ProductData & { slug: string }> = [];
  for (const s of slugs) {
    const p = await loadProduct(s);
    if (!p) continue;
    out.push({ ...p, slug: s });
  }
  out.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  return out;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Products · OROGUD",
    description: "Explore OROGUD's curated products — home goods, pantry staples, and wellness essentials.",
  };
}

export default async function ProductsPage(): Promise<JSX.Element> {
  const products = await loadAllProducts();

  return (
    <main className="bg-primary min-h-screen">
      {/* Header Section */}
      <div className="container-max px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">All Products</h1>
          <p className="lead text-lg">Browse our curated collection of organic and handcrafted products. Newest items appear first.</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-surface">
        <div className="container-max px-4 md:px-8 py-16">
          {products.length === 0 ? (
            <div className="card card-pad-lg max-w-md">
              <h2 className="text-xl font-semibold text-text mb-2">No products found</h2>
              <p className="text-muted">Add JSON files under <code>data/products</code> with product data to get started.</p>
              <Link href="/" className="btn btn-primary btn-sm mt-4">Back to home</Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted">{products.length} product{products.length !== 1 ? 's' : ''} available</p>
              </div>
              <section className="product-grid">
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
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
