import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, chartId, isLatencyChart, isModal = false, isOnApplicationsPage = false }) => {
    useEffect(() => {
        d3.select(`#${chartId} > *`).remove(); // Clear previous SVG before rendering new one

        const adjustedWidth = isOnApplicationsPage ? 1720 : (isModal ? 700 : 860);
        const margin = { top: 20, right: 30, bottom: 70, left: 60 };
        const width = adjustedWidth - margin.left - margin.right;
        const height = isModal ? 300 : 260 - margin.top - margin.bottom;

        const svg = d3.select(`#${chartId}`)
            .append("svg")
            .attr("width", adjustedWidth)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // X axis
        const x = d3.scaleBand()
            .range([0, width])
            .domain(data.map(d => d.date))
            .padding(0.2);

        const xAxis = d3.axisBottom(x)
            .tickFormat((d, i, nodes) => {
                if (i === 0 || new Date(nodes[i - 1].__data__).getDate() !== new Date(d).getDate()) {
                    return d3.timeFormat("%b %d")(d); // Display date when it changes
                }
                return d3.timeFormat("%H:%M")(d); // Otherwise, display time
            });

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(xAxis)
            .selectAll(".tick text")
            .style("font-size", (d, i, nodes) => {
                if (i === 0 || new Date(nodes[i - 1].__data__).getDate() !== new Date(d).getDate()) {
                    return "14px"; // Larger font for new date
                }
                return "10px"; // Smaller font for time
            })
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

        // Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.value)])
            .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Bars
        svg.selectAll("bars")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", d => x(d.date))
            .attr("y", d => y(d.value))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", "#69b3a2");

        // Grid lines
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(data.length).tickSize(-height).tickFormat(""))
            .selectAll(".tick line")
            .classed("new-day", (d, i, nodes) => i === 0 || new Date(nodes[i - 1].__data__).getDate() !== new Date(d).getDate());

    }, [data, chartId, isLatencyChart, isModal, isOnApplicationsPage]);

    return <div id={chartId} style={{ width: '100%', height: '100%' }}></div>;
};

export default BarChart;
