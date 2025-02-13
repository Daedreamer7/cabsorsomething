import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDollarSign,
  faChartLine,
  faMoneyBillWave,
  faFileInvoiceDollar,
  faHandHoldingUsd,
  faExchangeAlt,
  faChartBar,
  faChartPie
} from '@fortawesome/free-solid-svg-icons';
import DashboardLayout from '../layout/DashboardLayout';

const StatCard = ({ icon, title, value, change, color }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 transform transition-transform hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        <FontAwesomeIcon icon={icon} className={`text-${color}-500 text-xl`} />
      </div>
      <span className={`text-sm font-medium ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
        {change >= 0 ? '+' : ''}{change}%
      </span>
    </div>
    <h3 className="text-sm font-medium text-gray-600">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const TransactionCard = ({ transaction }) => (
  <div className="flex items-center justify-between p-4 border-b border-gray-100">
    <div className="flex items-center space-x-3">
      <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
        <FontAwesomeIcon 
          icon={transaction.type === 'income' ? faMoneyBillWave : faExchangeAlt} 
          className={`${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}
        />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
        <p className="text-xs text-gray-500">{transaction.date}</p>
      </div>
    </div>
    <div className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
    </div>
  </div>
);

const FinancialDashboard = () => {
  const revenueChartRef = useRef(null);
  const expenseChartRef = useRef(null);

  const stats = [
    { icon: faDollarSign, title: 'Total Revenue', value: '$524,890', change: 12.5, color: 'green' },
    { icon: faMoneyBillWave, title: 'Total Expenses', value: '$235,670', change: -8.3, color: 'red' },
    { icon: faFileInvoiceDollar, title: 'Net Profit', value: '$289,220', change: 15.8, color: 'blue' },
    { icon: faHandHoldingUsd, title: 'Cash Flow', value: '$147,890', change: 6.2, color: 'purple' }
  ];

  const transactions = [
    { type: 'income', description: 'Client Payment - Project X', amount: '15,000', date: 'Today, 2:30 PM' },
    { type: 'expense', description: 'Office Supplies', amount: '2,500', date: 'Today, 11:30 AM' },
    { type: 'income', description: 'Consulting Services', amount: '8,500', date: 'Yesterday, 4:15 PM' },
    { type: 'expense', description: 'Software Subscriptions', amount: '1,200', date: 'Yesterday, 2:00 PM' }
  ];

  useEffect(() => {
    // Revenue Chart
    if (revenueChartRef.current) {
      const revenueChart = new Chart(revenueChartRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue',
            data: [65000, 75000, 85000, 82000, 90000, 95000],
            borderColor: '#10B981',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          }
        }
      });

      return () => revenueChart.destroy();
    }
  }, []);

  useEffect(() => {
    // Expense Distribution Chart
    if (expenseChartRef.current) {
      const expenseChart = new Chart(expenseChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Operations', 'Marketing', 'Salaries', 'Equipment', 'Other'],
          datasets: [{
            data: [30, 20, 25, 15, 10],
            backgroundColor: [
              '#10B981',
              '#3B82F6',
              '#F59E0B',
              '#EF4444',
              '#8B5CF6'
            ]
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right'
            }
          }
        }
      });

      return () => expenseChart.destroy();
    }
  }, []);

  return (
    <DashboardLayout title="Financial Dashboard" user={{ name: 'Finance Manager' }}>
      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Revenue Trend */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h2>
            <canvas ref={revenueChartRef} height="300"></canvas>
          </div>
        </div>

        {/* Expense Distribution */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Expense Distribution</h2>
            <canvas ref={expenseChartRef}></canvas>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="col-span-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-2">
              {transactions.map((transaction, index) => (
                <TransactionCard key={index} transaction={transaction} />
              ))}
            </div>
          </div>
        </div>

        {/* Financial Goals */}
        <div className="col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Goals</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Revenue Target</span>
                  <span className="text-sm font-medium text-gray-700">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Expense Budget</span>
                  <span className="text-sm font-medium text-gray-700">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Profit Margin</span>
                  <span className="text-sm font-medium text-gray-700">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FinancialDashboard;
