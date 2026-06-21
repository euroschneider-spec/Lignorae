"use client";

import Image from "next/image";
import { useState } from "react";

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

  if (images.length === 0) return null;

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
            width={1400}
            height={1000}
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
                  index === selectedIndex
                    ? "border-black"
                    : "border-black/10"
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
        <div className="fixed inset-0 z-[100] bg-black/95">
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-6 top-6 z-10 text-4xl text-white"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={previousImage}
                className="absolute left-6 top-1/2 z-10 -translate-y-1/2 text-5xl text-white"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={nextImage}
                className="absolute right-6 top-1/2 z-10 -translate-y-1/2 text-5xl text-white"
              >
                ›
              </button>
            </>
          )}

          <div className="flex h-full items-center justify-center p-10">
            <Image
              src={selectedImage.url}
              alt={selectedImage.alt}
              width={2200}
              height={2200}
              className="max-h-full w-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
