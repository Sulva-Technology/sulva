'use client';

import Image from 'next/image';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { usePrefersReducedMotion } from '@/components/ui/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

type VideoFrameProps = {
  src?: string;
  poster: string;
  alt: string;
  playOn?: 'view' | 'hover';
  framed?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function canAutoplay() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return !connection?.saveData;
}

const noopSubscribe = () => () => {};

export default function VideoFrame({
  src,
  poster,
  alt,
  playOn = 'view',
  framed = true,
  priority = false,
  className,
  sizes = '(min-width: 1024px) 60vw, 100vw',
}: VideoFrameProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // False on the server and during hydration, so the poster always renders first.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const reduceMotion = usePrefersReducedMotion();
  const enabled = hydrated && Boolean(src) && !reduceMotion && canAutoplay();

  useEffect(() => {
    const video = videoRef.current;
    if (!enabled || playOn !== 'view' || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.5 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [enabled, playOn]);

  const hoverHandlers =
    enabled && playOn === 'hover'
      ? {
          onMouseEnter: () => void videoRef.current?.play().catch(() => {}),
          onMouseLeave: () => videoRef.current?.pause(),
        }
      : {};

  return (
    <div className={cn(framed && 'glass rounded-panel p-2', className)} {...hoverHandlers}>
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-ink-soft">
        <Image src={poster} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        {enabled ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload={priority ? 'metadata' : 'none'}
            aria-hidden="true"
            tabIndex={-1}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : null}
      </div>
    </div>
  );
}
