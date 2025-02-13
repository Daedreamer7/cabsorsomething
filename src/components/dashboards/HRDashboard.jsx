import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faUserPlus,
  faChartLine,
  faCalendarAlt,
  faUserGraduate,
  faClipboardList,
  faComments
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const StatCard = ({ icon, title, value, change, color }) => (
  <div className="stat-card bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-600 text-xl`} />
      </div>
      <span className={`text-${change >= 0 ? 'green' : 'red'}-500 flex items-center`}>
        <FontAwesomeIcon icon={faChartLine} className="mr-1" />
        {change}%
      </span>
    </div>
    <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

const EmployeeCard = ({ name, position, department, status }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <img 
      src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`} 
      alt={name} 
      className="w-10 h-10 rounded-full"
    />
    <div className="ml-4 flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <span className={`px-2 py-1 text-xs rounded-full ${
          status === 'Active' ? 'bg-green-100 text-green-800' :
          status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      <p className="text-xs text-gray-500">{position} • {department}</p>
    </div>
  </div>
);

const RecruitmentCard = ({ position, department, applicants, stage }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium text-gray-900">{position}</h3>
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
        {applicants} Applicants
      </span>
    </div>
    <p className="text-xs text-gray-500 mb-2">{department}</p>
    <div className="flex items-center text-xs text-gray-500">
      <span className="mr-2">Stage:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-500 rounded-full h-2" 
          style={{ width: `${stage}%` }}
        />
      </div>
      <span className="ml-2">{stage}%</span>
    </div>
  </div>
);

const HRDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Engineering', 'Sales', 'Marketing', 'HR', 'Design', 'Finance'],
        datasets: [{
          label: 'Headcount',
          data: [45, 32, 28, 12, 25, 18],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const stats = [
    { icon: faUsers, title: 'Total Employees', value: '160', change: 5, color: 'blue' },
    { icon: faUserPlus, title: 'New Hires', value: '24', change: 12, color: 'green' },
    { icon: faUserGraduate, title: 'Training Hours', value: '1,280', change: 8, color: 'purple' },
    { icon: faClipboardList, title: 'Open Positions', value: '15', change: -3, color: 'yellow' }
  ];

  const employees = [
    { name: 'Emma Thompson', position: 'Senior Developer', department: 'Engineering', status: 'Active' },
    { name: 'Michael Chen', position: 'Product Designer', department: 'Design', status: 'On Leave' },
    { name: 'Sarah Wilson', position: 'Marketing Lead', department: 'Marketing', status: 'Active' }
  ];

  const recruitments = [
    { position: 'Frontend Developer', department: 'Engineering', applicants: 45, stage: 75 },
    { position: 'UX Designer', department: 'Design', applicants: 28, stage: 50 },
    { position: 'Sales Manager', department: 'Sales', applicants: 32, stage: 25 }
  ];

  return (
    <DashboardLayout title="HR Dashboard" user={{ name: 'HR Manager' }}>
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Department Headcount */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Department Headcount</h2>
              <select className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
            <canvas ref={chartRef} height="300"></canvas>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUserPlus} className="text-blue-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">New employee onboarded</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-green-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Team building event scheduled</p>
                  <p className="text-xs text-gray-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <FontAwesomeIcon icon={faComments} className="text-purple-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Performance review completed</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Status */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Employee Status</h2>
            <div className="space-y-4">
              {employees.map((employee, index) => (
                <EmployeeCard key={index} {...employee} />
              ))}
            </div>
          </div>
        </div>

        {/* Active Recruitments */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Recruitments</h2>
            <div className="space-y-4">
              {recruitments.map((recruitment, index) => (
                <RecruitmentCard key={index} {...recruitment} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;
