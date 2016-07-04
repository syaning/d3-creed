var chart = creed({
  target: '#example'
});

d3.json('data.json', function(data) {
  chart.render(data);
});
