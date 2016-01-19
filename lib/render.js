var createScales = require('./scales');

module.exports = render;

function render(data) {
	var force = this.force;

	if (data) {
		force.nodes(data.nodes)
			.links(data.links);
	} else {
		data = {
			nodes: force.nodes(),
			links: force.links()
		};
	}

	this.scales = createScales.call(this, data);

	var links = createLinks.call(this, data);
	var nodes = createNodes.call(this, data);

	force.on('tick', tickFn.call(this, links, nodes))
		.start();
}

function createLinks(data) {
	var isArc = this.opts.link.isArc;
	var scales = this.scales;

	var links = this.glink.selectAll('.link')
		.data(data.links);
	links.enter()
		.append(isArc ? 'path' : 'line')
		.classed('link', true)
		.attr('stroke', scales.stroke)
		.attr('stroke-width', scales.strokeWidth);
	links.exit().remove();
	if (isArc) {
		links.attr('fill', 'none');
	}
	return links;
}

function createNodes(data) {
	var scales = this.scales;

	var nodes = this.gnode.selectAll('.node')
		.data(data.nodes);
	nodes.enter()
		.append('circle')
		.classed('node', true)
		.attr('r', scales.radius)
		.attr('fill', scales.fill);
	nodes.exit().remove();

	if (this.opts.drag.enable) {
		nodes.call(this.force.drag);
	}

	return nodes;
}

function tickFn(links, nodes) {
	var context = this;

	function lineLink(links) {
		links.attr('x1', function(d) {
				return d.source.x;
			})
			.attr('y1', function(d) {
				return d.source.y;
			})
			.attr('x2', function(d) {
				return d.target.x;
			})
			.attr('y2', function(d) {
				return d.target.y;
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
		context.opts.link.isArc ? arcLink(links) : lineLink(links);

		nodes.attr('transform', function(d) {
			return 'translate(' + d.x + ',' + d.y + ')';
		});
	};
}