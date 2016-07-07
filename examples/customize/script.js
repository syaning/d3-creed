var chart = creed({
  target: '#example',
  width: document.body.clientWidth,
  height: document.body.clientHeight,
  fill: function(data) {
    var color = d3.scale.category20()
    return d => color(d.type)
  }
});

chart.force
  .charge(-120)
  .linkDistance(20)

d3.json('data.json', function(data) {
  chart.render(data);
});
