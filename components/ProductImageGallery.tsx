"use client";

import { useState } from "react";
import Image from "next/image";
import * as Dialog from "@/components/ui/Dialog";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";

type ProductImageGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (!images || images.length === 0) return null;

  const currentImage = images[selectedIndex];
  const hasMultiple = images.length > 1;

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative group mb-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-2">
          <Image
            src={currentImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
            unoptimized
          />
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/10 transition-colors rounded-lg group/btn"
          aria-label="View full size image"
        >
          <div className="opacity-0 group-hover/btn:opacity-100 transition-opacity bg-surface/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
            <ZoomIn className="h-6 w-6 text-text" />
          </div>
        </button>
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-8 bg-accent"
                    : "w-2 bg-surface/60 hover:bg-surface/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {hasMultiple && images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                index === selectedIndex
                  ? "border-accent ring-2 ring-accent-100"
                  : "border-border hover:border-accent/50"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}

      {/* Full Screen Dialog */}
      <Dialog.Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <Dialog.DialogClose className="absolute top-4 right-4 z-50 text-white hover:text-accent transition-colors">
              <X className="h-6 w-6" />
            </Dialog.DialogClose>

            {/* Main Image */}
            <div className="relative w-full h-full flex items-center justify-center p-8">
              <Image
                src={currentImage}
                alt={title}
                fill
                className="object-contain"
                unoptimized
              />
            </div>

            {/* Navigation Buttons */}
            {hasMultiple && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-surface/90 hover:bg-surface text-text rounded-full p-3 shadow-lg transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-surface/90 hover:bg-surface text-text rounded-full p-3 shadow-lg transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 bg-surface/90 text-text px-4 py-2 rounded-full text-sm font-medium">
                  {selectedIndex + 1} / {images.length}
                </div>

                {/* Thumbnail Strip */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 flex gap-2 max-w-4xl overflow-x-auto px-4">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedIndex(index)}
                      className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                        index === selectedIndex
                          ? "border-accent ring-2 ring-accent"
                          : "border-surface/50 hover:border-surface"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${title} thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </Dialog.DialogContent>
      </Dialog.Dialog>
    </>
  );
}

