// app/blogs/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";
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
    <main className="bg-primary min-h-screen">
      {/* Header Section */}
      <div className="container-max px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">OROGUD Blog</h1>
          <p className="lead text-lg">Insights, guides and stories about our products, traditional techniques, and simple living.</p>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="bg-surface">
        <div className="container-max px-4 md:px-8 py-16">
          {blogs.length === 0 ? (
            <div className="card card-pad-lg max-w-md">
              <h2 className="text-xl font-semibold text-text mb-2">No blog posts found</h2>
              <p className="text-muted">There are no blog files in <code>data/blogs</code>. Add JSON files named like <code>my-post-slug.json</code>.</p>
              <Link href="/" className="btn btn-primary btn-sm mt-4">Back to home</Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted">{blogs.length} article{blogs.length !== 1 ? 's' : ''} available</p>
              </div>
              <section className="product-grid">
                {blogs.map((b) => {
                  const displayDate = b.date
                    ? new Date(b.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" })
                    : null;

                  return (
                    <article key={b.slug} className="card card-pad-md hover:shadow-md transition-all">
                      {b.coverImage ? (
                        <Link href={`/blogs/${b.slug}`} className="block overflow-hidden rounded-lg mb-4">
                          <img src={b.coverImage} alt={b.title} className="w-full h-56 object-cover rounded-lg hover:scale-105 transition-transform duration-300" />
                        </Link>
                      ) : null}

                      <div>
                        <h3 className="text-lg font-semibold text-text mb-2">
                          <Link href={`/blogs/${b.slug}`} className="hover:text-accent transition-colors">
                            {b.title}
                          </Link>
                        </h3>

                        <div className="flex items-center gap-2 text-xs text-muted mb-3">
                          {b.author ? <span>{b.author}</span> : null}
                          {displayDate ? <span>·</span> : null}
                          {displayDate ? <span>{displayDate}</span> : null}
                        </div>

                        {b.excerpt ? <p className="text-muted text-sm mb-4 line-clamp-2">{b.excerpt}</p> : <p className="text-muted text-sm mb-4">No excerpt available.</p>}

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-2">
                            {b.tags?.slice(0, 2).map((t) => (
                              <span key={t} className="badge text-xs">
                                {t}
                              </span>
                            ))}
                          </div>
                          <Link href={`/blogs/${b.slug}`} className="btn btn-primary btn-sm">
                            Read
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
