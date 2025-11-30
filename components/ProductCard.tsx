import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '@/components/ui/Card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  slug: string;
  title: string;
  excerpt?: string;
  price?: string | number;
  image?: string;
  category?: string;
  showCategory?: boolean;
}

export default function ProductCard({
  slug,
  title,
  excerpt,
  price,
  image,
  category,
  showCategory = true,
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full border-border/50 hover:border-accent/50">
      {/* Image Container - Optimized */}
      <Link
        href={`/products/${slug}`}
        className="block overflow-hidden bg-surface-2 aspect-video relative group"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-muted text-sm">No image</span>
          </div>
        )}
      </Link>

      {/* Content Container */}
      <CardHeader className="flex-1 pb-3">
        <h3 className="text-sm font-bold text-text line-clamp-2 mb-2">
          <Link
            href={`/products/${slug}`}
            className="hover:text-accent transition-colors"
          >
            {title}
          </Link>
        </h3>

        {excerpt && (
          <p className="text-xs text-muted line-clamp-2">{excerpt}</p>
        )}
      </CardHeader>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex flex-col">
          {price && (
            <div className="text-sm font-bold text-accent">
              {typeof price === 'number' ? `₹${price}` : price}
            </div>
          )}
          {category && showCategory && (
            <span className="text-xs text-muted mt-1">{category}</span>
          )}
        </div>
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center justify-center h-8 w-8 rounded-md bg-accent/10 text-accent hover:bg-accent hover:text-accent-contrast transition-colors"
          title="View product"
        >
          <ShoppingCart className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
