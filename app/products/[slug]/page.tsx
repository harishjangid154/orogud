// app/products/[slug]/page.tsx
import fs from "fs";
import path from "path";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";

type ProductData = {
  title: string;
  date?: string;
  price?: string | number;
  excerpt?: string;
  images?: string[];
  category?: string;
  sku?: string;
  content?: string; // html or markdown
  tags?: string[];
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

function simpleMarkdownToHtml(md: string): string {
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  let buffer: string[] = [];

  const flush = () => {
    if (!buffer.length) return;
    out.push(`<p>${buffer.join(" ").trim()}</p>`);
    buffer = [];
  };

  const inline = (s: string) =>
    esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>`);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      if (inList) { out.push("</ul>"); inList = false; }
      flush(); continue;
    }
    const h = line.match(/^(#{1,4})\s+(.*)/);
    if (h) { if (inList) { out.push("</ul>"); inList = false; } flush(); out.push(`<h${Math.min(4,h[1].length)}>${inline(h[2])}</h${Math.min(4,h[1].length)}>`); continue; }
    const li = line.match(/^[-*]\s+(.*)/);
    if (li) { if (!inList) { out.push("<ul>"); inList = true; } out.push(`<li>${inline(li[1])}</li>`); continue; }
    buffer.push(inline(line));
  }
  if (inList) out.push("</ul>");
  flush();
  return out.join("\n");
}

export async function generateStaticParams() {
  const slugs = await readProductSlugs();
  return slugs.map((s) => ({ slug: s }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await loadProduct(slug);
  if (!product) return { title: "Product · OROGUD" };

  const title = product.title;
  const desc = product.excerpt ?? "";
  const image = product.images && product.images.length ? product.images[0] : undefined;

  return {
    title: `${title} · OROGUD`,
    description: desc,
    openGraph: {
      title: `${title} · OROGUD`,
      description: desc,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · OROGUD`,
      description: desc,
      images: image ? [image] : undefined,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await loadProduct(slug);

  if (!product) {
    const available = await readProductSlugs();
    return (
      <main className="container-max py-16">
        <div className="card">
          <h1 className="text-2xl font-semibold">Product not found</h1>
          <p className="muted mt-2">We couldn't find product: <strong>{slug}</strong>.</p>
          {available.length ? (
            <>
              <p className="mt-4 muted">Available product slugs:</p>
              <ul className="mt-2 space-y-2">
                {available.map((s) => (
                  <li key={s}><a href={`/products/${s}`} className="text-accent hover:underline">{s}</a></li>
                ))}
              </ul>
            </>
          ) : (
            <p className="muted mt-4">No product files found in <code>data/products</code>.</p>
          )}
        </div>
      </main>
    );
  }

  const htmlContent = product.content && /<\/?[a-z][\s\S]*>/i.test(product.content) ? product.content : (product.content ? simpleMarkdownToHtml(product.content) : "");

  return (
    <main className="container-max py-10">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <article className="card">
            {product.images && product.images.length ? (
              <div className="mb-4">
                <img src={product.images[0]} alt={product.title} className="w-full h-72 object-cover rounded-md" />
              </div>
            ) : null}

            <header>
              <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>{product.title}</h1>
              <div className="mt-3 flex items-center gap-3 muted text-sm">
                {product.category ? <span className="badge">{product.category}</span> : null}
                {product.date ? <span> · {new Date(product.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })}</span> : null}
              </div>
              {product.excerpt ? <p className="lead mt-4">{product.excerpt}</p> : null}
            </header>

            <section className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />

            <div className="mt-6 flex items-center gap-3">
              <div className="text-2xl font-semibold">{product.price ? (typeof product.price === "number" ? `₹${product.price}` : product.price) : "Price on request"}</div>
              <button className="btn btn-primary">Add to cart</button>
            </div>
          </article>
        </div>

        <aside className="md:col-span-1">
          <div className="card">
            <h4 className="text-sm font-semibold mb-3">Product details</h4>
            <ul className="text-sm muted space-y-2">
              {product.sku ? <li>SKU: <strong className="text-text">{product.sku}</strong></li> : null}
              {product.category ? <li>Category: <strong className="text-text">{product.category}</strong></li> : null}
              {product.tags ? <li>Tags: {product.tags.map((t) => <span key={t} className="badge mr-2">{t}</span>)}</li> : null}
            </ul>
          </div>

          <div className="card mt-4">
            <h4 className="text-sm font-semibold mb-3">Related</h4>
            <p className="muted text-sm">You can implement related products here (by category or tag).</p>
            <Link href="/products" className="mt-3 btn btn-ghost">View all products</Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
