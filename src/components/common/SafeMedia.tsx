import React, { useState } from 'react';

import fallbackImg from '@/assets/images/fallback.jpeg';

import { TypeOfMedia } from '@/constants/interfaces';

type SafeMediaProps = React.ImgHTMLAttributes<HTMLImageElement> &
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    type?: TypeOfMedia;
    fallbackSrc?: string;
  };

const SafeMedia: React.FC<SafeMediaProps> = ({
  src,
  alt,
  type = 'image',
  fallbackSrc,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fallback = fallbackSrc || fallbackImg;
  const finalSrc = !error && src ? src : fallback;

  const handleLoad = () => setLoading(false);
  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="loader border-2 border-primary border-t-transparent rounded-full w-8 h-8 animate-spin" />
        </div>
      )}

      {type === 'image' ? (
        <img
          src={finalSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={loading ? { visibility: 'hidden' } : {}}
          {...props}
          className={`w-full h-full object-cover rounded-lg ${props.className || ''}`}
        />
      ) : (
        <video
          src={finalSrc}
          onLoadedData={handleLoad}
          onError={handleError}
          controls
          style={loading ? { visibility: 'hidden' } : {}}
          {...props}
          className={`w-full h-full object-cover rounded-lg ${props.className || ''}`}
        >
          {alt && <track kind="captions" label={alt} />}
        </video>
      )}
    </div>
  );
};

export default SafeMedia;
