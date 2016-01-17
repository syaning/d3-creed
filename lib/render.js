module.exports = render;

function render(data) {
	this.data = data;

	var links = createLinks.call(this, data);
	var nodes = createNodes.call(this, data);

	this.force.nodes(data.nodes)
		.links(data.links)
		.on('tick', tickFn.call(this, links, nodes))
		.start();
}

function createLinks(nodes) {
	var linkType = this.opts.link.type === 'arc' ? 'path' : 'line';
	var links = this.glink.selectAll(linkType)
		.data(data.links)
		.enter()
		.append(linkType)
		.attr('fill', 'none')
		.attr('stroke', 'red')
		.attr('stroke-width', 1);
	return links;
}

function createNodes(data) {
	var nodes = this.gnode.selectAll('circle')
		.data(data.nodes)
		.enter()
		.append('circle')
		.attr('r', 5);
	return nodes;
}

function tickFn(links, nodes) {
	var context = this;

	function lineLink(links) {
		links.attr({
			x1: function(d) {
				return d.source.x;
			},
			y1: function(d) {
				return d.source.y;
			},
			x2: function(d) {
				return d.target.x;
			},
			y2: function(d) {
				return d.target.y;
			}
		});
	}

	function arcLink(links) {
		links.attr('d', function(d) {
			var dx = d.target.x - d.source.x;
			var dy = d.target.y - d.source.y;
			var dr = Math.sqrt(dx * dx + dy * dy);
			return 'M' + d.source.x + ',' + d.source.y + 'A' + dr + ',' + dr + ' 0 0,1 ' + d.target.x + ',' + d.target.y;
		});
	}

	return function tick() {
		context.opts.link.type === 'arc' ? arcLink(links) : lineLink(links);

		nodes.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		});
	};
}