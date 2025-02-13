import React, { useState } from 'react';
import { FiBell, FiGlobe, FiLock, FiUser } from 'react-icons/fi';

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      desktop: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true
    },
    language: 'en',
    theme: 'light'
  });

  const handleNotificationChange = (key) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handlePrivacyChange = (key, value) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    });
  };

  const handleLanguageChange = (e) => {
    setSettings({
      ...settings,
      language: e.target.value
    });
  };

  const handleThemeChange = (e) => {
    setSettings({
      ...settings,
      theme: e.target.value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Notifications */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiBell className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-3 ml-7">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-gray-700 capitalize">{key} notifications</label>
                <button
                  onClick={() => handleNotificationChange(key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    value ? 'bg-indigo-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiLock className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Privacy</h3>
          </div>
          <div className="space-y-3 ml-7">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Profile Visibility</label>
              <select
                value={settings.privacy.profileVisibility}
                onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="contacts">Contacts</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Show Email</label>
              <button
                onClick={() => handlePrivacyChange('showEmail', !settings.privacy.showEmail)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  settings.privacy.showEmail ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.privacy.showEmail ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Language & Region */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiGlobe className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Language & Region</h3>
          </div>
          <div className="space-y-3 ml-7">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Language</label>
              <select
                value={settings.language}
                onChange={handleLanguageChange}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <FiUser className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
          </div>
          <div className="space-y-3 ml-7">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Theme</label>
              <select
                value={settings.theme}
                onChange={handleThemeChange}
                className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
