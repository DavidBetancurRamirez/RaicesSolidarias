import React from 'react';
import { Carousel } from '@material-tailwind/react';

// import CarouselContainer from './CarouselContainer';
import SafeMedia from './SafeMedia';

import { Media } from '@/constants/interfaces';

interface GalleryProps {
  gallery: Media[];
}

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  return (
    <div className="grid gap-4">
      <Carousel
        autoplay
        autoplayDelay={4000}
        className="rounded-xl"
        loop={true}
        transition={{ duration: 1.5 }}
      >
        {gallery.map((media) => (
          <SafeMedia
            alt="gallery-image"
            className="h-96 md:h-[500px] w-full object-cover object-center"
            key={media.url}
            src={media.url}
            type={media.type}
          />
        ))}
      </Carousel>

      {/* <CarouselContainer>
        {gallery.map((imageLink, index) => (
          <img
            alt={`gallery-image-${index}`}
            className="h-40 w-40 cursor-pointer rounded-lg object-cover object-center"
            key={imageLink + index}
            src={fallbackImg}
            // src={imageLink}
          />
        ))}
      </CarouselContainer> */}
    </div>
  );
};

export default Gallery;
