import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlus, FiClock } from 'react-icons/fi';

const CalendarDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Client Presentation',
      date: '2024-01-15',
      time: '2:00 PM',
      type: 'presentation'
    },
    {
      id: 3,
      title: 'Business Trip to NY',
      date: '2024-01-18',
      time: 'All Day',
      type: 'travel'
    }
  ]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border border-gray-200" />);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events.filter(event => event.date === dateString);

      days.push(
        <div key={day} className="h-24 border border-gray-200 p-2">
          <div className="flex justify-between items-start">
            <span className={`text-sm ${
              new Date().toISOString().split('T')[0] === dateString
                ? 'bg-indigo-600 text-white rounded-full w-6 h-6 flex items-center justify-center'
                : ''
            }`}>
              {day}
            </span>
          </div>
          <div className="mt-1 space-y-1">
            {dayEvents.map(event => (
              <div
                key={event.id}
                className="text-xs p-1 rounded truncate"
                style={{
                  backgroundColor: event.type === 'meeting' ? '#E5EDFF' :
                                 event.type === 'presentation' ? '#FCE7F3' :
                                 '#FEF3C7'
                }}
              >
                <div className="flex items-center space-x-1">
                  <FiClock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                <div className="font-medium truncate">{event.title}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Calendar</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-lg font-medium">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <FiPlus className="w-4 h-4" />
              <span>Add Event</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-500 text-sm py-2">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default CalendarDashboard;
