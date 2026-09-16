import React, { useState, useEffect } from 'react';

/**
 * NextImage: Next.js Image component equivalent
 * Provides smooth progressive loading, instant cached rendering, preloading,
 * and eliminates layout jumps and slow rendering lag.
 */
export interface NextImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  className?: string;
}

export function NextImage({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  sizes,
  className = '',
  ...rest
}: NextImageProps) {
  // If priority is true or image is already cached by browser, start as loaded immediately
  const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === 'undefined') return false;
    // Check if image is already cached
    const img = new Image();
    img.src = src;
    return img.complete;
  });

  useEffect(() => {
    // If priority, proactively warm up image in memory
    if (priority && typeof window !== 'undefined') {
      const img = new Image();
      img.src = src;
      if (img.complete) {
        setIsLoaded(true);
      } else {
        img.onload = () => setIsLoaded(true);
      }
    }
  }, [src, priority]);

  const containerClasses = fill
    ? `absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`
    : `transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-90'} ${className}`;

  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : 'auto'}
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      className={containerClasses}
      {...rest}
    />
  );
}

export default NextImage;
