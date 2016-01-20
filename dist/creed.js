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
	var clear = __webpack_require__(7);

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
	    this.defs = svg.append('defs');
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	    isObject: isObject,
	    isFunction: isFunction,
	    merge: merge
	};

	function isObject(val) {
	    return val !== null && typeof val === 'object';
	}

	function isFunction(val) {
	    return typeof val === 'function';
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
	        charge: -120,
	        linkDistance: 30
	    },
	    link: {
	        isArc: false,
	        arrow: false,
	        stroke: '#999',
	        strokeWidth: 1
	    },
	    node: {
	        radius: 5,
	        fill: '#1f77b4'
	    },
	    drag: {
	        enable: true,
	        fix: false
	    },
	    zoom: {
	        enable: false,
	        scaleExtent: [0.5, 2],
	        dblclick: false
	    }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var createScales = __webpack_require__(6);

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

	    // in case that isArc changes before rerendering
	    this.glink.selectAll((isArc ? 'line' : 'path') + '.link')
	        .remove();

	    var links = this.glink.selectAll((isArc ? 'path' : 'line') + '.link')
	        .data(data.links);
	    // update
	    links.attr('stroke', scales.stroke)
	        .attr('stroke-width', scales.strokeWidth);
	    // enter
	    links.enter()
	        .append(isArc ? 'path' : 'line')
	        .classed('link', true)
	        .attr('stroke', scales.stroke)
	        .attr('stroke-width', scales.strokeWidth);
	    // exit
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
	    // update
	    nodes.attr('r', scales.radius)
	        .attr('fill', scales.fill);
	    // enter
	    nodes.enter()
	        .append('circle')
	        .classed('node', true)
	        .attr('r', scales.radius)
	        .attr('fill', scales.fill);
	    // exit
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var d3 = __webpack_require__(2);
	var isFunction = __webpack_require__(3).isFunction;

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


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = clear;

	function clear() {
	    this.glink.selectAll('*').remove();
	    this.gnode.selectAll('*').remove();
	}


/***/ }
/******/ ])
});
;
