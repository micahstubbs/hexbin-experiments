/* global d3 */

const svg = d3.select('svg');
const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +svg.attr('width') - margin.left - margin.right;
const height = +svg.attr('height') - margin.top - margin.bottom;
const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

const randomX = d3.randomNormal(width / 2, 80);
const randomY = d3.randomNormal(height / 2, 80);
const points = d3.range(2000).map(() => [randomX(), randomY()]);

const color = d3
  .scaleSequential(d3.interpolateLab('white', 'steelblue'))
  .domain([0, 20]);

const hexbin = d3.hexbin()
  .radius(20)
  .extent([[0, 0], [width, height]]);

const x = d3.scaleLinear()
  .domain([0, width])
  .range([0, width]);

const y = d3.scaleLinear()
  .domain([0, height])
  .range([height, 0]);

const hexes = g.append('g')
  .attr('class', 'hexagon')
  .selectAll('path')
    .data(hexbin(points))
    .enter()
    .append('path')
      .attr('d', hexbin.hexagon())
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .attr('fill', d => color(d.length))
      .style('opacity', 0.5);

window.setInterval(() => {
  const rand = Math.random() * 100;
  hexes
    .transition()
      .duration(1000)
      .delay((d, i) => 9 * i)
      .attr('d', hexbin.hexagon(rand));
}, 1000);
