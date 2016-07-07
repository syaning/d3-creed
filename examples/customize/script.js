// create chart
var chart = creed({
  target: '#example',
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  radius: function(data) {
    var scale = d3.scale.linear()
      .domain(d3.extent(data.nodes, function(d) {
        return d.value;
      }))
      .range([10, 20]);

    return function(d) {
      return scale(d.value);
    };
  },
  fill: function(data) {
    var color = d3.scale.category20();
    return function(d) {
      return color(d.type);
    };
  }
});

// customize force
var force = chart.force;
force.charge(-100).linkDistance(50);
force.drag().on('dragstart', function(d) {
  d3.event.sourceEvent.stopPropagation();
  d.fixed = true;
});

// customize link rendering
chart._renderLinks = function() {
  var links = this.glink
    .selectAll('.link')
    .data(this.data.links);

  links.enter()
    .append('path')
    .classed('link', true)
    .attr('stroke', '#16bcce')
    .attr('stroke-width', 1)
    .attr('fill', 'none');
  links.exit().remove()

  return links
};
chart._tickLinks = function() {
  this.links.attr('d', function(d) {
    var dx = d.target.x - d.source.x;
    var dy = d.target.y - d.source.y;
    var dr = Math.sqrt(dx * dx + dy * dy);
    return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
  });
}

// zoom
var zoom = d3.behavior.zoom()
  .scaleExtent([0.1, 2])
  .on('zoom', function() {
    var transform = ['translate(', d3.event.translate, ') scale(', d3.event.scale, ')'].join('');
    this.glink.attr('transform', transform);
    this.gnode.attr('transform', transform);
  }.bind(chart));
chart.svg.call(zoom).on('dblclick.zoom', null);

// load data and render
d3.json('data.json', function(data) {
  chart.render(data);

  // node draggable
  chart.nodes.call(chart.force.drag);
});
