'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronDown, X } from 'lucide-react';
import * as Select from '@/components/ui/Select';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';

interface ProductFilterProps {
  categories: string[];
  selectedCategory?: string;
  productCount: number;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  productCount,
}: ProductFilterProps) {
  return (
    <aside className="lg:w-56 flex-shrink-0">
      <div className="sticky top-6 space-y-6">
        {/* Filter Header */}
        <div>
          <h2 className="text-lg font-bold text-text mb-2">Filters</h2>
          <p className="text-sm text-muted">
            {productCount} product{productCount !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Categories Card */}
        <Card className="border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <div className="px-6 pb-6 space-y-2">
            <Link
              href="/products"
              className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                !selectedCategory
                  ? 'bg-accent text-accent-contrast shadow-sm'
                  : 'text-muted hover:bg-surface-2 hover:text-text'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>All Products</span>
                <span className="text-xs opacity-75">({categories.reduce((sum, cat) => sum + (cat ? 1 : 0), 0)})</span>
              </div>
            </Link>

            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <Link
                  key={category}
                  href={`/products?category=${encodeURIComponent(category)}`}
                  className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-accent text-accent-contrast shadow-sm'
                      : 'text-muted hover:bg-surface-2 hover:text-text'
                  }`}
                >
                  <span>{category}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* Clear Filter */}
        {selectedCategory && (
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-border text-sm font-medium text-muted hover:bg-surface-2 hover:text-text transition-all"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </Link>
        )}
      </div>
    </aside>
  );
}
