import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './AlertsAndAlarms.css';
import { Link } from 'react-router-dom';
import { FaDatabase,FaMap, FaNetworkWired, FaBell, FaBrain, FaChartLine, FaCog, FaCloud } from 'react-icons/fa';

const AlertsAndAlarms = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCustomRange, setShowCustomRange] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [predefinedRange, setPredefinedRange] = useState(null);

    const toggleDatePicker = () => setShowDatePicker(!showDatePicker);
    const handleCustomRange = () => setShowCustomRange(true);

    return (
        <div className="AlertsAndAlarms-container app-container">
            <header className="dashboard-header">
                <h1 onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
                    <img 
                        src={`${process.env.PUBLIC_URL}/logo.png`} 
                        alt="logo" 
                        style={{ height: '30px' }}  // Adjust the height as needed
                    />
                </h1>
                <div className='time-picker'>
                    <button className='time-picker-button' onClick={toggleDatePicker}>Date Picker</button>
                    {showDatePicker && (
                        <div className="date-picker-modal">
                            {showCustomRange ? (
                                <div className="custom-date-range">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={date => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={date => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        showTimeSelect
                                        dateFormat="Pp"
                                    />
                                    <button onClick={toggleDatePicker}>Close</button>
                                </div>
                            ) : (
                                <div className="predefined-ranges">
                                    <ul>
                                        <li onClick={() => { setPredefinedRange(1); setShowDatePicker(false); }}>Previous 1 Day</li>
                                        <li onClick={() => { setPredefinedRange(7); setShowDatePicker(false); }}>Previous 1 Week</li>
                                        <li onClick={() => { setPredefinedRange(14); setShowDatePicker(false); }}>Previous 2 Weeks</li>
                                        <li onClick={handleCustomRange}>Custom Time Range</li>
                                    </ul>
                                    <button onClick={toggleDatePicker}>Close</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <div className="dashboard">
                <aside className="dashboard-aside">
                    <Link to="/applications" className="icon-item">
                        <FaDatabase />
                        <span>Applications</span>
                    </Link>
                    <Link to="/ServiceMap" className="icon-item">
              <FaMap />
              <span>Service Map</span>
              </Link>
                    <Link to="/infrastructure" className="icon-item">
                        <FaNetworkWired />
                        <span>Infrastructure</span>
                    </Link>
                    <Link to="/AlertsAndAlarms" className="icon-item">
                        <FaBell />
                        <span>Alerts & Alarms</span>
                    </Link>
                    <Link to="/AIInsights" className="icon-item">
                        <FaBrain />
                        <span>AI Insights</span>
                    </Link>
                    <Link to="/reports" className="icon-item">
                        <FaChartLine />
                        <span>Reports</span>
                    </Link>
                    <Link to="/genai" className="icon-item">
                        <FaCog />
                        <span>Gen AI</span>
                    </Link>
                    <Link to="/Configuration" className="icon-item">
                        <FaCloud />
                        <span>Configuration</span>
                    </Link>
                </aside>
                </div>
            <main className="dashboard-main">
                
            </main>
        </div>
    );
};

export default AlertsAndAlarms;
