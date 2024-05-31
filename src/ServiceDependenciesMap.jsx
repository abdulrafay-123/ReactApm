import React from 'react';
import { Tree } from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import useResizeObserverErrorHandler from './hooks/useResizeObserverErrorHandler'; // Adjust the path as necessary

const data = {
  "id": 1,
  "name": "api-gateway-service",
  "children": [
    {
      "id": 2,
      "name": "discovery-service",
      "deviceName": "",
      "isOnline": true,
      "children": []
    },
    {
      "id": 3,
      "name": "",
      "children": [
        {
          "id": 4,
          "name": "visits-service",
          "deviceName": "",
          "isOnline": true,
          "children": []
        },
        {
          "id": 5,
          "name": "customers-service",
          "deviceName": "",
          "isOnline": true,
          "children": []
        },
        {
          "id": 6,
          "name": "vets-service",
          "deviceName": "",
          "isOnline": true,
          "children": []
        }
      ]
    }
  ]
};

const ServiceDependenciesMap = () => {
  useResizeObserverErrorHandler(); // Use the custom hook here

  const containerStyle = {
    width: '100%',
    height: '500px',
    position: 'relative',
    overflow: 'hidden',
  };

  const svgStyle = {
    width: '100%',
    height: '100%',
  };

  return (
    <div style={containerStyle}>
      <Tree
        data={data}
        height={500}
        width={800}
        animated={true}
        svgProps={{
          className: 'custom-svg',
          style: svgStyle,
        }}
        textProps={{
          dx: '-10',
          dy: '20',
        }}
      />
    </div>
  );
};

export default ServiceDependenciesMap;

// Patch ResizeObserver error globally
if (typeof window !== 'undefined') {
  const resizeObserverErrHandler = (e) => {
    if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
      e.stopImmediatePropagation();
    }
  };
  window.addEventListener('error', resizeObserverErrHandler);
}
