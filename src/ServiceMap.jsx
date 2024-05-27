import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaDatabase, FaMap, FaNetworkWired, FaBell, FaBrain, FaChartLine, FaCog, FaCloud } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import './ServiceMap.css';
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js';
import './consoleOverride';
// Rest of your code...


const debounce = (fn, ms) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        fn.apply(this, args);
      }, ms);
    };
  };

const DirectedGraph = ({ nodes, edges, onNodeSelect }) => {
    const networkRef = useRef(null);
    const networkInstance = useRef(null);
    const resizeObserver = useRef(null)

    useEffect(() => {
        const container = networkRef.current;
        if (container) {
            // Create a new instance or clear existing data
            const nodesDataSet = new DataSet();
            const edgesDataSet = new DataSet();
          
            nodes.forEach(node => {
                nodesDataSet.update({
                    ...node,
                    image: `${process.env.PUBLIC_URL}${node.image}`,
                    shape: 'image'
                });
            });

            edgesDataSet.add(edges);
    
            const data = {
                nodes: nodesDataSet,
                edges: edgesDataSet,
            };

  
        const options = {
          nodes: {
            shape: 'image',
            size: 20,
            font: {
              size: 16,
              color: '#ffffff'
            },
            borderWidth: 2,
            shadow: true
          },
          edges: {
            width: 2,
            shadow: true,
            color: {
              color: '#848484',
              highlight: '#adacad',  // Brighter red for highlighted edges
              hover: '#adacad',  // Same as highlight for consistency
              opacity: 0.8  // Slightly increased opacity for visibility
            },
            arrows: {
              to: { enabled: true, scaleFactor: 1.2 },
              middle: false,
              from: false
            }
          },
          physics: {
              enabled: true,
              stabilization: false,
              solver: 'forceAtlas2Based',
              forceAtlas2Based: {
                gravitationalConstant: -50,
                centralGravity: 0.01,
                springConstant: 0.08,
                springLength: 100,
                damping: 0.4,
                avoidOverlap: 0.2
              },
          },
          interaction: {
            dragNodes: true,
            hover: true,
            tooltipDelay: 200
          },
          layout: {
            improvedLayout: true,
            hierarchical: {
              enabled: false,
              levelSeparation: 150,
              nodeSpacing: 100,
              treeSpacing: 200,
              direction: 'UD',
              sortMethod: 'directed'
            }
          }
        };
  
        const network = new Network(container, data, options);

            networkInstance.current = network;

            network.on("selectNode", function (params) {
                const nodeId = params.nodes[0];
                const nodeDetails = nodes.find(node => node.id === nodeId);
                const connectedEdges = edges.filter(edge => edge.from === nodeId || edge.to === nodeId);
                onNodeSelect(nodeDetails, connectedEdges);

                const overlayIframe = document.getElementById('webpack-dev-server-client-overlay');
                if (overlayIframe) {
                    overlayIframe.style.display = 'none';
                }
            });
            
            // Debounced resize function
            const handleResize = debounce(() => {
                if (networkInstance.current) {
                    networkInstance.current.fit(); // Adjust the network view to fit the new container size
                }
            }, 100);

            const resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(container);

            // Cleanup function
            return () => {
                resizeObserver.disconnect();
                network.off("selectNode");
                network.setData({ nodes: new DataSet(), edges: new DataSet() });
                network.destroy();
                networkInstance.current = null; // Reset the networkInstance ref
            };
        }
    }, [nodes, edges, onNodeSelect, networkRef]);

    useEffect(() => {
        // This effect will run whenever the networkInstance ref changes
        return () => {
            // Clean up the previous Network instance if it exists
            if (networkInstance.current) {
                networkInstance.current.off("selectNode");
                networkInstance.current.setData({ nodes: new DataSet(), edges: new DataSet() });
                networkInstance.current.destroy();
            }
        };
    }, [networkInstance]);

    return <div ref={networkRef} style={{ height: "450px", width: "100%" }} />;
};
// ServiceDependenciesMap Component
const ServiceDependenciesMap = ({ node, connectedNodes, edges }) => {
    const networkRef = useRef(null);
    const nodesDataSet = useRef(new DataSet());
    const edgesDataSet = useRef(new DataSet());
    useEffect(() => {
        const container = networkRef.current;
        if (container && node) {
            // Clear existing data
            nodesDataSet.current.clear();
            edgesDataSet.current.clear();

            // Add the selected node
            nodesDataSet.current.add(node);

            // Add connected nodes, but skip duplicates
            connectedNodes.forEach(n => {
                if (!nodesDataSet.current.get(n.id)) {
                    nodesDataSet.current.add(n);
                }
            });

            // Add edges, but skip duplicates
            edges.forEach(edge => {
                if (!edgesDataSet.current.get(edge.id)) {
                    edgesDataSet.current.add(edge);
                }
            });

            const data = {
                nodes: nodesDataSet.current,
                edges: edgesDataSet.current,
            };

            const options = {
                nodes: {
                  shape: 'image',
                  size: 20,
                  font: {
                    size: 16,
                    color: '#ffffff'
                  },
                  borderWidth: 2,
                  shadow: true
                },
                edges: {
                  width: 2,
                  shadow: true,
                  color: {
                    color: '#848484',
                    highlight: '#adacad',  // Brighter red for highlighted edges
                    hover: '#adacad',  // Same as highlight for consistency
                    opacity: 0.8  // Slightly increased opacity for visibility
                  },
                  arrows: {
                    to: { enabled: true, scaleFactor: 1.2 },
                    middle: false,
                    from: false
                  }
                },
                physics: {
                    enabled: true,
                    stabilization: false,
                    solver: 'forceAtlas2Based',
                    forceAtlas2Based: {
                      gravitationalConstant: -50,
                      centralGravity: 0.01,
                      springConstant: 0.08,
                      springLength: 100,
                      damping: 0.4,
                      avoidOverlap: 0.2
                    },
                },
                interaction: {
                  dragNodes: true,
                  hover: true,
                  tooltipDelay: 200
                },
                layout: {
                  improvedLayout: true,
                  hierarchical: {
                    enabled: false,
                    levelSeparation: 150,
                    nodeSpacing: 100,
                    treeSpacing: 200,
                    direction: 'UD',
                    sortMethod: 'directed'
                  }
                }
              };

            const network = new Network(container, data, options);

            return () => {
                network.setData({ nodes: new DataSet(), edges: new DataSet() });  // Clear data when the component is unmounted
                network.destroy();
            };
        }
    }, [node, connectedNodes, edges, networkRef]);
    return (
        <div ref={networkRef} style={{ height: "450px", width: "100%" }}>
            {!node && <p>No node selected</p>}
        </div>
    );
};


