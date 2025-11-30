// app/products/[slug]/page.tsx
import fs from "fs";
import path from "path";
import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import * as Tabs from "@/components/ui/Tabs";
import * as Tooltip from "@/components/ui/Tooltip";
import * as Popover from "@/components/ui/Popover";
import * as Dialog from "@/components/ui/Dialog";
import ProductImageGallery from "@/components/ProductImageGallery";
import ShareProductButton from "@/components/ShareProductButton";
import { Heart, ShoppingCart } from "lucide-react";

type ProductData = {
  title: string;
  date?: string;
  price?: string | number;
  excerpt?: string;
  images?: string[];
  category?: string;
  sku?: string;
  content?: string;
  tags?: string[];
  relatedProducts?: Array<{ slug: string; title: string }>;
  relatedBlogs?: Array<{ slug: string; title: string }>;
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
      <main className="px-4 md:px-6 lg:px-8 xl:px-12 py-8">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </main>
    );
  }

  const htmlContent = product.content && /<\/?[a-z][\s\S]*>/i.test(product.content) ? product.content : (product.content ? simpleMarkdownToHtml(product.content) : "");

  return (
    <main className="bg-primary min-h-screen">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/products" className="hover:text-accent transition-colors">Products</Link>
            <span>/</span>
            {product.category && (
              <>
                <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-accent transition-colors">
                  {product.category}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-text font-medium">{product.title}</span>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Column - Images */}
            <div className="sticky top-24 self-start">
              {product.images && product.images.length > 0 ? (
                <ProductImageGallery images={product.images} title={product.title} />
              ) : (
                <div className="aspect-square w-full rounded-lg bg-surface-2 flex items-center justify-center">
                  <span className="text-muted">No image available</span>
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  {product.category && (
                    <Link
                      href={`/products?category=${encodeURIComponent(product.category)}`}
                      className="badge hover:bg-accent hover:text-accent-contrast transition-colors"
                    >
                      {product.category}
                    </Link>
                  )}
                  {product.sku && (
                    <span className="text-sm text-muted">SKU: {product.sku}</span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-text mb-4 leading-tight">{product.title}</h1>
                {product.excerpt && (
                  <p className="text-lg text-muted leading-relaxed">{product.excerpt}</p>
                )}
              </div>

              {/* Price Section */}
              <div className="card card-pad-lg bg-accent-light border-2 border-accent/20">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-muted mb-2">Price</p>
                    <div className="text-4xl md:text-5xl font-bold text-accent">
                      {product.price ? (typeof product.price === "number" ? `₹${product.price}` : product.price) : "Price on request"}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Tooltip.TooltipProvider>
                    <Tooltip.Tooltip>
                      <Tooltip.TooltipTrigger asChild>
                        <button className="btn btn-primary flex-1 text-base py-3">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Add to Cart
                        </button>
                      </Tooltip.TooltipTrigger>
                      <Tooltip.TooltipContent>
                        <p>Add this item to your shopping cart</p>
                      </Tooltip.TooltipContent>
                    </Tooltip.Tooltip>
                  </Tooltip.TooltipProvider>

                  <Tooltip.TooltipProvider>
                    <Tooltip.Tooltip>
                      <Tooltip.TooltipTrigger asChild>
                        <button className="btn btn-outline px-4">
                          <Heart className="h-5 w-5" />
                        </button>
                      </Tooltip.TooltipTrigger>
                      <Tooltip.TooltipContent>
                        <p>Add to wishlist</p>
                      </Tooltip.TooltipContent>
                    </Tooltip.Tooltip>
                  </Tooltip.TooltipProvider>

                  <ShareProductButton slug={slug} title={product.title} />
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card card-pad-md text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <p className="text-sm font-semibold text-text mb-1">Free Shipping</p>
                  <p className="text-xs text-muted">On orders over ₹500</p>
                </div>
                <div className="card card-pad-md text-center">
                  <div className="text-2xl mb-2">↩️</div>
                  <p className="text-sm font-semibold text-text mb-1">Easy Returns</p>
                  <p className="text-xs text-muted">30-day return policy</p>
                </div>
              </div>

              {/* Description Tabs */}
              <div className="card card-pad-lg">
                <Tabs.Tabs defaultValue="description" className="w-full">
                  <Tabs.TabsList className="mb-6">
                    <Tabs.TabsTrigger value="description">Description</Tabs.TabsTrigger>
                    <Tabs.TabsTrigger value="details">Details</Tabs.TabsTrigger>
                    {product.tags && product.tags.length > 0 && (
                      <Tabs.TabsTrigger value="tags">Tags</Tabs.TabsTrigger>
                    )}
                  </Tabs.TabsList>
                  <Tabs.TabsContent value="description" className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </Tabs.TabsContent>
                  <Tabs.TabsContent value="details">
                    <div className="space-y-4">
                      {product.sku && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted font-medium">SKU</span>
                          <span className="font-semibold text-text">{product.sku}</span>
                        </div>
                      )}
                      {product.category && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted font-medium">Category</span>
                          <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="font-semibold text-accent hover:text-accent-600">
                            {product.category}
                          </Link>
                        </div>
                      )}
                      {product.date && (
                        <div className="flex justify-between py-3 border-b border-border">
                          <span className="text-muted font-medium">Added</span>
                          <span className="font-semibold text-text">{new Date(product.date).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</span>
                        </div>
                      )}
                    </div>
                  </Tabs.TabsContent>
                  {product.tags && product.tags.length > 0 && (
                    <Tabs.TabsContent value="tags">
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span key={tag} className="badge">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Tabs.TabsContent>
                  )}
                </Tabs.Tabs>
              </div>

              {/* Related Products & Blogs */}
              <div className="space-y-6">
                {product.relatedProducts && product.relatedProducts.length > 0 && (
                  <div className="card card-pad-lg">
                    <h3 className="text-lg font-bold text-text mb-4">Related Products</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.relatedProducts.map((related) => (
                        <Link
                          key={related.slug}
                          href={`/products/${related.slug}`}
                          className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent-light transition-all group"
                        >
                          <p className="font-semibold text-text group-hover:text-accent transition-colors">{related.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {product.relatedBlogs && product.relatedBlogs.length > 0 && (
                  <div className="card card-pad-lg">
                    <h3 className="text-lg font-bold text-text mb-4">Related Articles</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {product.relatedBlogs.map((blog) => (
                        <Link
                          key={blog.slug}
                          href={`/blogs/${blog.slug}`}
                          className="p-3 rounded-lg border border-border hover:border-accent hover:bg-accent-light transition-all group"
                        >
                          <p className="font-semibold text-text group-hover:text-accent transition-colors">{blog.title}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {(!product.relatedProducts || product.relatedProducts.length === 0) && (!product.relatedBlogs || product.relatedBlogs.length === 0) && (
                  <div className="card card-pad-md">
                    <h4 className="text-base font-bold text-text mb-4">Explore More</h4>
                    <p className="text-muted text-sm mb-4">Discover more curated products from our collection.</p>
                    <Link href="/products" className="btn btn-outline w-full">
                      View All Products
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
