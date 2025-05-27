import React from 'react';

import Title from './Title';

interface PageLayoutProps {
  children?: React.ReactNode;
  title?: string;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16">
      {title && <Title containerClassName="mb-4" title={title} />}
      <div className="flex flex-col gap-4 md:gap-6 xl:gap-8">{children}</div>
    </div>
  );
};

export default PageLayout;
