var d3 = require('d3');
var isFunction = require('./util').isFunction;

module.exports = createScales;

function createScales(data) {
	var opts = this.opts;

	return {
		stroke: getScale(opts.link.stroke),
		strokeWidth: getScale(opts.link.strokeWidth),
		radius: getScale(opts.node.radius),
		fill: getScale(opts.node.fill)
	};

	function getScale(scale) {
		return isFunction(scale) ? scale(data) : scale;
	}
}