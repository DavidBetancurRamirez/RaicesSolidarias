import React from 'react';

interface GridTwoColumnsProps {
  children: React.ReactNode;
  reverseOnMobile?: boolean;
}

const GridTwoColumns: React.FC<GridTwoColumnsProps> = ({
  children,
  reverseOnMobile,
}) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:gap-8 w-full ${
      reverseOnMobile ? '!flex flex-col-reverse md:!grid' : 'grid'
    }`}
  >
    {children}
  </div>
);

export default GridTwoColumns;
