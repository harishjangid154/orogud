// app/products/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";
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
    <main className="container-max py-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>Products</h1>
        <p className="lead mt-2">Browse all products. Newest items appear first.</p>
      </header>

      {products.length === 0 ? (
        <div className="card">
          <h2 className="text-lg font-semibold">No products found</h2>
          <p className="muted mt-2">Add JSON files under <code>data/products</code> with product data.</p>
        </div>
      ) : (
        <section className="product-grid">
          {products.map((p) => (
            <article key={p.slug} className="card card-pad-md">
              {p.images && p.images.length ? (
                <Link href={`/products/${p.slug}`} className="block overflow-hidden rounded-md">
                  <img src={p.images[0]} alt={p.title} className="w-full h-48 object-cover rounded-md" />
                </Link>
              ) : null}

              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  <Link href={`/products/${p.slug}`} className="text-text hover:underline">{p.title}</Link>
                </h3>
                {p.excerpt ? <p className="muted mt-2">{p.excerpt}</p> : null}

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {p.category ? <span className="badge">{p.category}</span> : null}
                    {p.price ? <div className="text-sm font-semibold">{typeof p.price === "number" ? `₹${p.price}` : p.price}</div> : null}
                  </div>
                  <Link href={`/products/${p.slug}`} className="btn btn-primary btn-sm">View</Link>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
