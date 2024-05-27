import React, { useState, useEffect, useRef } from 'react'; 
import { select, pie, arc, scaleOrdinal, schemeCategory10 } from 'd3';
import { FaDatabase,FaMap, FaNetworkWired, FaBell, FaBrain, FaChartLine, FaCog, FaCloud } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Infrastructure.css';
import LineChart from './LineChart'; 
import Modal from './Modal';


const Infrastructure = () => {
    
    const [showOptions, setShowOptions] = useState(false);
    const [cpuUsageData, setCpuUsageData] = useState([]);
    const [memoryUsageData, setMemoryUsageData] = useState([]);
    const [diskUsageData, setDiskUsageData] = useState([]);
    const [networkTrafficData, setNetworkTrafficData] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCustomRange, setShowCustomRange] = useState(false);
    
    const ref = useRef(null);



    const cpuData = {
        "Total Cores": 100,
        "Available Cores": 10,
        "cpu_usage": {
            "2024-03-25T03:32:05.025Z": 0.0001184063,"2024-03-25T03:32:35.024Z":0.0001184624,"2024-03-25T03:33:05.023Z":0.0001777672,"2024-03-25T03:33:35.023Z":0.0001776725,"2024-03-25T03:34:05.022Z":0.0001184624,"2024-03-25T03:34:35.021Z":0.0001185185,"2024-03-25T03:35:05.021Z":0.0001775778,"2024-03-25T03:35:35.020Z":0.0001777041,"2024-03-25T03:36:05.019Z":0.0001776304,"2024-03-25T03:36:35.019Z":0.0001776199,"2024-03-25T03:37:05.018Z":0.0001777146,"2024-03-25T03:37:35.017Z":0.0001776304,"2024-03-25T03:38:05.017Z":0.0001183572,"2024-03-25T03:38:35.016Z":0.0001183992,"2024-03-25T03:39:05.015Z":0.0001183992,"2024-03-25T03:39:35.014Z":0.0001183642,"2024-03-25T03:40:05.014Z":0.0002372901,"2024-03-25T03:40:35.013Z":0.0001183922,"2024-03-25T03:41:05.012Z":0.0001780204,"2024-03-25T03:41:35.021Z":0.0000592382,"2024-03-25T03:42:05.039Z":0.0001779043,"2024-03-25T03:42:35.055Z":0.0001775989,"2024-03-25T03:43:05.070Z":0.000177683,"2024-03-25T03:43:35.084Z":0.0001776514,"2024-03-25T03:44:05.096Z":0.0001776304,
            
            "2024-03-25T03:44:35.107Z": 0.0001184203
        }
    };

    const memoryData = {
        "Total Memory": 100,
        "Available Memory": 10,
        "memory_usage": {
            "2024-03-25T03:32:05.025Z": 0.0001184063,"2024-03-25T03:32:35.024Z":0.0001184624,"2024-03-25T03:33:05.023Z":0.0001777672,"2024-03-25T03:33:35.023Z":0.0001776725,"2024-03-25T03:34:05.022Z":0.0001184624,"2024-03-25T03:34:35.021Z":0.0001185185,"2024-03-25T03:35:05.021Z":0.0001775778,"2024-03-25T03:35:35.020Z":0.0001777041,"2024-03-25T03:36:05.019Z":0.0001776304,"2024-03-25T03:36:35.019Z":0.0001776199,"2024-03-25T03:37:05.018Z":0.0001777146,"2024-03-25T03:37:35.017Z":0.0001776304,"2024-03-25T03:38:05.017Z":0.0001183572,"2024-03-25T03:38:35.016Z":0.0001183992,"2024-03-25T03:39:05.015Z":0.0001183992,"2024-03-25T03:39:35.014Z":0.0001183642,"2024-03-25T03:40:05.014Z":0.0002372901,"2024-03-25T03:40:35.013Z":0.0001183922,"2024-03-25T03:41:05.012Z":0.0001780204,"2024-03-25T03:41:35.021Z":0.0000592382,"2024-03-25T03:42:05.039Z":0.0001779043,"2024-03-25T03:42:35.055Z":0.0001775989,"2024-03-25T03:43:05.070Z":0.000177683,"2024-03-25T03:43:35.084Z":0.0001776514,"2024-03-25T03:44:05.096Z":0.0001776304,
            
            "2024-03-25T03:44:35.107Z": 0.0001184203
        }
    };

    const diskData = {
        "Total Disk space": 100,
        "Available Disk space": 10,
        "disk_usage": {
            "2024-03-25T03:32:05.025Z": 0.0001184063,"2024-03-25T03:32:35.024Z":0.0001184624,"2024-03-25T03:33:05.023Z":0.0001777672,"2024-03-25T03:33:35.023Z":0.0001776725,"2024-03-25T03:34:05.022Z":0.0001184624,"2024-03-25T03:34:35.021Z":0.0001185185,"2024-03-25T03:35:05.021Z":0.0001775778,"2024-03-25T03:35:35.020Z":0.0001777041,"2024-03-25T03:36:05.019Z":0.0001776304,"2024-03-25T03:36:35.019Z":0.0001776199,"2024-03-25T03:37:05.018Z":0.0001777146,"2024-03-25T03:37:35.017Z":0.0001776304,"2024-03-25T03:38:05.017Z":0.0001183572,"2024-03-25T03:38:35.016Z":0.0001183992,"2024-03-25T03:39:05.015Z":0.0001183992,"2024-03-25T03:39:35.014Z":0.0001183642,"2024-03-25T03:40:05.014Z":0.0002372901,"2024-03-25T03:40:35.013Z":0.0001183922,"2024-03-25T03:41:05.012Z":0.0001780204,"2024-03-25T03:41:35.021Z":0.0000592382,"2024-03-25T03:42:05.039Z":0.0001779043,"2024-03-25T03:42:35.055Z":0.0001775989,"2024-03-25T03:43:05.070Z":0.000177683,"2024-03-25T03:43:35.084Z":0.0001776514,"2024-03-25T03:44:05.096Z":0.0001776304,
            "2024-03-25T03:44:35.107Z": 0.0001184203
        }
    };

    const networkData = {
        "Inbound packets": 100,
        "Outbound packets": 10,
        "network_traffic": {
            "2024-03-25T03:32:05.025Z": 0.0001184063,"2024-03-25T03:32:35.024Z":0.0001184624,"2024-03-25T03:33:05.023Z":0.0001777672,"2024-03-25T03:33:35.023Z":0.0001776725,"2024-03-25T03:34:05.022Z":0.0001184624,"2024-03-25T03:34:35.021Z":0.0001185185,"2024-03-25T03:35:05.021Z":0.0001775778,"2024-03-25T03:35:35.020Z":0.0001777041,"2024-03-25T03:36:05.019Z":0.0001776304,"2024-03-25T03:36:35.019Z":0.0001776199,"2024-03-25T03:37:05.018Z":0.0001777146,"2024-03-25T03:37:35.017Z":0.0001776304,"2024-03-25T03:38:05.017Z":0.0001183572,"2024-03-25T03:38:35.016Z":0.0001183992,"2024-03-25T03:39:05.015Z":0.0001183992,"2024-03-25T03:39:35.014Z":0.0001183642,"2024-03-25T03:40:05.014Z":0.0002372901,"2024-03-25T03:40:35.013Z":0.0001183922,"2024-03-25T03:41:05.012Z":0.0001780204,"2024-03-25T03:41:35.021Z":0.0000592382,"2024-03-25T03:42:05.039Z":0.0001779043,"2024-03-25T03:42:35.055Z":0.0001775989,"2024-03-25T03:43:05.070Z":0.000177683,"2024-03-25T03:43:35.084Z":0.0001776514,"2024-03-25T03:44:05.096Z":0.0001776304,
            "2024-03-25T03:44:35.107Z": 0.0001184203
        }
    };

    const parseChartData = (data) => {
        return Object.entries(data).map(([key, value]) => ({
            date: new Date(key), // Assuming key is a timestamp
            value
        }));
    };

    

    const serviceHostsData = {
        "ServiceHosts": 5,
        "List": [
            {"name": "customers-service", "hosts": 2},
            {"name": "discovery-service", "hosts": 1},
            {"name": "api-gateway-service", "hosts": 3},
            {"name": "visits-service", "hosts": 1},
            {"name": "vets-service", "hosts": 1}
        ]
    };

    useEffect(() => {
        const svg = select(ref.current);
    
        // Clear the existing SVG content
        svg.selectAll("*").remove();  // This removes all elements inside the SVG
    
        const dimensions = { width: 380, height: 400 };
        svg.attr('width', dimensions.width).attr('height', dimensions.height);
    
        const radius = Math.min(dimensions.width, dimensions.height) / 2;
        const pieGenerator = pie().value(d => d.hosts);
        const arcGenerator = arc().innerRadius(0).outerRadius(radius);
    
        const colorScale = scaleOrdinal()
            .domain(serviceHostsData.List.map(d => d.name))
            .range(["#ff6f61", "#6baed6", "#ff66b2", "#5bc8ac", "#ffd700"]);  // Lighter color shades
    
        const pieData = pieGenerator(serviceHostsData.List);
    
        const g = svg.append('g')
            .attr('transform', `translate(${dimensions.width / 2}, ${dimensions.height / 2})`);
    
        g.selectAll('path')
            .data(pieData)
            .enter()
            .append('path')
            .attr('d', arcGenerator)
            .attr('fill', d => colorScale(d.data.name))
            .attr('stroke', '#ffffff')  // Add a border
            .attr('stroke-width', '2px')  // Border thickness
            .style('opacity', 0.8)  // Initial opacity
            .on('mouseover', function(event, d) {
                select(this)
                    .transition()
                    .duration(200)
                    .style('opacity', 1)  // Increase opacity
                    .attr('d', arc().innerRadius(0).outerRadius(radius + 10));  // Increase size
                select('.hover-text')
                    .style('display', 'block')
                    .html(`${d.data.name}: ${d.data.hosts} hosts`);
            })
            .on('mousemove', (event) => {
                select('.hover-text')
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY + 10}px`);
            })
            .on('mouseout', function(event, d) {
                select(this)
                    .transition()
                    .duration(200)
                    .style('opacity', 0.8)  // Restore opacity
                    .attr('d', arcGenerator);  // Restore size
                select('.hover-text')
                    .style('display', 'none');
            });
    
        g.selectAll('text')
            .data(pieData)
            .enter()
            .append('text')
            .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
            .attr('text-anchor', 'middle')
            .style('fill', '#ffffff')  // White text
            .style('font-size', '14px')
            .style('font-weight', 'bold')  // Bold text
            .text(d => d.data.name);
    }, [serviceHostsData]); // Make sure to include dependencies here if any data is dynamic


    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
        setShowCustomRange(false);
    };
    
    const handleCustomRange = () => {
        setShowCustomRange(true);
    };
    
    const setPredefinedRange = (days) => {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - days);
        setStartDate(start);
        setEndDate(end);
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeGraph, setActiveGraph] = useState(null);
  
    const handleOpenGraph = (graph) => {
      setActiveGraph(graph);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setActiveGraph(null);
    };


    useEffect(() => {
        setCpuUsageData(parseChartData(cpuData.cpu_usage));
        setMemoryUsageData(parseChartData(memoryData.memory_usage));
        setDiskUsageData(parseChartData(diskData.disk_usage));
        setNetworkTrafficData(parseChartData(networkData.network_traffic));
    }, []);  // Empty dependency array to run once on mount
    

    return (
        <div className="infrastructure-container app-container">
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
                <main className="dashboard-main">
                    <h2>Application Infrastructure</h2>
                    <div id="pieChartContainer">
                        <svg ref={ref} className="pieChart"></svg>
                        <div>
                            {serviceHostsData.List.map(service => (
                                <div key={service.name} className="pieLabel">{`${service.name}: ${service.hosts} nodes`}</div>
                            ))}
                        </div>
                    </div>
                    <div className="hover-text"></div>

                    
                        
                    <div className="chart-container">
                        <div className="chart" onClick={() => handleOpenGraph('cpuChart')}>
                            <h3>CPU Usage</h3>
                            <div className="chart-info">
                                <span>Total Cores: {cpuData["Total Cores"]}</span>
                                <span>Available Cores: {cpuData["Available Cores"]}</span>
                            </div>
                            <LineChart data={cpuUsageData} chartId="cpuChart" width={400} isInfraChart={true} />
                        </div>
                        <div className="chart" onClick={() => handleOpenGraph('memoryChart')}>
                            <h3>Memory Usage</h3>
                            <div className="chart-info">
                                <span>Total Memory: {memoryData["Total Memory"]}</span>
                                <span>Available Memory: {memoryData["Available Memory"]}</span>
                            </div>
                            <LineChart 
                                data={memoryUsageData} 
                                chartId="memoryChart" 
                                width={400} 
                                isInfraChart={true} 
                                lineColor="red"  // Ensures the line is red
                                fillColorStart="red" // Start color for the gradient
                                fillColorEnd="white" // End color for the gradient (transparent)
                            />
                        </div>
                        <div className="chart" onClick={() => handleOpenGraph('diskChart')}>
                            <h3>Disk Usage</h3>
                            <div className="chart-info">
                                <span>Total Disk space: {diskData["Total Disk space"]}</span>
                                <span>Available Disk space: {diskData["Available Disk space"]}</span>
                            </div>
                            <LineChart data={diskUsageData} chartId="diskChart" width={400} isInfraChart={true} />
                        </div>
                        <div className="chart" onClick={() => handleOpenGraph('networkChart')}>
                            <h3>Network Traffic</h3>
                            <div className="chart-info">
                                <span>Inbound packets: {networkData["Inbound packets"]}</span>
                                <span>Outbound packets: {networkData["Outbound packets"]}</span>
                            </div>
                            <LineChart data={networkTrafficData} chartId="networkChart" width={400} isInfraChart={true} />
                        </div>
                    </div>
                </main>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
  {activeGraph === 'cpuChart' && (
    <LineChart data={cpuUsageData} chartId="cpuChartModal" width={700} isModalOpen={true} height={400} />
  )}
  
  {activeGraph === 'memoryChart' && (
    <LineChart
    data={memoryUsageData}
    chartId="memoryChartModal"
    
    isInfraChart={true}
    lineColor="red"  // Red line
    fillColorStart="red" // Start color for the gradient
    fillColorEnd="white"
    fillOpacityStart={0.5}  // Start opacity for gradient
    fillOpacityEnd={0}  // End opacity for gradient (transparent)
    width={700} isModalOpen={false} height={400}
  />
  )}
  {activeGraph === 'diskChart' && (
    <LineChart data={diskUsageData} chartId="diskChartModal" width={700} isModalOpen={true} height={400} />
  )}
  {activeGraph === 'networkChart' && (
    <LineChart data={networkTrafficData} chartId="networkChartModal" width={700} isLatencyChart={false} isModal={true}  height={400}/>
  )}
</Modal>

        </div>
    );
};

export default Infrastructure;
