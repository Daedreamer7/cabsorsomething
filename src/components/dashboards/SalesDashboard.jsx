import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faDollarSign,
  faHandshake,
  faUsers,
  faBars,
  faBell,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const StatCard = ({ icon, title, value, change, color }) => (
  <div className="stat-card bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-600 text-xl`} />
      </div>
      <span className="text-green-500 flex items-center">
        <FontAwesomeIcon icon={faChartLine} className="mr-1" />{change}%
      </span>
    </div>
    <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
    <p className="text-sm text-gray-600">{title}</p>
  </div>
);

const TopDeal = ({ title, value, progress }) => (
  <div className="p-4 bg-gray-50 rounded-lg">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <span className="text-green-500 font-semibold">${value}K</span>
    </div>
    <div className="flex items-center text-xs text-gray-500">
      <span className="mr-2">Progress:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 rounded-full h-2" 
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="ml-2">{progress}%</span>
    </div>
  </div>
);

const PipelineStage = ({ title, deals }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
    <div className="space-y-2">
      {deals.map((deal, index) => (
        <div key={index} className="p-3 bg-white rounded border border-gray-200">
          <p className="text-sm font-medium">{deal.name}</p>
          <p className="text-xs text-gray-500">${deal.value}K</p>
        </div>
      ))}
    </div>
  </div>
);

const TeamMember = ({ name, value, deals }) => (
  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
    <img 
      src={`https://ui-avatars.com/api/?name=${name.replace(' ', '+')}`} 
      alt="Sales Rep" 
      className="w-10 h-10 rounded-full"
    />
    <div className="ml-4 flex-1">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        <span className="text-green-500 font-semibold">${value}K</span>
      </div>
      <p className="text-xs text-gray-500">{deals} deals closed this month</p>
    </div>
  </div>
);

const SalesDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Sales',
          data: [65, 59, 80, 81, 56, 55, 70],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
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
    { icon: faDollarSign, title: 'Total Revenue', value: '$892,453', change: 15, color: 'green' },
    { icon: faHandshake, title: 'Deals Closed', value: '164', change: 8, color: 'blue' },
    { icon: faUsers, title: 'New Leads', value: '2,845', change: 12, color: 'purple' },
    { icon: faChartLine, title: 'Conversion Rate', value: '68%', change: 6, color: 'yellow' }
  ];

  const topDeals = [
    { title: 'Office Building Design', value: '245', progress: 75 },
    { title: 'Corporate HQ Renovation', value: '180', progress: 60 }
  ];

  const pipelineStages = [
    {
      title: 'Lead Generation',
      deals: [
        { name: 'Tech Park Project', value: '120' },
        { name: 'Retail Complex', value: '85' }
      ]
    },
    {
      title: 'Qualification',
      deals: [
        { name: 'Mall Renovation', value: '200' }
      ]
    },
    {
      title: 'Proposal',
      deals: [
        { name: 'Office Tower', value: '350' },
        { name: 'Hotel Complex', value: '280' }
      ]
    },
    {
      title: 'Negotiation',
      deals: [
        { name: 'Corporate Campus', value: '500' }
      ]
    },
    {
      title: 'Closed Won',
      deals: [
        { name: 'City Center', value: '450' }
      ]
    }
  ];

  const teamMembers = [
    { name: 'John Smith', value: '320', deals: 12 },
    { name: 'Sarah Johnson', value: '285', deals: 10 }
  ];

  return (
    <DashboardLayout title="Sales Dashboard" user={{ name: 'Sales Manager' }}>
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sales Chart */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Sales Performance</h2>
              <select className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <canvas ref={chartRef} height="300"></canvas>
          </div>
        </div>

        {/* Top Deals */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Deals</h2>
            <div className="space-y-4">
              {topDeals.map((deal, index) => (
                <TopDeal key={index} {...deal} />
              ))}
            </div>
          </div>
        </div>

        {/* Pipeline */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales Pipeline</h2>
            <div className="grid grid-cols-5 gap-4">
              {pipelineStages.map((stage, index) => (
                <PipelineStage key={index} {...stage} />
              ))}
            </div>
          </div>
        </div>

        {/* Team Performance */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Performance</h2>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <TeamMember key={index} {...member} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SalesDashboard;
