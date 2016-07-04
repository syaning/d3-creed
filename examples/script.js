var chart = creed({
  target: '#example',
  strokeWidth: d => Math.sqrt(d.value),
  fill: function(data) {
    var color = d3.scale.category20()
    return d => color(d.group)
  }
});

chart.force
  .charge(-120)
  .linkDistance(30)

d3.json('data.json', function(data) {
  chart.render(data);
});
