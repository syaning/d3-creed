(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["creed"] = factory(require("d3"));
	else
		root["creed"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var d3 = __webpack_require__(2);
	var util = __webpack_require__(3);
	var options = __webpack_require__(4);
	var render = __webpack_require__(5);

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
		isObject: isObject,
		merge: merge
	};

	function isObject(val) {
		return val !== null && typeof val === 'object';
	}

	function merge(to, from) {
		to = to || {};
		from = from || {};
		var key, toVal, fromVal;

		for (key in from) {
			if (!to.hasOwnProperty(key)) {
				to[key] = from[key];
			} else {
				toVal = to[key];
				fromVal = from[key];
				if (isObject(toVal) && isObject(fromVal)) {
					merge(toVal, fromVal);
				}
			}
		}
		return to;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = {
		container: null,
		width: 0,
		height: 0,
		force: {
			charge: -300,
			linkDistance: 100
		},
		link: {
			width: [1, 3],
			stroke: {},
			type: 'line' // line or arc
		},
		node: {
			radius: [10, 25],
			fill: {}
		},
		text: {
			show: true,
			overlay: true,
			text: '' // string or function
		},
		hooks: {
			preDraw: null,
			postDraw: null
		},
		zoom: true,
		dragfix: true
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

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

/***/ }
/******/ ])
});
;