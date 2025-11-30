// app/blog/[title]/page.tsx
import fs from "fs";
import path from "path";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";

type BlogData = {
  title: string;
  date?: string;
  author?: string;
  excerpt?: string;
  coverImage?: string;
  content: string;
  tags?: string[];
};

// ---------- Helpers ----------
const BLOGS_DIR = path.join(process.cwd(), "data", "blogs");

async function readBlogDir(): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(BLOGS_DIR);
    return files.filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/i, ""));
  } catch (err) {
    return [];
  }
}

async function loadBlogBySlug(slug: string): Promise<BlogData | null> {
  const filePath = path.join(BLOGS_DIR, `${slug}.json`);
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as BlogData;
    return data;
  } catch (err) {
    return null;
  }
}

function simpleMarkdownToHtml(md: string): string {
  const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split(/\r?\n/);
  const out: string[] = [];
  let inList = false;
  let buffer: string[] = [];

  const flushBuffer = () => {
    if (!buffer.length) return;
    const para = buffer.join(" ").trim();
    if (para) out.push(`<p>${para}</p>`);
    buffer = [];
  };

  const inline = (s: string) =>
    escapeHtml(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2" rel="noopener noreferrer" target="_blank">$1</a>`);

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      flushBuffer();
      continue;
    }

    const hMatch = line.match(/^(#{1,4})\s+(.*)/);
    if (hMatch) {
      if (inList) {
        out.push("</ul>");
        inList = false;
      }
      flushBuffer();
      const level = Math.min(4, hMatch[1].length);
      out.push(`<h${level}>${inline(hMatch[2])}</h${level}>`);
      continue;
    }

    const liMatch = line.match(/^[-*]\s+(.*)/);
    if (liMatch) {
      if (!inList) {
        out.push("<ul>");
        inList = true;
      }
      out.push(`<li>${inline(liMatch[1])}</li>`);
      continue;
    }

    buffer.push(inline(line));
  }

  if (inList) out.push("</ul>");
  flushBuffer();

  return out.join("\n");
}

// ---------- generateStaticParams ----------
export async function generateStaticParams() {
  const slugs = await readBlogDir();
  return slugs.map((s) => ({ title: s }));
}

// ---------- generateMetadata (await params) ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  const { title: slug } = await params;
  const blog = await loadBlogBySlug(slug);
  if (!blog) {
    return {
      title: "Blog · OROGUD",
    };
  }

  const title = blog.title;
  const description = blog.excerpt ?? "";
  const published = blog.date ? new Date(blog.date).toISOString() : undefined;
  const image =
    blog.coverImage && (blog.coverImage.startsWith("http") ? blog.coverImage : `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}${blog.coverImage}`);

  return {
    title: `${title} · OROGUD`,
    description,
    authors: blog.author ? [{ name: blog.author }] : undefined,
    openGraph: {
      title: `${title} · OROGUD`,
      description,
      images: image ? [{ url: image }] : undefined,
      type: "article",
      publishedTime: published,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · OROGUD`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// ---------- Page component (await params) ----------
export default async function BlogPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title: slug } = await params;
  const blog = await loadBlogBySlug(slug);

  if (!blog) {
    const available = await readBlogDir();
    return (
      <main className="container-max py-16">
        <div className="card">
          <h1 className="text-2xl font-semibold">Blog not found</h1>
          <p className="muted mt-2">
            We couldn't find that blog post: <strong>{slug}</strong>
          </p>

          {available.length ? (
            <>
              <p className="mt-4 muted">Available blog slugs (click to open):</p>
              <ul className="mt-2 space-y-2">
                {available.map((s) => (
                  <li key={s}>
                    <a href={`/blog/${s}`} className="text-accent hover:underline">
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="mt-4 muted">No blog files found in <code>data/blogs</code>.</p>
          )}
          </div>
      </main>
    );
  }

  let htmlContent = blog.content ?? "";
  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(htmlContent);
  if (!looksLikeHtml) {
    htmlContent = simpleMarkdownToHtml(htmlContent);
  }

  const displayDate = blog.date ? new Date(blog.date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }) : null;

  return (
    <main className="bg-primary min-h-screen">
      <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <Link href="/blogs" className="hover:text-accent transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-text font-medium">{blog.title}</span>
        </div>

        <article className="card card-pad-lg max-w-3xl mx-auto">
          {blog.coverImage ? (
            <div className="w-full mb-8 overflow-hidden rounded-lg">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-auto object-cover" />
            </div>
          ) : null}

          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6">{blog.title}</h1>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 text-sm text-muted">
                {blog.author ? <span className="font-medium text-text">{blog.author}</span> : null}
                {displayDate ? <span>·</span> : null}
                {displayDate ? <span>{displayDate}</span> : null}
              </div>
              {blog.tags && blog.tags.length ? (
                <div className="flex gap-2">
                  {blog.tags.map((t) => (
                    <span key={t} className="badge">{t}</span>
                  ))}
                </div>
              ) : null}
            </div>

            {blog.excerpt ? <p className="lead text-lg mt-6">{blog.excerpt}</p> : null}
          </header>

          <section className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: htmlContent }} />

          <footer className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-muted text-sm mb-3">Enjoyed this article?</p>
                <div className="flex gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(
                      (process.env.NEXT_PUBLIC_SITE_URL ?? "") + `/blog/${slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                  >
                    Share on Twitter
                  </a>
                  <a href="/blogs" className="btn btn-ghost btn-sm">Back to blog</a>
                </div>
              </div>
            </div>
          </footer>
        </article>
        </div>
      </div>
    </main>
  );
}
