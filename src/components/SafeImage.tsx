import React from 'react';

import fallbackSrc from '@/assets/images/fallback.jpeg?url';

const SafeImage = ({
  src,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== fallbackSrc) {
      img.src = fallbackSrc;
    }
  };

  const finalSrc = src ? src : fallbackSrc;

  return <img {...props} src={finalSrc} onError={handleError} />;
};

export default SafeImage;
