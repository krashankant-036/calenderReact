
// InputField.js
import React, { useEffect, useState } from 'react';
import './InputField.css';

const InputField = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const years = Array.from({ length: 25 }, (_, i) => 2000 + i);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const daysNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleMonthClick = () => {
    setShowMonths(!showMonths);
    setShowYears(false);
  };

  const handleYearClick = () => {
    setShowYears(!showYears);
    setShowMonths(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonths(false);
  };

  const handleYearSelect = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYears(false);
  };

  const prevPage = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextPage = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="container">

      <div className="header">

        <button onClick={prevPage}>&lt;</button>

        <span onClick={handleMonthClick} className="clickable">
          {months[currentDate.getMonth()]}
        </span>
        
        <span onClick={handleYearClick} className="clickable">
          {currentDate.getFullYear()}
        </span>

        <button onClick={nextPage}>&gt;</button>

      </div>

      {showMonths && (
        <div className="dropdown">
          {months.map((month, index) => (
            <div
              key={month}
              className="dropdown-item"
              onClick={() => handleMonthSelect(index)}
            >
              {month}
            </div>
          ))}
        </div>
      )}

      {showYears && (
        <div className="dropdown">
          {years.map((year) => (
            <div
              key={year}
              className="dropdown-item"
              onClick={() => handleYearSelect(year)}
            >
              {year}
            </div>
          ))}
        </div>
      )}

      <div className="days-names">
        {daysNames.map((value, i) => (
          <div key={value}>{value}</div>
        ))}
      </div>

      <div className="days">
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={index} className="empty-day"></div>
        ))}

        {daysInMonth.map((day) => (
          <div
            key={day}
            className={`day ${
              day.getDate() === new Date().getDate() &&
              day.getMonth() === new Date().getMonth()
                ? 'today'
                : ''
            } ${
              selectedDate && day.toDateString() === selectedDate.toDateString()
                ? 'selected'
                : ''
            }`}
            onClick={() => setSelectedDate(day)}
          >
            {day.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputField;

