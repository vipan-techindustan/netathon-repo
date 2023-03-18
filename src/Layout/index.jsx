import React, { useState } from 'react'
import Header from '../partials/Header';
import Sidebar from '../partials/Sidebar';

export default function Layout({ children ,user:{isAuthenticated = false}}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      {
        isAuthenticated && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      }


      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        {isAuthenticated && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}

        <main>
          {children}
        </main>

      </div>
    </div>
  )
}
