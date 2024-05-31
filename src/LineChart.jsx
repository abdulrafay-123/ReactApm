import React, { useEffect } from 'react';
import * as d3 from 'd3';

const LineChart = ({
  data,
  chartId,
  width = 960, // Default width set to 760 for consistency across usage
  height = 260,
  isInfraChart = false,
  isModalOpen = false,
  lineColor = "steelblue",
  fillColorStart = "steelblue",
  fillColorEnd = "white",
  isOnApplicationsPage = false // new prop to check if it's on the Applications page
}) => {
  useEffect(() => {
    d3.select(`#${chartId} > *`).remove(); // Clear previous SVG elements

    const adjustedWidth = isOnApplicationsPage ? 1720 : width; // Double the width if it's on the Applications page
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

    // Customize the x-axis to format date and time differently
    const xAxis = d3.axisBottom(x)
      .tickSize(-effectiveHeight)
      .tickFormat((d, i, nodes) => {
        if (i === 0 || new Date(nodes[i - 1].__data__).getDate() !== d.getDate()) {
          return d3.timeFormat("%b %d")(d); // Display date when it changes
        }
        return d3.timeFormat("%H:%M")(d); // Otherwise, display time
      });

    svg.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${effectiveHeight})`)
      .call(xAxis)
      .selectAll(".tick text")
      .style("font-size", (d, i, nodes) => {
        if (i === 0 || new Date(nodes[i - 1].__data__).getDate() !== d.getDate()) {
          return "14px"; // Larger font for new date
        }
        return "10px"; // Smaller font for time
      });

    // Adding grid lines as before
    svg.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${effectiveHeight})`)
      .call(d3.axisBottom(x).ticks(10).tickSize(-effectiveHeight).tickFormat(""));

    svg.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(y).ticks(10).tickSize(-effectiveWidth).tickFormat(d3.format(".2s")));

    // Gradient definition for area fill
    const defs = svg.append("defs");
    const gradient = defs.append("linearGradient")
      .attr("id", `${chartId}-gradient`)
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", y(0))
      .attr("x2", 0).attr("y2", y(d3.max(data, d => d.value)));

    gradient.append("stop").attr("offset", "0%").attr("stop-color", fillColorStart).attr("stop-opacity", 0.5);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", fillColorEnd).attr("stop-opacity", 0);

    // Area and line definitions
    const area = d3.area()
      .curve(d3.curveBasis)
      .x(d => x(d.date))
      .y0(effectiveHeight)
      .y1(d => y(d.value));
    svg.append("path")
      .datum(data)
      .attr("fill", `url(#${chartId}-gradient)`)
      .attr("d", area);

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