const ServiceMap = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showCustomRange, setShowCustomRange] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [selectedEdges, setSelectedEdges] = useState([]);
    const [selectedConnectedNodes, setSelectedConnectedNodes] = useState([]);

    const handleNodeSelect = (node, edges) => {
        setSelectedNode(node);
        setSelectedEdges(edges);

        const connectedNodeIds = new Set(edges.map(edge => [edge.from, edge.to]).flat());
        const connectedNodes = nodes.filter(n => connectedNodeIds.has(n.id));
        setSelectedConnectedNodes(connectedNodes);
    };

   


    

    const applicationsData = [
        { name: "Microservices Demo", type: "java" },
        { name: "Python Demo", type: "python" }
    ];
    const servicesData = [
        { name: "customers-service", type: "java" },
        { name: "discovery-service", type: "java" },
        { name: "api-gateway-service", type: "java" },
        { name: "visits-service", type: "java" },
        { name: "vets-service", type: "java" }
    ];

    const expensiveTransactionsData = [
        { traceId: "1", transactions: "10", spans: "5", latency: "200ms" },
        { traceId: "2", transactions: "8", spans: "4", latency: "180ms" },]

    const renderTable = (data, headers) => (
        <table className="data-table">
            <thead>
                <tr>
                    {headers.map((header, index) => <th key={index}>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {headers.map((header, headerIndex) => (
                            <td key={headerIndex}>{item[header.toLowerCase()] || index + 1}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
    

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

   const nodes = [
  { id: "api-gateway-service", label: "API Gateway Service", image: '/java.png', shape: 'image' },
  { id: "visits-service", label: "Visits Service", image: '/java.png', shape: 'image' },
  { id: "customers-service", label: "Customers Service", image: '/java.png', shape: 'image' },
  { id: "vets-service", label: "Vets Service", image: '/java.png', shape: 'image' },
  { id: "admin-service", label: "Admin Service", image: '/java.png', shape: 'image' },
  { id: "config-server", label: "Config Server", image: '/java.png', shape: 'image' },
  { id: "discovery-service", label: "Discovery Service", image: '/java.png', shape: 'image' },
  { id: "petclinic", label: "PetClinic", image: '/database.png', shape: 'image' },
  { id: "152b790f7295", label: "152b790f7295", image: '/java.png', shape: 'image' }
];


    const edges = [
        { from: "api-gateway-service", to: "visits-service" },
        { from: "api-gateway-service", to: "customers-service" },
        { from: "api-gateway-service", to: "vets-service" },
        { from: "visits-service", to: "petclinic" },
        { from: "customers-service", to: "petclinic" },
        { from: "vets-service", to: "petclinic" },
        { from: "discovery-service", to: "api-gateway-service" },
        { from: "discovery-service", to: "customers-service" },
        { from: "discovery-service", to: "vets-service" },
        { from: "discovery-service", to: "admin-service" },
        { from: "config-server", to: "discovery-service" },
        { from: "api-gateway-service", to: "152b790f7295" },
    ];

    return (
        <div className="ServiceMap-container app-container">
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
                    <Link to="/Applications" className="icon-item">
                        <FaDatabase />
                        <span>Applications</span>
                    </Link>
                    <Link to="/ServiceMap" className="icon-item">
                        <FaMap />
                        <span>Service Map</span>
                    </Link>
                    <Link to="/Infrastructure" className="icon-item">
                        <FaNetworkWired />
                        <span>Infrastructure</span>
                    </Link>
                    <Link to="/Alertsalarms" className="icon-item">
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
    <h2>Service Map</h2>
    <div className="content-grid">
        <div className="tables-container">
            <div className="content-box">
                <h3>Applications ({applicationsData.length})</h3>
                {renderTable(applicationsData, ['S.No', 'Name', 'Type'])}
            </div>
            <div className="content-box">
                <h3>Services ({servicesData.length})</h3>
                {renderTable(servicesData, ['S.No', 'Name', 'Type'])}
            </div>
            <div className="content-box">
                <h3>Expensive Transactions</h3>
                {renderTable(expensiveTransactionsData, ['Trace ID', 'Transactions', 'Spans', 'Latency'])}
            </div>
        </div>
        <div className="graphs-container">
                            <div className="graph-container">
                                <h3>Service Map</h3>
                                <DirectedGraph nodes={nodes} edges={edges} onNodeSelect={handleNodeSelect} />
                            </div>
                            <div className="graph-container">
                                <h3>Service Dependencies Map</h3>
                                <ServiceDependenciesMap node={selectedNode} connectedNodes={selectedConnectedNodes} edges={selectedEdges} />
                            </div>
                        </div>
        
    </div>
</main>
            </div>
        </div>
    );
};

export default ServiceMap;

