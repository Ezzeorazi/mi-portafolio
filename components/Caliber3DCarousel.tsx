'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const images = [
  {
    src: '/images/projects/caliber3d-foto-1.webp',
    alt: 'En Isla Mujeres, con la camiseta de Rosario Central',
    position: 'object-top',
  },
  {
    src: '/images/projects/caliber3d-foto-2.webp',
    alt: 'En Xel-há parque Xcaret',
    position: 'object-top',
  },
  {
    src: '/images/projects/caliber3d-foto-3.webp',
    alt: 'Tomando un coco en la playa',
    position: 'object-top',
  },
  {
    src: '/images/projects/caliber3d-foto-4.webp',
    alt: 'Amanecer en Portal Maya, Playa del Carmen',
    position: 'object-center',
  },
  {
    src: '/images/projects/caliber3d-foto-5.webp',
    alt: 'En el gimnasio',
    position: 'object-top',
  },
  {
    src: '/images/projects/caliber3d-foto-6.webp',
    alt: 'En la Quinta Avenida, Playa del Carmen',
    position: 'object-top',
  },
];

const INTERVAL = 4000;

export default function Caliber3DCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-3 items-center w-full">
      {/* Contenedor fijo en aspecto retrato — sin movimiento al cambiar foto */}
      <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-yellow/20 shadow-lg">
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              loading="eager"
              className={`object-cover ${img.position}`}
              sizes="(max-width: 768px) 90vw, 320px"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Foto ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i === current ? 'bg-yellow' : 'bg-yellow/30'
            }`}
          />
        ))}
      </div>

      {/* Caption — altura fija para que no salte el layout */}
      <p className="text-muted text-xs text-center min-h-[2.5rem] flex items-center px-2 transition-opacity duration-500">
        {images[current].alt}
      </p>
    </div>
  );
}
