import React, { useState } from 'react';

import fallbackSrc from '@/assets/images/fallback.jpeg?url';

const SafeImage = ({
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const finalSrc = !error && src ? src : fallbackSrc;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="loader border-2 border-primary border-t-transparent rounded-full w-8 h-8 animate-spin" />
        </div>
      )}
      <img
        src={finalSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={loading ? { visibility: 'hidden' } : {}}
        {...props}
        className={`w-full h-full object-cover rounded-lg ${props.className || ''} `}
      />
    </div>
  );
};

export default SafeImage;
