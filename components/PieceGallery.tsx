"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryImage = {
  url: string;
  alt: string;
};

export default function PieceGallery({
  images,
}: {
  images: GalleryImage[];
}) {
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
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen]);

  if (!images.length) return null;

  return (
    <>
      <div className="space-y-4">
        <button
          type="button"
          onClick={() => setLightboxOpen(true)}
          className="group block w-full overflow-hidden bg-[#eeeae2]"
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

        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-3">
            {images.map((image, index) => (
              <button
                key={`${image.url}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden border transition ${
                  selectedIndex === index
                    ? "border-black"
                    : "border-black/10 hover:border-black/40"
                }`}
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={300}
                  className="aspect-square h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
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
                onClick={(e) => {
                  e.stopPropagation();
                  previousImage();
                }}
                className="absolute left-6 top-1/2 z-20 -translate-y-1/2 text-6xl font-light text-white transition hover:opacity-70"
                aria-label="Previous image"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
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
            onClick={(e) => e.stopPropagation()}
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
