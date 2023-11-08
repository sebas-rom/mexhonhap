import React, { useEffect, useState } from 'react';
import { Blurhash } from 'react-blurhash';

interface HashImageProps {
  src: string;
  alt?: string;
  hash?: string;
  style?: React.CSSProperties;
}

function HashImage({
  src,
  alt = 'image',
  hash = 'L6PZfSi_.AyE_3t7t7R**0o#DgR4',
  style,
}: HashImageProps) {
  const [loading, setLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    setLoading(true); // Set loading to true when a new image is requested
    const image = new Image();
    image.src = src;

    image.onload = () => {
      setLoading(false); // Set loading to false when the image is loaded
    };

    return () => {
      image.onload = null;
    };
  }, [src]);

  return loading ? ( // Check if the image is still loading
    <Blurhash
      hash={hash}
      width="100%"
      height="100%"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        objectFit: 'cover',
        alignContent: 'center',
        alignItems: 'center',
        ...style,
      }}
    />
  ) : (
    <img
      src={src}
      alt={alt}
      style={{
        objectFit: 'cover',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        ...style,
      }}
      loading="lazy"
    />
  );
}

export default HashImage;
