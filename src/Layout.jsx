// Layout.jsx
import React from 'react';
import { FaDatabase, FaNetworkWired, FaBell, FaBrain, FaChartLine, FaCog, FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="app-container">
            <header className="dashboard-header">
                <h1>CEBERU APM</h1>
            </header>
            <div className="dashboard">
                <aside className="dashboard-aside">
                    <Link to="/" className="icon-item">
                        <FaDatabase />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/applications" className="icon-item">
                        <FaNetworkWired />
                        <span>Applications</span>
                    </Link>
                    <Link to="/infrastructure" className="icon-item">
                        <FaCloud />
                        <span>Infrastructure</span>
                    </Link>
                    {/* Add other links as necessary */}
                </aside>
                <main className="dashboard-main">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
