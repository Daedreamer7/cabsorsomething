import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faServer,
  faShieldAlt,
  faExclamationTriangle,
  faBell,
  faCheckCircle,
  faCog,
  faUserPlus,
  faDatabase,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const StatCard = ({ icon, title, value, change, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-xl`} />
      </div>
      {change !== undefined && (
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const ActivityItem = ({ icon, title, time, status, statusColor }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg bg-${statusColor}-100`}>
        <FontAwesomeIcon icon={icon} className={`text-${statusColor}-500`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
      </div>
    </div>
    <span className={`px-2 py-1 text-xs font-medium rounded-full bg-${statusColor}-100 text-${statusColor}-700`}>
      {status}
    </span>
  </div>
);

const NotificationItem = ({ icon, title, time, type }) => (
  <div className="flex items-start space-x-3 p-4 border-b border-gray-100">
    <div className={`p-2 rounded-lg ${type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
      <FontAwesomeIcon 
        icon={icon} 
        className={type === 'warning' ? 'text-yellow-500' : 'text-blue-500'} 
      />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const userActivityChartRef = useRef(null);
  const systemLoadChartRef = useRef(null);

  const stats = [
    { icon: faUsers, title: 'Active Users', value: '1,234', change: 12, color: 'blue' },
    { icon: faServer, title: 'Server Load', value: '78%', change: -5, color: 'green' },
    { icon: faShieldAlt, title: 'Security Score', value: '94%', change: 3, color: 'purple' },
    { icon: faExclamationTriangle, title: 'Open Issues', value: '23', change: -15, color: 'red' }
  ];

  const activities = [
    { icon: faUserPlus, title: 'New user registration', time: '2 minutes ago', status: 'Completed', statusColor: 'green' },
    { icon: faDatabase, title: 'Database backup', time: '15 minutes ago', status: 'In Progress', statusColor: 'blue' },
    { icon: faServer, title: 'Server maintenance', time: '1 hour ago', status: 'Scheduled', statusColor: 'yellow' }
  ];

  const notifications = [
    { icon: faExclamationTriangle, title: 'High CPU usage detected', time: '5 minutes ago', type: 'warning' },
    { icon: faCheckCircle, title: 'System update completed', time: '1 hour ago', type: 'info' },
    { icon: faBell, title: 'New feature deployment', time: '2 hours ago', type: 'info' }
  ];

  const quickActions = [
    { icon: faUserPlus, title: 'Add User', color: 'blue' },
    { icon: faDatabase, title: 'Backup', color: 'green' },
    { icon: faCog, title: 'Settings', color: 'purple' },
    { icon: faChartLine, title: 'Reports', color: 'red' }
  ];

  useEffect(() => {
    // User Activity Chart
    if (userActivityChartRef.current) {
      const userActivityChart = new Chart(userActivityChartRef.current, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'Active Users',
            data: [650, 750, 850, 800, 900, 1000, 950],
            borderColor: '#3B82F6',
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(59, 130, 246, 0.1)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      return () => userActivityChart.destroy();
    }
  }, []);

  useEffect(() => {
    // System Load Chart
    if (systemLoadChartRef.current) {
      const systemLoadChart = new Chart(systemLoadChartRef.current, {
        type: 'bar',
        data: {
          labels: ['CPU', 'Memory', 'Disk', 'Network'],
          datasets: [{
            label: 'Usage %',
            data: [78, 65, 45, 55],
            backgroundColor: [
              'rgba(59, 130, 246, 0.5)',
              'rgba(16, 185, 129, 0.5)',
              'rgba(139, 92, 246, 0.5)',
              'rgba(239, 68, 68, 0.5)'
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(139, 92, 246)',
              'rgb(239, 68, 68)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      });

      return () => systemLoadChart.destroy();
    }
  }, []);

  return (
    <DashboardLayout title="Admin Dashboard" user={{ name: 'System Admin' }}>
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* User Activity Chart */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">User Activity</h2>
            <canvas ref={userActivityChartRef} height="300"></canvas>
          </div>
        </div>

        {/* System Load */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Load</h2>
            <canvas ref={systemLoadChartRef}></canvas>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className={`p-4 bg-${action.color}-50 rounded-lg hover:bg-${action.color}-100 transition-colors`}
                >
                  <FontAwesomeIcon icon={action.icon} className={`text-${action.color}-500 text-xl mb-2`} />
                  <p className="text-sm font-medium text-gray-900">{action.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>
        </div>

        {/* System Notifications */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">System Notifications</h2>
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <NotificationItem key={index} {...notification} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
