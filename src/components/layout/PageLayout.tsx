import React from 'react';
import { IconButton, IconButtonProps } from '@material-tailwind/react';

import Title, { TitleProps } from '@components/common/Title';

export interface Action {
  className?: string;
  disabled?: boolean;
  icon: React.ElementType;
  onClick?: () => void;
  type?: IconButtonProps['type'];
}

interface PageLayoutProps {
  actions?: Action[];
  children?: React.ReactNode;
  title?: TitleProps;
  useGap?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  actions,
  children,
  title,
  useGap = true,
}) => {
  return (
    <div className="py-4 px-2 sm:px-4 md:px-6 lg:px-10 xl:px-16">
      {title && (
        <div className="mb-4 flex justify-between items-center w-full">
          <Title containerClassName="w-full" {...title} />

          {actions?.length && (
            <div className="flex items-center gap-2">
              {actions.map((action, index) => (
                <IconButton
                  className={action.className ?? ''}
                  disabled={action.disabled}
                  key={index}
                  onClick={action.onClick}
                  size="sm"
                  type={action.type ?? 'button'}
                >
                  {React.createElement(action.icon, {
                    className: 'h-5 w-5 text-white',
                  })}
                </IconButton>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={`flex flex-col ${useGap && 'gap-4 md:gap-6 xl:gap-8'}`}>
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
