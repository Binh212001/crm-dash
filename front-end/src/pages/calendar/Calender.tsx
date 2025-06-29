import React, { useState } from 'react';

const Calender = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const events = [
    { date: 15, title: 'Team Meeting', type: 'meeting' },
    { date: 22, title: 'Project Deadline', type: 'deadline' },
    { date: 28, title: 'Client Call', type: 'call' },
  ];

  const getEventsForDate = (day: number) => {
    return events.filter(event => event.date === day);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'call': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    const totalDays = daysInMonth + firstDayOfMonth;

    for (let i = 0; i < totalDays; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const dayEvents = getEventsForDate(dayNumber);
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
      const isToday = dayNumber === new Date().getDate() && 
                     currentDate.getMonth() === new Date().getMonth() && 
                     currentDate.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={i}
          className={`p-2 border border-gray-200 min-h-[80px] ${
            isCurrentMonth ? 'bg-white' : 'bg-gray-50'
          } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
          onClick={() => isCurrentMonth && setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber))}
        >
          {isCurrentMonth && (
            <>
              <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                {dayNumber}
              </div>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event, index) => (
                  <div
                    key={index}
                    className={`text-xs p-1 rounded ${getEventTypeColor(event.type)} text-white truncate`}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center font-medium text-gray-700">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>

        {selectedDate && (
          <div className="p-4 border-t">
            <h3 className="font-semibold mb-2">
              Events for {selectedDate.toLocaleDateString()}
            </h3>
            <div className="space-y-2">
              {getEventsForDate(selectedDate.getDate()).map((event, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                  <span>{event.title}</span>
                </div>
              ))}
              {getEventsForDate(selectedDate.getDate()).length === 0 && (
                <p className="text-gray-500">No events scheduled</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calender; 