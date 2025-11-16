import React, { useState, useEffect, useRef } from 'react';

import fallbackImg from '@/assets/images/fallback.jpeg';

import { Media, TypeOfMedia } from '@/constants/interfaces';

type FitMode = 'cover' | 'contain' | 'smart';

type SafeMediaProps = React.ImgHTMLAttributes<HTMLImageElement> &
  React.VideoHTMLAttributes<HTMLVideoElement> & {
    media?: Media;
    fallbackSrc?: string;
    fit?: FitMode;
  };

const SafeMedia: React.FC<SafeMediaProps> = ({
  media,
  fallbackSrc,
  fit = 'smart',
  alt,
  className = '',
  src,
  ...props
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orientation, setOrientation] = useState<
    'portrait' | 'landscape' | null
  >(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const safeSrc = media?.url || src;
  const type: TypeOfMedia = media?.type || 'image';

  const fallback = fallbackSrc || fallbackImg;
  const finalSrc = !error && safeSrc ? safeSrc : fallback;

  const handleLoad = () => setLoading(false);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  // Detectar orientación para modo "smart"
  useEffect(() => {
    if (fit !== 'smart') return;

    if (type === 'image' && imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      if (naturalWidth && naturalHeight) {
        setOrientation(naturalHeight > naturalWidth ? 'portrait' : 'landscape');
      }
    }

    if (type === 'video' && videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      if (videoWidth && videoHeight) {
        setOrientation(videoHeight > videoWidth ? 'portrait' : 'landscape');
      }
    }
  }, [loading, fit, type]);

  // Determinar clase final de object-fit
  const resolveObjectFit = () => {
    if (fit === 'cover') return 'object-cover';
    if (fit === 'contain') return 'object-contain';

    // smart
    if (orientation === 'portrait') return 'object-contain';
    if (orientation === 'landscape') return 'object-cover';

    // Mientras carga sin orientación definida
    return 'object-cover';
  };

  const objectFitClass = resolveObjectFit();

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <span className="loader border-2 border-primary border-t-transparent rounded-full w-8 h-8 animate-spin" />
        </div>
      )}

      {type === 'video' ? (
        <video
          ref={videoRef}
          src={finalSrc}
          onLoadedData={handleLoad}
          onError={handleError}
          controls
          style={loading ? { visibility: 'hidden' } : {}}
          className={`w-full h-full rounded-lg ${objectFitClass} ${className}`}
          {...props}
        >
          {alt && <track kind="captions" label={alt} />}
        </video>
      ) : (
        <img
          ref={imgRef}
          src={finalSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={loading ? { visibility: 'hidden' } : {}}
          className={`w-full h-full rounded-lg ${objectFitClass} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default SafeMedia;
