// app/blogs/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

type BlogData = {
  title: string;
  date?: string; // ISO string
  author?: string;
  excerpt?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
};

const BLOGS_DIR = path.join(process.cwd(), "data", "blogs");

/**
 * Read all blog slugs (filenames without .json)
 */
async function readBlogSlugs(): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(BLOGS_DIR);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/i, ""));
  } catch (err) {
    return [];
  }
}

/**
 * Load a single blog JSON by slug. Returns null on error.
 */
async function loadBlogBySlug(slug: string): Promise<BlogData | null> {
  try {
    const raw = await fs.promises.readFile(path.join(BLOGS_DIR, `${slug}.json`), "utf8");
    const parsed = JSON.parse(raw) as BlogData;
    return parsed;
  } catch (err) {
    return null;
  }
}

/**
 * Load all blogs, attach slug, filter invalid, and sort by date desc.
 */
async function loadAllBlogs(): Promise<Array<BlogData & { slug: string }>> {
  const slugs = await readBlogSlugs();
  const results: Array<BlogData & { slug: string }> = [];

  for (const slug of slugs) {
    const data = await loadBlogBySlug(slug);
    if (!data) continue; // skip invalid files
    results.push({ ...data, slug });
  }

  // Sort: newest first. If date missing or invalid => push to end.
  results.sort((a, b) => {
    const da = a.date ? Date.parse(a.date) : 0;
    const db = b.date ? Date.parse(b.date) : 0;
    return db - da;
  });

  return results;
}

/**
 * Optional: page metadata
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blogs · OROGUD",
    description: "Read articles, guides and stories about products, simple living, and Ayurveda from OROGUD.",
    openGraph: {
      title: "Blogs · OROGUD",
      description: "Read product guides, how-tos and stories from OROGUD.",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blogs · OROGUD",
      description: "Read product guides, how-tos and stories from OROGUD.",
    },
  };
}

/**
 * Blogs index page
 */
export default async function BlogsPage(): Promise<JSX.Element> {
  const blogs = await loadAllBlogs();

  return (
    <main className="container-max py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold" style={{ color: "var(--text)" }}>
          OROGUD Blog
        </h1>
        <p className="lead mt-2">
          Insights, guides and stories about our products, traditional techniques, and simple living. Newest first.
        </p>
      </header>

      {blogs.length === 0 ? (
        <div className="card">
          <h2 className="text-xl font-semibold">No blog posts found</h2>
          <p className="muted mt-2">
            There are no blog files in <code>data/blogs</code>. Add JSON files named like <code>my-post-slug.json</code>.
          </p>
        </div>
      ) : (
        <section className="product-grid">
          {blogs.map((b) => {
            const displayDate = b.date
              ? new Date(b.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
              : null;

            return (
              <article key={b.slug} className="card card-pad-md">
                {b.coverImage ? (
                  <Link href={`/blog/${b.slug}`} className="block overflow-hidden rounded-md">
                    <img src={b.coverImage} alt={b.title} className="w-full h-48 object-cover rounded-md" />
                  </Link>
                ) : null}

                <div className="mt-4">
                  <h3 className="text-lg font-semibold">
                    <Link href={`/blog/${b.slug}`} className="text-text hover:underline">
                      {b.title}
                    </Link>
                  </h3>

                  <div className="mt-2 flex items-center gap-3 text-sm muted">
                    {b.author ? <span>By {b.author}</span> : null}
                    {displayDate ? <span> · {displayDate}</span> : null}
                  </div>

                  {b.excerpt ? <p className="muted mt-3">{b.excerpt}</p> : <p className="muted mt-3">No excerpt available.</p>}

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {b.tags?.slice(0, 3).map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${b.slug}`} className="btn btn-primary btn-sm">
                      Read
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}
