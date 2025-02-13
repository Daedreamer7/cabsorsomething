import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faSearch,
  faHome,
  faChartLine,
  faUsers,
  faCalendarAlt,
  faComments,
  faCog,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const SidebarLink = ({ icon, text, href, active }) => (
  <Link
    href={href}
    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
      active
        ? 'bg-blue-50 text-blue-600'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    }`}
  >
    <FontAwesomeIcon icon={icon} />
    <span>{text}</span>
  </Link>
);

const DashboardLayout = ({ children, title, user }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  const sidebarLinks = [
    { icon: faHome, text: 'Dashboard', href: '/dashboard' },
    { icon: faChartLine, text: 'Analytics', href: '/analytics' },
    { icon: faUsers, text: 'Team', href: '/team' },
    { icon: faCalendarAlt, text: 'Calendar', href: '/calendar' },
    { icon: faComments, text: 'Messages', href: '/messages' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '256px' }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r">
          <div className="mb-6 px-4">
            <h1 className="text-xl font-bold text-gray-800">Concepts Plus</h1>
          </div>
          <div className="space-y-1">
            {sidebarLinks.map((link, index) => (
              <SidebarLink
                key={index}
                {...link}
                active={window.location.pathname === link.href}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <div className="space-y-1">
              <SidebarLink icon={faCog} text="Settings" href="/settings" />
              <button
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                onClick={() => {/* Add logout handler */}}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? 'ml-64' : ''} transition-margin duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex justify-between items-center px-8 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon icon={faBars} className="text-xl" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
              <button className="relative">
                <FontAwesomeIcon icon={faBell} className="text-gray-500 text-xl" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-gray-700 font-medium">{user?.name || 'User'}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
