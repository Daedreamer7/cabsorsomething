import React, { useState } from 'react';
import { FiPlus, FiMap, FiDollarSign, FiCalendar, FiClock } from 'react-icons/fi';

const TravelDashboard = () => {
  const [trips, setTrips] = useState([
    {
      id: 1,
      destination: 'New York, NY',
      purpose: 'Client Meeting',
      startDate: '2024-01-18',
      endDate: '2024-01-20',
      status: 'upcoming',
      budget: 1200,
      expenses: 0,
      transportation: 'Flight AA123',
      accommodation: 'Hilton Downtown'
    },
    {
      id: 2,
      destination: 'San Francisco, CA',
      purpose: 'Tech Conference',
      startDate: '2024-02-05',
      endDate: '2024-02-08',
      status: 'upcoming',
      budget: 2500,
      expenses: 0,
      transportation: 'Flight UA456',
      accommodation: 'Marriott Union Square'
    },
    {
      id: 3,
      destination: 'Chicago, IL',
      purpose: 'Team Workshop',
      startDate: '2023-12-15',
      endDate: '2023-12-17',
      status: 'completed',
      budget: 1800,
      expenses: 1650,
      transportation: 'Flight DL789',
      accommodation: 'Hyatt Regency'
    }
  ]);

  const upcomingTrips = trips.filter(trip => trip.status === 'upcoming');
  const completedTrips = trips.filter(trip => trip.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Travel Management</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="w-4 h-4" />
            <span>Plan New Trip</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FiMap className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Upcoming Trips</p>
              <p className="text-2xl font-semibold text-gray-900">{upcomingTrips.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${upcomingTrips.reduce((sum, trip) => sum + trip.budget, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiCalendar className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Travel Days</p>
              <p className="text-2xl font-semibold text-gray-900">
                {upcomingTrips.reduce((sum, trip) => {
                  const start = new Date(trip.startDate);
                  const end = new Date(trip.endDate);
                  return sum + Math.ceil((end - start) / (1000 * 60 * 60 * 24));
                }, 0)}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FiClock className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Trips</p>
              <p className="text-2xl font-semibold text-gray-900">{completedTrips.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Trips */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Trips</h3>
        </div>
        <div className="divide-y">
          {upcomingTrips.map(trip => (
            <div key={trip.id} className="p-6 hover:bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{trip.destination}</h4>
                    <p className="text-sm text-gray-500">{trip.purpose}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
                    Upcoming
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Dates</p>
                    <p className="font-medium">{trip.startDate} - {trip.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-medium">${trip.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Transportation</p>
                    <p className="font-medium">{trip.transportation}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Accommodation</p>
                    <p className="font-medium">{trip.accommodation}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100">
                    View Details
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                    Edit Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Trips */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Past Trips</h3>
        </div>
        <div className="divide-y">
          {completedTrips.map(trip => (
            <div key={trip.id} className="p-6 hover:bg-gray-50">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">{trip.destination}</h4>
                    <p className="text-sm text-gray-500">{trip.purpose}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full">
                    Completed
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Dates</p>
                    <p className="font-medium">{trip.startDate} - {trip.endDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Expenses</p>
                    <p className="font-medium">${trip.expenses} / ${trip.budget}</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100">
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelDashboard;
