import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({
  data,
  chartId,
  width = 760, // Default width set to 760 for consistency across usage
  height = 220,
  isInfraChart = false,
  isModalOpen = false,
  lineColor = "steelblue",
  fillColorStart = "steelblue",
  fillColorEnd = "white",
  isOnApplicationsPage = false // new prop to check if it's on the Applications page
}) => {
  useEffect(() => {
    d3.select(`#${chartId} > *`).remove(); // Clear previous SVG elements

    const adjustedWidth = isOnApplicationsPage ? 1520 : width; // Double the width if it's on the Applications page
    const finalHeight = isModalOpen ? 400 : height;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const effectiveWidth = adjustedWidth - margin.left - margin.right;
    const effectiveHeight = finalHeight - margin.top - margin.bottom;

    const svg = d3.select(`#${chartId}`)
      .append("svg")
      .attr("width", adjustedWidth)
      .attr("height", finalHeight)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, effectiveWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([effectiveHeight, 0]);

    // Grid lines
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${effectiveHeight})`)
      .call(d3.axisBottom(x).ticks(10).tickSize(-effectiveHeight).tickFormat(""));

    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).ticks(10).tickSize(-effectiveWidth).tickFormat(""));

    // Gradient definition for area fill
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", `${chartId}-gradient`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(0))
      .attr("x2", 0).attr("y2", y(d3.max(data, d => d.value)));

    gradient.append("stop").attr("offset", "0%").attr("stop-color", fillColorStart).attr("stop-opacity", 0.5);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", fillColorEnd).attr("stop-opacity", 0);

    // Axes
    svg.append("g").attr("transform", `translate(0,${effectiveHeight})`).call(d3.axisBottom(x));
    svg.append("g").call(d3.axisLeft(y));

    // Area definition
    const area = d3.area()
      .curve(d3.curveBasis)
      .x(d => x(d.date))
      .y0(effectiveHeight)
      .y1(d => y(d.value));

    svg.append("path")
      .datum(data)
      .attr("fill", `url(#${chartId}-gradient)`)
      .attr("d", area);

    // Line definition
    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => x(d.date))
      .y(d => y(d.value));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 1.5)
      .attr("d", line);
  }, [data, chartId, width, height, isInfraChart, isModalOpen, lineColor, fillColorStart, fillColorEnd, isOnApplicationsPage]);

  return <div id={chartId} style={{ width: '100%', overflowX: 'auto', height: '100%' }}></div>;
};

export default LineChart;
