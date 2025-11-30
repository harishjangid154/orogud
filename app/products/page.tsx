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

function groupByCategory(products: Array<ProductData & { slug: string }>) {
  const grouped: Record<string, Array<ProductData & { slug: string }>> = {};
  for (const product of products) {
    const category = product.category || "Uncategorized";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(product);
  }
  return grouped;
}

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const category = params.category;
  
  if (category) {
    return {
      title: `${category} Products · OROGUD`,
      description: `Explore ${category} products from OROGUD — organic and handcrafted essentials.`,
    };
  }
  
  return {
    title: "Products · OROGUD",
    description: "Explore OROGUD's curated products — home goods, pantry staples, and wellness essentials.",
  };
}

export default async function ProductsPage({ searchParams }: Props): Promise<JSX.Element> {
  const params = await searchParams;
  const selectedCategory = params.category;
  
  const allProducts = await loadAllProducts();
  const productsByCategory = groupByCategory(allProducts);
  const categories = Object.keys(productsByCategory).sort();
  
  // Filter products by category if provided
  const filteredProducts = selectedCategory
    ? allProducts.filter((p) => p.category === selectedCategory)
    : allProducts;

  return (
    <main className="bg-primary min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
              {selectedCategory ? selectedCategory : "All Products"}
            </h1>
            <p className="text-muted text-base md:text-lg">
              {selectedCategory
                ? `Browse our ${selectedCategory.toLowerCase()} collection. ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} available.`
                : "Browse our curated collection of organic and handcrafted products. Newest items appear first."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Sidebar */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-4">
                <h2 className="text-lg font-semibold text-text mb-3">Categories</h2>
                <nav className="space-y-1">
                  <Link
                    href="/products"
                    className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      !selectedCategory
                        ? "bg-accent-100 text-accent border border-accent"
                        : "text-muted hover:bg-surface-2 hover:text-text"
                    }`}
                  >
                    All Products ({allProducts.length})
                  </Link>
                  {categories.map((category) => {
                    const count = productsByCategory[category].length;
                    const isActive = selectedCategory === category;
                    return (
                      <Link
                        key={category}
                        href={`/products?category=${encodeURIComponent(category)}`}
                        className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-accent-100 text-accent border border-accent"
                            : "text-muted hover:bg-surface-2 hover:text-text"
                        }`}
                      >
                        {category} ({count})
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="card card-pad-lg max-w-md">
                  <h2 className="text-xl font-semibold text-text mb-2">No products found</h2>
                  <p className="text-muted mb-4">
                    {selectedCategory
                      ? `No products found in the "${selectedCategory}" category.`
                      : "Add JSON files under data/products with product data to get started."}
                  </p>
                  {selectedCategory ? (
                    <Link href="/products" className="btn btn-primary btn-sm">
                      View All Products
                    </Link>
                  ) : (
                    <Link href="/" className="btn btn-primary btn-sm">
                      Back to home
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <div className="mb-4 flex items-center justify-between flex-wrap gap-4">
                    <p className="text-muted">
                      {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                      {selectedCategory && ` in ${selectedCategory}`}
                    </p>
                    {selectedCategory && (
                      <Link
                        href="/products"
                        className="text-sm text-accent hover:text-accent-600 font-medium transition-colors"
                      >
                        Clear filter →
                      </Link>
                    )}
                  </div>
                  <section className="product-grid">
                    {filteredProducts.map((p) => (
                      <article
                        key={p.slug}
                        className="card card-pad-md hover:shadow-md transition-all"
                      >
                        {p.images && p.images.length ? (
                          <Link
                            href={`/products/${p.slug}`}
                            className="block overflow-hidden rounded-lg mb-4"
                          >
                            <img
                              src={p.images[0]}
                              alt={p.title}
                              className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                        ) : null}

                        <div>
                          <h3 className="text-lg font-semibold text-text mb-2">
                            <Link
                              href={`/products/${p.slug}`}
                              className="hover:text-accent transition-colors"
                            >
                              {p.title}
                            </Link>
                          </h3>
                          {p.excerpt ? (
                            <p className="text-muted text-sm mb-4 line-clamp-2">{p.excerpt}</p>
                          ) : null}

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <div className="flex items-center gap-2 flex-wrap">
                              {p.category && !selectedCategory && (
                                <Link
                                  href={`/products?category=${encodeURIComponent(p.category)}`}
                                  className="badge hover:bg-accent hover:text-accent-contrast transition-colors"
                                >
                                  {p.category}
                                </Link>
                              )}
                              {p.price ? (
                                <div className="text-sm font-semibold text-accent">
                                  {typeof p.price === "number" ? `₹${p.price}` : p.price}
                                </div>
                              ) : null}
                            </div>
                            <Link
                              href={`/products/${p.slug}`}
                              className="btn btn-primary btn-sm"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </section>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
