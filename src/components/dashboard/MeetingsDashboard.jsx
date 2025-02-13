import React, { useState } from 'react';
import { FiPlus, FiVideo, FiUsers, FiClock, FiCalendar } from 'react-icons/fi';

const MeetingsDashboard = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Weekly Team Sync',
      type: 'recurring',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '1 hour',
      attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Client Project Review',
      type: 'one-time',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '45 minutes',
      attendees: ['Sarah Wilson', 'Tom Brown'],
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Product Demo',
      type: 'one-time',
      date: '2024-01-14',
      time: '3:00 PM',
      duration: '30 minutes',
      attendees: ['Alice Cooper', 'Bob Wilson'],
      status: 'completed'
    }
  ]);

  const upcomingMeetings = meetings.filter(meeting => meeting.status === 'upcoming');
  const completedMeetings = meetings.filter(meeting => meeting.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Meetings</h2>
          <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="w-4 h-4" />
            <span>Schedule Meeting</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-6">
        <button className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <FiVideo className="w-6 h-6 text-indigo-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Start Instant Meeting</h3>
              <p className="text-sm text-gray-500">Quick video conference</p>
            </div>
          </div>
        </button>
        <button className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FiCalendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Schedule Meeting</h3>
              <p className="text-sm text-gray-500">Plan future meetings</p>
            </div>
          </div>
        </button>
        <button className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Join Meeting</h3>
              <p className="text-sm text-gray-500">Enter meeting code</p>
            </div>
          </div>
        </button>
      </div>

      {/* Upcoming Meetings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Upcoming Meetings</h3>
        </div>
        <div className="divide-y">
          {upcomingMeetings.map(meeting => (
            <div key={meeting.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiClock className="w-4 h-4" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    {meeting.attendees.map((attendee, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600"
                      >
                        {attendee.split(' ').map(n => n[0]).join('')}
                      </div>
                    ))}
                  </div>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-gray-900">Past Meetings</h3>
        </div>
        <div className="divide-y">
          {completedMeetings.map(meeting => (
            <div key={meeting.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-medium text-gray-900">{meeting.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <FiCalendar className="w-4 h-4" />
                      <span>{meeting.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FiClock className="w-4 h-4" />
                      <span>{meeting.time} ({meeting.duration})</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  View Recording
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetingsDashboard;
