import React from 'react';

const GridTwoColumns = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 xl:gap-8 w-full">
    {children}
  </div>
);

export default GridTwoColumns;
