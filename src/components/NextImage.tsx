import React, { useState } from 'react';

/**
 * NextImage: Next.js Image component equivalent
 * Provides smooth progressive loading, aspect ratio containment, fill mode, and Next.js signature.
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
  const [isLoaded, setIsLoaded] = useState(false);

  const containerClasses = fill
    ? `absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`
    : `transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`;

  return (
    <img
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      onLoad={() => setIsLoaded(true)}
      className={containerClasses}
      {...rest}
    />
  );
}

export default NextImage;
