var d3 = require('d3');
var util = require('./util');
var options = require('./options');
var render = require('./render');

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
}

Creed.extend = function(name, fn) {
	if (!fn || typeof fn !== 'function') {
		return;
	}
	Creed.prototype[name] = fn;
};

Creed.extend('render', render);