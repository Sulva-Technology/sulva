import Image from 'next/image';

type RemoteSafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

export default function RemoteSafeImage({
  src,
  alt,
  className,
  priority = false,
}: RemoteSafeImageProps) {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      priority={priority}
    />
  );
}
