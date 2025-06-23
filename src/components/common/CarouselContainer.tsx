import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IconButton } from '@material-tailwind/react';

type direction = 'left' | 'right';

interface CarouselContainerProps {
  alwaysShowArrows?: boolean;
  children: React.ReactNode;
}

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  alwaysShowArrows = false,
  children,
}) => {
  const [showArrows, setShowArrows] = useState<boolean>(alwaysShowArrows);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (!alwaysShowArrows && containerRef.current && contentRef.current) {
        setShowArrows(
          contentRef.current.scrollWidth > containerRef.current.clientWidth,
        );
      }
    };

    checkOverflow();

    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [children]);

  const scroll = (direction: direction) => {
    if (!contentRef.current) return;

    const { scrollLeft, clientWidth } = contentRef.current;
    const scrollAmount = clientWidth * 0.8;

    if (direction === 'left') {
      contentRef.current.scrollTo({
        behavior: 'smooth',
        left: scrollLeft - scrollAmount,
      });
    } else {
      contentRef.current.scrollTo({
        behavior: 'smooth',
        left: scrollLeft + scrollAmount,
      });
    }
  };

  return (
    <div className="w-full flex items-center gap-4" ref={containerRef}>
      {showArrows && (
        <IconButton
          className="p-4 bg-primary dark:bg-dk_primary"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </IconButton>
      )}

      <div
        className="flex gap-4 overflow-x-auto overflow-y-hidden scroll-smooth pb-2 w-full snap-x snap-mandatory"
        ref={contentRef}
      >
        {children}
      </div>

      {showArrows && (
        <IconButton
          className="p-4 bg-primary dark:bg-dk_primary"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </IconButton>
      )}
    </div>
  );
};

export default CarouselContainer;
