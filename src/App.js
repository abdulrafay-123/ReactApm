import React, { useState, useEffect } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import Applications from './Applications.jsx';
import Infrastructure from './Infrastructure.jsx';
import AlertsAndAlarms from './AlertsAndAlarms.jsx';
import ServiceMap from './ServiceMap.jsx'
import Configuration from './Configuration.jsx';
import Dashboard from './Dashboard';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  BrowserRouter
} from 'react-router-dom';
import './App.css'; // Ensure this CSS file contains all the necessary styling
import * as d3 from 'd3';
import Modal from './Modal';
import AIInsights from './AIInsights.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
                <Route path="applications" element={<Applications />} />
                <Route path="infrastructure" element={<Infrastructure />} />
                <Route path="ServiceMap" element={<ServiceMap />} />
                <Route path="AlertsAndAlarms" element={<AlertsAndAlarms />} />
                <Route path="AIInsights" element={<AIInsights />} />
                <Route path="Configuration" element={<Configuration />} />
        
      </Routes>
    </Router>
  );
};


export default App;