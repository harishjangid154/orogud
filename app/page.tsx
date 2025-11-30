// app/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";
import ProductCarousel from "@/components/ProductCarousel";
import BlogCarousel from "@/components/BlogCarousel";

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
  images?: string[];
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

async function loadAllProducts(): Promise<Array<ProductData & { slug: string }>> {
  const slugs = await readJsonDir(PRODUCTS_DIR);
  const arr: Array<ProductData & { slug: string }> = [];
  for (const s of slugs) {
    const p = await loadJson<ProductData>(PRODUCTS_DIR, s);
    if (!p) continue;
    arr.push({ ...p, slug: s });
  }
  return arr;
}

async function loadAllBlogs(): Promise<Array<BlogData & { slug: string }>> {
  const slugs = await readJsonDir(BLOGS_DIR);
  const arr: Array<BlogData & { slug: string }> = [];
  for (const s of slugs) {
    const b = await loadJson<BlogData>(BLOGS_DIR, s);
    if (!b) continue;
    arr.push({ ...b, slug: s });
  }
  arr.sort((a, b) => (b.date ? Date.parse(b.date) : 0) - (a.date ? Date.parse(a.date) : 0));
  return arr;
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

// Featured categories to show on homepage
const FEATURED_CATEGORIES = [
  "Health & Wellness",
  "Food & Pantry",
  "Skin Care",
  "Tea & Beverages",
  "Personal Care",
  "Superfoods",
];

export default async function HomePage(): Promise<JSX.Element> {
  const [allProducts, allBlogs] = await Promise.all([loadAllProducts(), loadAllBlogs()]);
  
  const productsByCategory = groupByCategory(allProducts);
  const featuredBlogs = allBlogs.slice(0, 6);

  // Get featured products for each category (max 6 per category)
  const featuredCategories = FEATURED_CATEGORIES.filter(
    (cat) => productsByCategory[cat] && productsByCategory[cat].length > 0
  );

  return (
    <main className="bg-primary">
      {/* Compact Hero Section */}
      <section className="border-b border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-text leading-tight mb-3">
              Simple, trusted products for home & wellness
            </h1>
            <p className="text-muted text-base md:text-lg mb-4 max-w-2xl">
              Handpicked household and farm products — from washed ghee and jaggery to wooden cookware and daily essentials. Curated for simple living.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products" className="btn btn-primary">
                Explore Products
              </Link>
              <Link href="/blogs" className="btn btn-outline">
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Category Sections */}
      <div className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
          {/* Featured Products by Category */}
          {featuredCategories.map((category) => {
            const categoryProducts = productsByCategory[category].slice(0, 8);
            return (
              <ProductCarousel
                key={category}
                products={categoryProducts}
                title={category}
                viewAllLink={`/products?category=${encodeURIComponent(category)}`}
              />
            );
          })}

          {/* Featured Blogs Section */}
          <BlogCarousel
            blogs={featuredBlogs}
            title="Latest Articles"
            viewAllLink="/blogs"
          />

          {/* Additional Categories Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">Explore by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Object.keys(productsByCategory)
                .filter((cat) => !FEATURED_CATEGORIES.includes(cat))
                .sort()
                .slice(0, 8)
                .map((category) => {
                  const count = productsByCategory[category].length;
                  return (
                    <Link
                      key={category}
                      href={`/products?category=${encodeURIComponent(category)}`}
                      className="card card-pad-md hover:shadow-md transition-all text-center group"
                    >
                      <h3 className="font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                        {category}
                      </h3>
                      <p className="text-sm text-muted">{count} {count === 1 ? "product" : "products"}</p>
                    </Link>
                  );
                })}
            </div>
            <div className="mt-6 text-center">
              <Link href="/products" className="btn btn-outline">
                View All Categories
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
