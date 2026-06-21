"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  url: string;
  alt: string;
};

export default function PieceGallery({ images }: { images: GalleryImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const selectedImage = images[selectedIndex];

  function previousImage() {
    setSelectedIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  }

  function nextImage() {
    setSelectedIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  }

  useEffect(() => {
    if (!lightboxOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowLeft") previousImage();
      if (event.key === "ArrowRight") nextImage();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  if (!images.length) return null;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-[88px_1fr]">
        {images.length > 1 && (
          <div className="order-2 grid grid-cols-4 gap-3 md:order-1 md:grid-cols-1">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden border bg-[#eeeae2] transition ${
                  selectedIndex === index
                    ? "border-black"
                    : "border-black/10 hover:border-black/40"
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={180}
                  height={180}
                  className="aspect-square h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group order-1 block w-full overflow-hidden bg-[#eeeae2] md:order-2"
          aria-label="Open image gallery"
        >
          <Image
            src={selectedImage.url}
            alt={selectedImage.alt}
            width={1600}
            height={1200}
            priority
            className="h-auto w-full object-contain transition duration-700 group-hover:scale-[1.01]"
          />
        </button>
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-8 top-6 z-20 text-5xl font-light text-white transition hover:opacity-70"
            aria-label="Close gallery"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  previousImage();
                }}
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-6xl font-light text-white transition hover:opacity-70"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 z-20 -translate-y-1/2 text-6xl font-light text-white transition hover:opacity-70"
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          <div
            className="flex h-full items-center justify-center p-8 md:p-12"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={2400}
              height={2400}
              className="max-h-[92vh] w-auto max-w-[92vw] object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm tracking-[0.25em] text-white/70">
              {selectedIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </>
  );
}
