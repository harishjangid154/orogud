// app/categories/page.tsx
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

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Categories · OROGUD",
    description: "Browse all product categories at OROGUD — from health & wellness to food & pantry essentials.",
  };
}

export default async function CategoriesPage(): Promise<JSX.Element> {
  const allProducts = await loadAllProducts();
  const productsByCategory = groupByCategory(allProducts);
  const categories = Object.keys(productsByCategory).sort((a, b) => {
    // Sort by product count (descending), then alphabetically
    const countA = productsByCategory[a].length;
    const countB = productsByCategory[b].length;
    if (countB !== countA) return countB - countA;
    return a.localeCompare(b);
  });

  // Get a sample product image for each category (first product with an image)
  const getCategoryImage = (category: string): string | null => {
    const products = productsByCategory[category];
    for (const product of products) {
      if (product.images && product.images.length > 0) {
        return product.images[0];
      }
    }
    return null;
  };

  return (
    <main className="bg-primary min-h-screen">
      {/* Header Section */}
      <div className="border-b border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">Product Categories</h1>
            <p className="text-muted text-base md:text-lg">
              Explore our products organized by category. Find exactly what you're looking for.
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          {categories.length === 0 ? (
            <div className="card card-pad-lg max-w-md">
              <h2 className="text-xl font-semibold text-text mb-2">No categories found</h2>
              <p className="text-muted mb-4">
                Add products with categories to see them organized here.
              </p>
              <Link href="/products" className="btn btn-primary btn-sm">
                View All Products
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <p className="text-muted">
                  {categories.length} categor{categories.length !== 1 ? "ies" : "y"} · {allProducts.length} total products
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categories.map((category) => {
                  const count = productsByCategory[category].length;
                  const image = getCategoryImage(category);
                  
                  return (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="card card-pad-md hover:shadow-md transition-all group"
                    >
                      {image && (
                        <div className="mb-3 overflow-hidden rounded-lg">
                          <img
                            src={image}
                            alt={category}
                            className="w-full h-40 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                          {category}
                        </h3>
                        <p className="text-sm text-muted">
                          {count} product{count !== 1 ? "s" : ""}
                        </p>
                        <div className="mt-3 pt-3 border-t border-border">
                          <span className="text-sm text-accent font-medium group-hover:text-accent-600 transition-colors">
                            View category →
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

