'use client';

import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import * as Popover from '@/components/ui/Popover';

interface ShareProductButtonProps {
  slug: string;
  title: string;
}

export default function ShareProductButton({ slug, title }: ShareProductButtonProps) {
  const [copied, setCopied] = useState(false);

  const productUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/products/${slug}`
    : `${process.env.NEXT_PUBLIC_SITE_URL || 'https://orogud.com'}/products/${slug}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(productUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;

  return (
    <Popover.Popover>
      <Popover.PopoverTrigger asChild>
        <button className="btn btn-outline px-4">
          <Share2 className="h-5 w-5" />
        </button>
      </Popover.PopoverTrigger>
      <Popover.PopoverContent className="w-64">
        <div className="space-y-3">
          <h4 className="font-semibold text-text mb-3">Share Product</h4>
          <div className="space-y-2">
            <button
              onClick={handleCopyLink}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-accent-100 transition-colors text-sm flex items-center justify-between"
            >
              <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              {copied && <Check className="h-4 w-4 text-accent" />}
            </button>
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-accent-100 transition-colors text-sm"
            >
              Share on Twitter
            </a>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-accent-100 transition-colors text-sm"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </Popover.PopoverContent>
    </Popover.Popover>
  );
}
