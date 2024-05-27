import React, { useEffect } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data, chartId, isLatencyChart, isModal = false, isOnApplicationsPage = false }) => {
    useEffect(() => {
        d3.select(`#${chartId} > *`).remove(); // Clear previous SVG before rendering new one

        const adjustedWidth = isOnApplicationsPage ? 1520 : (isModal ? 700 : 760);
        const margin = { top: 20, right: 30, bottom: 70, left: 60 };
        const width = adjustedWidth - margin.left - margin.right;
        const height = isModal ? 300 : 220 - margin.top - margin.bottom;

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

        

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y-%m-%d")))
            .selectAll("text")
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

    }, [data, chartId, isLatencyChart, isModal, isOnApplicationsPage]); // Include isOnApplicationsPage in the dependency array

    return <div id={chartId} style={{ width: '100%', height: '100%' }}></div>;
};

export default BarChart