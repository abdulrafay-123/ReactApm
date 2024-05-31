// // DirectedGraph.jsx
// import React, { useEffect, useRef } from 'react';
// import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js';

// const DirectedGraph = ({ nodes, edges }) => {
//   const networkRef = useRef(null);

//   useEffect(() => {
//     if (networkRef.current) {
//       const data = {
//         nodes: new DataSet([
//           ...nodes.map(node => ({
//             ...node,
//             image: `${process.env.PUBLIC_URL}${node.image}`, // Ensure the image path is correct
//             shape: 'image'
//           }))
//         ]),
//         edges: new DataSet(edges),
//       };

//       const options = {
//         nodes: {
//           shape: 'image',
//           size: 20,
//           font: {
//             size: 16,
//             color: '#ffffff'
//           },
//           borderWidth: 2,
//           shadow: true
//         },
//         edges: {
//           width: 2,
//           shadow: true,
//           color: {
//             color: '#848484',
//             highlight: '#adacad',  // Brighter red for highlighted edges
//             hover: '#adacad',  // Same as highlight for consistency
//             opacity: 0.8  // Slightly increased opacity for visibility
//           },
//           arrows: {
//             to: { enabled: true, scaleFactor: 1.2 },
//             middle: false,
//             from: false
//           }
//         },
//         physics: {
//             enabled: true,
//             stabilization: false,
//             solver: 'forceAtlas2Based',
//             forceAtlas2Based: {
//               gravitationalConstant: -50,
//               centralGravity: 0.01,
//               springConstant: 0.08,
//               springLength: 100,
//               damping: 0.4,
//               avoidOverlap: 0.2
//             },
//         },
//         interaction: {
//           dragNodes: true,
//           hover: true,
//           tooltipDelay: 200
//         },
//         layout: {
//           improvedLayout: true,
//           hierarchical: {
//             enabled: false,
//             levelSeparation: 150,
//             nodeSpacing: 100,
//             treeSpacing: 200,
//             direction: 'UD',
//             sortMethod: 'directed'
//           }
//         }
//       };

//       const network = new Network(networkRef.current, data, options);

//       // Event listener for node clicks
//       network.on("selectNode", function (params) {
//         if (params.nodes.length === 1) {
//           const nodeId = params.nodes[0];
//           const connectedEdges = network.getConnectedEdges(nodeId);
//           network.setSelection({ nodes: [nodeId], edges: connectedEdges }, { highlightEdges: true });
//         }
//       });

//       network.on("deselectNode", function () {
//         network.setSelection({ nodes: [], edges: [] });
//       });

//       return () => {
//         network.off("selectNode");
//         network.off("deselectNode");
//         network.destroy();
//       };
//     }
//   }, [nodes, edges]);

//   return <div ref={networkRef} style={{ height: "450px", width: "100%", overflow: 'hidden' }} />;
// };

// export default DirectedGraph;
