import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../common/Header';
import Footer from '../common/Footer';

const HomeLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen mx-auto  min-w-[800px]">
      <Header />
      <main className="flex-grow bg-gray-100 p-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout; 