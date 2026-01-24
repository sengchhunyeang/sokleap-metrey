'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-[#F5F5FA] print:bg-white print:min-h-0">
      <div className="print:hidden">
        <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />
        <Navbar onMenuClick={toggleSidebar} />
      </div>
      <main
        className={`mt-16 p-4 transition-all duration-300 print:mt-0 print:ml-0 print:p-0 ${
          sidebarOpen ? 'ml-[256px]' : 'ml-0'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
