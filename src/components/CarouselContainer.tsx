import React, { useRef } from 'react';
import { IconButton } from '@material-tailwind/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselContainerProps {
  children: React.ReactNode;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const { scrollLeft, clientWidth } = containerRef.current;
    const scrollAmount = clientWidth * 0.8;

    if (direction === 'left') {
      containerRef.current.scrollTo({
        behavior: 'smooth',
        left: scrollLeft - scrollAmount,
      });
    } else {
      containerRef.current.scrollTo({
        behavior: 'smooth',
        left: scrollLeft + scrollAmount,
      });
    }
  };

  return (
    <div className="w-full flex items-center gap-4">
      <IconButton
        className="p-4 bg-primary dark:bg-dk_primary"
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </IconButton>

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 w-full"
      >
        {children}
      </div>

      <IconButton
        className="p-4 bg-primary dark:bg-dk_primary"
        onClick={() => scroll('right')}
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </IconButton>
    </div>
  );
};

export default CarouselContainer;
