import React, { ReactNode } from 'react';

import CustomAlert from './CustomAlert';
import CustomModal from '@components/layout/CustomModal';
import CustomNavbar from './CustomNavbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dk_background">
      <CustomNavbar />
      {/* Add top padding so content isn't hidden under the fixed navbar (py-6 ~ 96px) */}
      <main className="flex-1 pt-24">{children}</main>
      <CustomAlert />
      <CustomModal />
      <Footer />
    </div>
  );
};

export default Layout;
