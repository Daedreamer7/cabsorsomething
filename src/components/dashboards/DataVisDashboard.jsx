import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faChartBar,
  faChartPie,
  faFilter,
  faDownload,
  faSync
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const ChartCard = ({ title, children, onRefresh, onDownload, onFilter }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex space-x-2">
        <button
          onClick={onFilter}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Filter data"
        >
          <FontAwesomeIcon icon={faFilter} className="text-gray-600" />
        </button>
        <button
          onClick={onRefresh}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Refresh data"
        >
          <FontAwesomeIcon icon={faSync} className="text-gray-600" />
        </button>
        <button
          onClick={onDownload}
          className="p-2 hover:bg-gray-100 rounded-lg"
          title="Download data"
        >
          <FontAwesomeIcon icon={faDownload} className="text-gray-600" />
        </button>
      </div>
    </div>
    {children}
  </div>
);

const DataVisDashboard = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const scatterChartRef = useRef(null);

  useEffect(() => {
    // Line Chart - Time Series Data
    if (lineChartRef.current) {
      const lineChart = new Chart(lineChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [65, 59, 80, 81, 56, 55],
              borderColor: '#3B82F6',
              tension: 0.4
            },
            {
              label: 'Expenses',
              data: [28, 48, 40, 19, 86, 27],
              borderColor: '#EF4444',
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Financial Performance'
            }
          }
        }
      });

      return () => lineChart.destroy();
    }
  }, []);

  useEffect(() => {
    // Bar Chart - Comparison Data
    if (barChartRef.current) {
      const barChart = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels: ['Q1', 'Q2', 'Q3', 'Q4'],
          datasets: [
            {
              label: '2022',
              data: [65, 59, 80, 81],
              backgroundColor: 'rgba(59, 130, 246, 0.5)'
            },
            {
              label: '2023',
              data: [45, 79, 50, 91],
              backgroundColor: 'rgba(16, 185, 129, 0.5)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Quarterly Performance'
            }
          }
        }
      });

      return () => barChart.destroy();
    }
  }, []);

  useEffect(() => {
    // Pie Chart - Distribution Data
    if (pieChartRef.current) {
      const pieChart = new Chart(pieChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            data: [30, 25, 25, 20],
            backgroundColor: [
              '#3B82F6',
              '#10B981',
              '#F59E0B',
              '#EF4444'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            },
            title: {
              display: true,
              text: 'Revenue Distribution'
            }
          }
        }
      });

      return () => pieChart.destroy();
    }
  }, []);

  useEffect(() => {
    // Scatter Chart - Correlation Data
    if (scatterChartRef.current) {
      const scatterChart = new Chart(scatterChartRef.current, {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Sales vs. Marketing',
            data: [
              { x: 10, y: 15 },
              { x: 15, y: 25 },
              { x: 20, y: 30 },
              { x: 25, y: 35 },
              { x: 30, y: 45 }
            ],
            backgroundColor: 'rgba(59, 130, 246, 0.5)'
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Marketing Impact on Sales'
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Marketing Spend (K)'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Sales Revenue (K)'
              }
            }
          }
        }
      });

      return () => scatterChart.destroy();
    }
  }, []);

  const handleRefresh = () => {
    // Implement refresh logic
    console.log('Refreshing data...');
  };

  const handleDownload = () => {
    // Implement download logic
    console.log('Downloading data...');
  };

  const handleFilter = () => {
    // Implement filter logic
    console.log('Opening filter dialog...');
  };

  return (
    <DashboardLayout title="Data Visualization Dashboard" user={{ name: 'Data Analyst' }}>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <ChartCard
          title="Time Series Analysis"
          onRefresh={handleRefresh}
          onDownload={handleDownload}
          onFilter={handleFilter}
        >
          <canvas ref={lineChartRef} height="300"></canvas>
        </ChartCard>

        <ChartCard
          title="Comparative Analysis"
          onRefresh={handleRefresh}
          onDownload={handleDownload}
          onFilter={handleFilter}
        >
          <canvas ref={barChartRef} height="300"></canvas>
        </ChartCard>

        <ChartCard
          title="Distribution Analysis"
          onRefresh={handleRefresh}
          onDownload={handleDownload}
          onFilter={handleFilter}
        >
          <canvas ref={pieChartRef} height="300"></canvas>
        </ChartCard>

        <ChartCard
          title="Correlation Analysis"
          onRefresh={handleRefresh}
          onDownload={handleDownload}
          onFilter={handleFilter}
        >
          <canvas ref={scatterChartRef} height="300"></canvas>
        </ChartCard>
      </div>

      {/* Additional Analysis Section */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              Revenue growth shows positive trend
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              Q4 performance exceeded expectations
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
              Product A leads in revenue share
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Anomalies</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              Unusual spike in expenses (Mar)
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              Below average performance (May)
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              Increase marketing spend for Product B
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
              Optimize Q3 resource allocation
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DataVisDashboard;
