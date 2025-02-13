import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faBell,
  faPalette,
  faGlobe,
  faShieldAlt,
  faSave,
  faUndo
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';
import DynamicForm from '../forms/DynamicForm';

const SettingsSection = ({ title, description, children }) => (
  <div className="mb-8">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
    {children}
  </div>
);

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const profileFields = [
    {
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      required: true,
      validation: (value) => {
        if (value.length < 2) return 'Name must be at least 2 characters long';
        return null;
      }
    },
    {
      type: 'email',
      name: 'email',
      label: 'Email Address',
      required: true
    },
    {
      type: 'text',
      name: 'title',
      label: 'Job Title',
      required: true
    },
    {
      type: 'textarea',
      name: 'bio',
      label: 'Bio',
      helpText: 'Brief description about yourself'
    }
  ];

  const securityFields = [
    {
      type: 'password',
      name: 'currentPassword',
      label: 'Current Password',
      required: true
    },
    {
      type: 'password',
      name: 'newPassword',
      label: 'New Password',
      required: true,
      validation: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters long';
        if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
        if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
        return null;
      }
    },
    {
      type: 'password',
      name: 'confirmPassword',
      label: 'Confirm New Password',
      required: true
    }
  ];

  const notificationFields = [
    {
      type: 'checkbox',
      name: 'emailNotifications',
      label: 'Email Notifications',
      helpText: 'Receive notifications via email'
    },
    {
      type: 'checkbox',
      name: 'pushNotifications',
      label: 'Push Notifications',
      helpText: 'Receive notifications in your browser'
    },
    {
      type: 'checkbox',
      name: 'marketingEmails',
      label: 'Marketing Emails',
      helpText: 'Receive updates about new features and promotions'
    }
  ];

  const appearanceFields = [
    {
      type: 'select',
      name: 'theme',
      label: 'Theme',
      options: [
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
        { value: 'system', label: 'System' }
      ]
    },
    {
      type: 'select',
      name: 'density',
      label: 'Density',
      options: [
        { value: 'comfortable', label: 'Comfortable' },
        { value: 'compact', label: 'Compact' }
      ]
    },
    {
      type: 'select',
      name: 'fontSize',
      label: 'Font Size',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ]
    }
  ];

  const handleSubmit = async (values) => {
    // Implement form submission logic
    console.log('Form submitted:', values);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <SettingsSection
            title="Profile Settings"
            description="Manage your personal information and profile settings"
          >
            <DynamicForm
              fields={profileFields}
              onSubmit={handleSubmit}
              submitLabel="Save Profile"
            />
          </SettingsSection>
        );

      case 'security':
        return (
          <SettingsSection
            title="Security Settings"
            description="Update your password and security preferences"
          >
            <DynamicForm
              fields={securityFields}
              onSubmit={handleSubmit}
              submitLabel="Update Password"
            />
          </SettingsSection>
        );

      case 'notifications':
        return (
          <SettingsSection
            title="Notification Settings"
            description="Configure how you want to receive notifications"
          >
            <DynamicForm
              fields={notificationFields}
              onSubmit={handleSubmit}
              submitLabel="Save Preferences"
            />
          </SettingsSection>
        );

      case 'appearance':
        return (
          <SettingsSection
            title="Appearance Settings"
            description="Customize the look and feel of your dashboard"
          >
            <DynamicForm
              fields={appearanceFields}
              onSubmit={handleSubmit}
              submitLabel="Save Appearance"
            />
          </SettingsSection>
        );

      default:
        return null;
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: faUser },
    { id: 'security', label: 'Security', icon: faLock },
    { id: 'notifications', label: 'Notifications', icon: faBell },
    { id: 'appearance', label: 'Appearance', icon: faPalette }
  ];

  return (
    <DashboardLayout title="Settings" user={{ name: 'John Doe' }}>
      <div className="flex">
        {/* Settings Navigation */}
        <div className="w-64 pr-8">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 text-sm font-medium rounded-lg ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6">
          {renderContent()}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
