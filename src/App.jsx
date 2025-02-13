import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import AdminDashboard from './components/dashboards/AdminDashboard';
import SalesDashboard from './components/dashboards/SalesDashboard';
import DataVisDashboard from './components/dashboards/DataVisDashboard';
import FinancialDashboard from './components/dashboards/FinancialDashboard';
import HRDashboard from './components/dashboards/HRDashboard';
import ProjectManagement from './components/project/ProjectManagement';
import UserProfile from './components/profile/UserProfile';
import CompanyProfile from './components/company/CompanyProfile';
import FiresWidget from './components/widgets/FiresWidget';
import ProjectsWidget from './components/widgets/ProjectsWidget';
import MessageBoard from './components/messages/MessageBoard';
import Settings from './components/settings/Settings';
import CalendarDashboard from './components/dashboards/CalendarDashboard';
import MeetingsDashboard from './components/dashboards/MeetingsDashboard';
import TravelDashboard from './components/dashboards/TravelDashboard';
import { ROLES, ROLE_PERMISSIONS } from './config/roles';

function App() {
  const [currentView, setCurrentView] = useState('admin');
  const [userRole, setUserRole] = useState(ROLES.KEYHOLDER); // Default to keyholder for testing

  const hasPermission = (view) => {
    return ROLE_PERMISSIONS[userRole].dashboards.includes(view);
  };

  const renderView = () => {
    if (!hasPermission(currentView)) {
      return <div className="p-6 text-red-600">You don't have permission to access this view.</div>;
    }

    switch (currentView) {
      case 'admin':
        return <AdminDashboard />;
      case 'sales':
        return <SalesDashboard />;
      case 'data':
        return <DataVisDashboard />;
      case 'financial':
        return <FinancialDashboard />;
      case 'hr':
        return <HRDashboard />;
      case 'projects':
        return <ProjectManagement />;
      case 'profile':
        return <UserProfile />;
      case 'company':
        return <CompanyProfile />;
      case 'calendar':
        return <CalendarDashboard />;
      case 'meetings':
        return <MeetingsDashboard />;
      case 'travel':
        return <TravelDashboard />;
      case 'messages':
        return <MessageBoard />;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Sidebar 
        onViewChange={setCurrentView} 
        currentView={currentView} 
        userRole={userRole}
        permissions={ROLE_PERMISSIONS[userRole]}
      />
      
      {/* Main Content */}
      <main className="ml-64 pt-16 p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Content Area */}
          <div className="col-span-8">
            {renderView()}
          </div>

          {/* Right Sidebar Widgets */}
          <div className="col-span-4 space-y-6">
            <FiresWidget />
            <ProjectsWidget />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
