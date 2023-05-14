import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const MyLoveGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const data: { x: Date; y: number }[] = [{ x: new Date(), y: 0 }];
    svg.selectAll('*').remove();

    const x = d3.scaleTime().range([0 + 67, width - 67]);
    const y = d3.scaleLinear().range([height, 0]);

    const line = d3
      .line<{ x: Date; y: number }>()
      .x((d) => x(d.x))
      .y((d) => y(d.y))
      .curve(d3.curveCardinal);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).tickFormat((d) => `sonsuz + ${d}`);

    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .attr('class', 'x-axis')
      .call(xAxis);

    svg
      .append('g')
      .attr('transform', `translate(${67},0)`)
      .attr('class', 'y-axis')
      .call(yAxis);

    svg.append('g').attr('class', 'y-axis').call(yAxis);

    svg.append('path').datum(data).attr('class', 'line').attr('d', line);

    const updateData = () => {
      const newData = {
        x: new Date(),
        y: data[data.length - 1].y + Math.random() * 10,
      };
      data.push(newData);
      x.domain(d3.extent(data, (d) => d.x) as [Date, Date]);
      y.domain([0, d3.max(data, (d) => d.y) as number]);
      svg
        .select('.line')
        .datum(data)
        .attr('d', line as any)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue');
      svg.select('.x-axis').call(xAxis as any);
      svg.select('.y-axis').call(yAxis as any);
    };

    const interval = setInterval(() => {
      updateData();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <svg
        ref={svgRef}
        width={width + margin.left + margin.right}
        height={height + margin.top + margin.bottom}
      >
        <g transform={`translate(${margin.left},${margin.top})`}>
          <text
            transform={`rotate(-90)`}
            y={0 - margin.left}
            x={0 - height / 2}
            dy='1em'
            style={{ textAnchor: 'middle' }}
          >
            My Love for You
          </text>
        </g>
      </svg>
    </div>
  );
};

export default MyLoveGraph;
