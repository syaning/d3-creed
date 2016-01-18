var d3 = require('d3');
var util = require('./util');
var options = require('./options');
var render = require('./render');
var clear = require('./clear');

module.exports = Creed;

Creed.version = '0.0.1';

function Creed(opts) {
	if (!(this instanceof Creed)) {
		return new Creed(opts);
	}

	this.opts = opts = util.merge(opts, options);

	var container = this.container = d3.select(opts.container);
	var width = opts.width || parseInt(container.style('width'), 10);
	var height = opts.height || parseInt(container.style('height'), 10) || width * 0.75 >> 0;
	var svg = this.svg = container.append('svg')
		.attr('width', width)
		.attr('height', height)
		.classed('creed', true);
	this.glink = svg.append('g').classed('creed-links', true);
	this.gnode = svg.append('g').classed('creed-nodes', true);
	this.force = d3.layout.force()
		.size([width, height])
		.charge(opts.force.charge)
		.linkDistance(opts.force.linkDistance);

	// drag event
	if (opts.drag.enable) {
		this.force.drag()
			.on('dragstart', function(d) {
				d3.event.sourceEvent.stopPropagation();
				if (opts.drag.fix) {
					d.fixed = true;
				}
			});
	}

	// zoom event
	if (opts.zoom.enable) {
		var zoom = d3.behavior.zoom()
			.scaleExtent(opts.zoom.scaleExtent)
			.on('zoom', function() {
				var transform = 'translate(' + d3.event.translate + ') scale(' + d3.event.scale + ')';
				this.glink.attr('transform', transform);
				this.gnode.attr('transform', transform);
			}.bind(this));
		svg.call(zoom);
		if (!opts.zoom.dblclick) {
			svg.on('dblclick.zoom', null);
		}
	}
}

Creed.extend = function(name, fn) {
	if (!fn || typeof fn !== 'function') {
		return;
	}
	Creed.prototype[name] = fn;
};

Creed.extend('render', render);
Creed.extend('clear', clear);