import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Alert from './Alert';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-dk_background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Alert />
      <Footer />
    </div>
  );
};

export default Layout;
