// app/products/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";
import { Metadata } from "next";
import ProductFilter from "@/components/ProductFilter";
import ProductCard from "@/components/ProductCard";

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
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-3">
              {selectedCategory ? selectedCategory : "All Products"}
            </h1>
            <p className="text-muted text-lg md:text-xl leading-relaxed">
              {selectedCategory
                ? `Browse our ${selectedCategory.toLowerCase()} collection. ${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} available.`
                : "Explore our curated collection of organic and handcrafted products. Newest items appear first."}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filter Sidebar */}
            <ProductFilter
              categories={categories}
              selectedCategory={selectedCategory}
              productCount={filteredProducts.length}
            />

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
                  <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="text-muted text-sm">
                        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                        {selectedCategory && ` in ${selectedCategory}`}
                      </p>
                    </div>
                    {selectedCategory && (
                      <Link
                        href="/products"
                        className="text-sm text-accent hover:text-accent-600 font-medium transition-colors"
                      >
                        ← View all products
                      </Link>
                    )}
                  </div>
                  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredProducts.map((p) => (
                      <ProductCard
                        key={p.slug}
                        slug={p.slug}
                        title={p.title}
                        excerpt={p.excerpt}
                        price={p.price}
                        image={p.images?.[0]}
                        category={p.category}
                        showCategory={!selectedCategory}
                      />
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
