var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var randomX = d3.randomNormal(width / 2, 80),
    randomY = d3.randomNormal(height / 2, 80),
    points = d3.range(2000).map(function() { return [randomX(), randomY()]; });

var color = d3.scaleSequential(d3.interpolateLab("white", "steelblue"))
    .domain([0, 20]);

var hexbin = d3.hexbin()
    .radius(20)
    .extent([[0, 0], [width, height]]);

var x = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, height])
    .range([height, 0]);

var hexes = g.append("g")
    .attr("class", "hexagon")
  .selectAll("path")
  .data(hexbin(points))
  .enter().append("path")
    .attr("d", hexbin.hexagon())
    .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
    .attr("fill", function(d) { return color(d.length); })
    .style("opacity", 0.5);

window.setInterval(function(){
    var rand = Math.random()*100;
    hexes.transition()
        .duration(1000)
        .delay(function(d,i){ return 9*i; })
        .attr("d", hexbin.hexagon(rand));
}, 1000);
