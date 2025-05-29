import React, { ReactNode } from 'react';

import Alert from './Alert';
import Footer from './Footer';
import Modal from './Modal';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dk_background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Alert />
      <Modal />
      <Footer />
    </div>
  );
};

export default Layout;
