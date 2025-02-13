import React from 'react';
import { 
  FiGrid, 
  FiDollarSign, 
  FiPieChart, 
  FiUsers, 
  FiBarChart2, 
  FiBriefcase,
  FiFolder,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiCalendar,
  FiVideo,
  FiMap
} from 'react-icons/fi';

const allMenuItems = [
  { icon: FiGrid, label: 'Admin Dashboard', id: 'admin' },
  { icon: FiDollarSign, label: 'Sales Dashboard', id: 'sales' },
  { icon: FiPieChart, label: 'Data Visualization', id: 'data' },
  { icon: FiBarChart2, label: 'Financial', id: 'financial' },
  { icon: FiUsers, label: 'HR Dashboard', id: 'hr' },
  { icon: FiBriefcase, label: 'Company Profile', id: 'company' },
  { icon: FiFolder, label: 'Project Management', id: 'projects' },
  { icon: FiCalendar, label: 'Calendar', id: 'calendar' },
  { icon: FiVideo, label: 'Meetings', id: 'meetings' },
  { icon: FiMap, label: 'Travel', id: 'travel' },
  { icon: FiUser, label: 'My Profile', id: 'profile' },
  { icon: FiMessageSquare, label: 'Message Board', id: 'messages' },
  { icon: FiSettings, label: 'Settings', id: 'settings' }
];

const Sidebar = ({ onViewChange, currentView, userRole, permissions }) => {
  const menuItems = allMenuItems.filter(item => permissions.dashboards.includes(item.id));

  return (
    <aside className="fixed left-0 top-16 h-screen w-64 bg-white border-r border-gray-200">
      <nav className="p-4">
        <div className="mb-4 px-4">
          <span className="text-sm font-medium text-gray-500">Role: {userRole}</span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  currentView === item.id
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
