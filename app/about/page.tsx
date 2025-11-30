// app/about/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";
import React, { JSX } from "react";
import { Metadata } from "next";
import Image from "next/image";
import * as Tabs from "@/components/ui/Tabs";

type AboutData = {
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };
  mission: {
    title: string;
    content: string;
    image: string;
  };
  values: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  story: {
    title: string;
    sections: Array<{
      heading: string;
      content: string;
    }>;
  };
  team: {
    title: string;
    members: Array<{
      name: string;
      role: string;
      bio: string;
      image: string;
    }>;
  };
  contact: {
    title: string;
    email: string;
    message: string;
    social: {
      instagram?: string;
      facebook?: string;
      twitter?: string;
    };
  };
  stats: Array<{
    number: string;
    label: string;
  }>;
};

const ABOUT_FILE = path.join(process.cwd(), "data", "about.json");

async function loadAboutData(): Promise<AboutData | null> {
  try {
    const raw = await fs.promises.readFile(ABOUT_FILE, "utf8");
    return JSON.parse(raw) as AboutData;
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Us · OROGUD",
    description: "Learn about OROGUD's mission to bring authentic Ayurvedic and organic products to modern living.",
  };
}

export default async function AboutPage(): Promise<JSX.Element> {
  const about = await loadAboutData();

  if (!about) {
    return (
      <main className="bg-primary min-h-screen">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="card card-pad-lg">
              <h1 className="text-2xl font-semibold text-text mb-2">About page not found</h1>
              <p className="text-muted mb-4">The about.json file could not be loaded.</p>
              <Link href="/" className="btn btn-primary btn-sm">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-primary min-h-screen">
      {/* Hero Section */}
      <section className="border-b border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">{about.hero.title}</h1>
            <p className="text-xl md:text-2xl text-accent font-semibold mb-6">{about.hero.subtitle}</p>
            <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">{about.hero.description}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-surface border-b border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {about.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-base text-muted font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">{about.mission.title}</h2>
                <p className="text-lg text-muted leading-relaxed whitespace-pre-line">{about.mission.content}</p>
              </div>
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={about.mission.image}
                  alt={about.mission.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary border-y border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {about.values.map((value, index) => (
                <div key={index} className="card card-pad-md text-center">
                  <div className="w-16 h-16 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-text mb-3">{value.title}</h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">{about.story.title}</h2>
            <div className="space-y-8">
              {about.story.sections.map((section, index) => (
                <div key={index} className="card card-pad-lg">
                  <h3 className="text-2xl font-bold text-text mb-4">{section.heading}</h3>
                  <p className="text-lg text-muted leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-primary border-y border-border">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 text-center">{about.team.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {about.team.members.map((member, index) => (
                <div key={index} className="card card-pad-md text-center">
                  <div className="relative w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">{member.name}</h3>
                  <p className="text-accent font-semibold mb-4">{member.role}</p>
                  <p className="text-muted leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-surface">
        <div className="px-4 md:px-6 lg:px-8 xl:px-12 py-12 md:py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">{about.contact.title}</h2>
            <p className="text-lg text-muted mb-8">{about.contact.message}</p>
            <div className="space-y-4">
              <Link
                href={`mailto:${about.contact.email}`}
                className="inline-block text-xl font-semibold text-accent hover:text-accent-600 transition-colors"
              >
                {about.contact.email}
              </Link>
              <div className="flex justify-center gap-6 pt-4">
                {about.contact.social.instagram && (
                  <Link
                    href={about.contact.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors text-lg font-medium"
                  >
                    Instagram
                  </Link>
                )}
                {about.contact.social.facebook && (
                  <Link
                    href={about.contact.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors text-lg font-medium"
                  >
                    Facebook
                  </Link>
                )}
                {about.contact.social.twitter && (
                  <Link
                    href={about.contact.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors text-lg font-medium"
                  >
                    Twitter
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

