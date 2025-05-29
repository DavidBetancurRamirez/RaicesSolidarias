import React from 'react';
import { Carousel } from '@material-tailwind/react';

import CarouselContainer from './CarouselContainer';
import SafeImage from './SafeImage';

interface GalleryProps {
  gallery: string[];
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
        {gallery.map((imageLink, idx) => (
          <SafeImage
            key={imageLink + idx}
            src={imageLink}
            alt="gallery-image"
            className="h-96 md:h-[500px] w-full object-cover object-center"
          />
        ))}
      </Carousel>

      <CarouselContainer>
        {gallery.map((imageLink, index) => (
          <img
            key={imageLink + index}
            src={imageLink}
            className="h-40 w-40 cursor-pointer rounded-lg object-cover object-center"
            alt="gallery-thumbnail"
          />
        ))}
      </CarouselContainer>
    </div>
  );
};

export default Gallery;
