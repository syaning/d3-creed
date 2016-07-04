(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["creed"] = factory(require("d3"));
	else
		root["creed"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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

	'use strict';

	var d3 = __webpack_require__(1);

	/**
	 * Default options.
	 */
	var defaults = {
	  target: '#chart',
	  width: 600,
	  height: 400,
	  margin: {
	    top: 0,
	    right: 0,
	    bottom: 0,
	    left: 0
	  }
	};

	module.exports = Creed;

	/**
	 * Creed.
	 *
	 * @param {Object} options
	 * @public
	 */
	function Creed(options) {
	  if (!(this instanceof Creed)) {
	    return new Creed(options);
	  }

	  Object.assign(this, defaults, options);
	  this._init();
	}

	/**
	 * Creed prototype.
	 */
	var proto = Creed.prototype;

	/**
	 * Initialize the chart.
	 *
	 * @private
	 */
	proto._init = function () {
	  var width = this.width;
	  var height = this.height;
	  var margin = this.margin;

	  var innerWidth = this.innerWidth = width - margin.left - margin.right;
	  var innerHeight = this.innerHeight = height - margin.top - margin.bottom;

	  this.target = d3.select(this.target);
	  this.svg = this.target.append('svg').attr('width', width).attr('height', height).classed('creed', true);
	  this.defs = this.svg.append('defs');
	  this.chart = this.svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
	  this.glink = this.chart.append('g').classed('links', true);
	  this.gnode = this.chart.append('g').classed('nodes', true);

	  this.force = d3.layout.force().size([innerWidth, innerHeight]);
	};

	/**
	 * Render chart.
	 *
	 * @param  {Object} data
	 * @public
	 */
	proto.render = function (data) {
	  this.data = data;
	  this.links = this._renderLinks();
	  this.nodes = this._renderNodes();

	  var force = this.force;
	  force.nodes(data.nodes).links(data.links);
	  force.on('tick', this._tick()).start();
	};

	/**
	 * Render links.
	 *
	 * @private
	 */
	proto._renderLinks = function () {
	  var links = this.glink.selectAll('.link').data(this.data.links);

	  // update
	  // TODO

	  // enter
	  links.enter().append('line').classed('link', true);

	  // exit
	  links.exit().remove();

	  return links;
	};

	/**
	 * Render nodes.
	 *
	 * @private
	 */
	proto._renderNodes = function () {
	  var nodes = this.gnode.selectAll('.node').data(this.data.nodes);

	  // update
	  // TODO

	  // enter
	  nodes.enter().append('circle').classed('node', true).attr('r', 5);

	  // exit
	  nodes.exit().remove();

	  return nodes;
	};

	/**
	 * Tick function.
	 *
	 * @private
	 */
	proto._tick = function () {
	  var self = this;

	  return function tick() {
	    self.links.attr('x1', function (d) {
	      return d.source.x;
	    }).attr('y1', function (d) {
	      return d.source.y;
	    }).attr('x2', function (d) {
	      return d.target.x;
	    }).attr('y2', function (d) {
	      return d.target.y;
	    });

	    self.nodes.attr('transform', function (d) {
	      return 'translate(' + d.x + ', ' + d.y + ')';
	    });
	  };
	};

	/**
	 * Clear chart.
	 *
	 * @public
	 */
	proto.clear = function () {
	  this.glink.selectAll('*').remove();
	  this.gnode.selectAll('*').remove();
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;