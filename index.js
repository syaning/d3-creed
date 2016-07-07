const d3 = require('d3')

/**
 * Default options.
 */
const defaults = {
  target: '#chart',
  width: 600,
  height: 400,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  stroke: '#999',
  strokeWidth: 1,
  radius: 5,
  fill: '#1f77b4'
}

module.exports = Creed

/**
 * Creed.
 *
 * @param {Object} options
 * @public
 */
function Creed(options) {
  if (!(this instanceof Creed)) {
    return new Creed(options)
  }

  Object.assign(this, defaults, options)
  this._init()
}

/**
 * Creed prototype.
 */
var proto = Creed.prototype

/**
 * Initialize the chart.
 *
 * @private
 */
proto._init = function() {
  var width = this.width
  var height = this.height
  var margin = this.margin

  var innerWidth = this.innerWidth = width - margin.left - margin.right
  var innerHeight = this.innerHeight = height - margin.top - margin.bottom

  this.target = d3.select(this.target)
  this.svg = this.target.append('svg')
    .attr('width', width)
    .attr('height', height)
    .classed('creed', true)
  this.defs = this.svg.append('defs')
  this.chart = this.svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
  this.glink = this.chart.append('g')
    .classed('links', true)
  this.gnode = this.chart.append('g')
    .classed('nodes', true)

  this.force = d3.layout.force()
    .size([innerWidth, innerHeight])
}

/**
 * Render chart.
 *
 * @param  {Object} data
 * @public
 */
proto.render = function(data) {
  this.data = data
  this.links = this._renderLinks()
  this.nodes = this._renderNodes()

  var force = this.force
  force.nodes(data.nodes).links(data.links)
  force.on('tick', this._tick()).start()
}

/**
 * Render links.
 *
 * @private
 */
proto._renderLinks = function() {
  var stroke = valFn(this.stroke, this.data)
  var strokeWidth = valFn(this.strokeWidth, this.data)

  var links = this.glink.selectAll('.link')
    .data(this.data.links)

  // enter
  links.enter()
    .append('line')
    .classed('link', true)
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)

  // exit
  links.exit().remove()

  return links
}

/**
 * Render nodes.
 *
 * @private
 */
proto._renderNodes = function() {
  var radius = valFn(this.radius, this.data)
  var fill = valFn(this.fill, this.data)

  var nodes = this.gnode.selectAll('.node')
    .data(this.data.nodes)

  // enter
  nodes.enter()
    .append('circle')
    .classed('node', true)
    .attr('r', radius)
    .attr('fill', fill)

  // exit
  nodes.exit().remove()

  return nodes
}

/**
 * Tick function.
 *
 * @private
 */
proto._tick = function() {
  var self = this

  return function tick() {
    self._tickLinks()
    self._tickNodes()
  }
}

/**
 * Links tick function.
 *
 * @private
 */
proto._tickLinks = function() {
  this.links
    .attr('x1', d => d.source.x)
    .attr('y1', d => d.source.y)
    .attr('x2', d => d.target.x)
    .attr('y2', d => d.target.y)
}

/**
 * Nodes tick function.
 *
 * @private
 */
proto._tickNodes = function() {
  this.nodes.attr('transform', d => `translate(${d.x}, ${d.y})`)
}

/**
 * Clear chart.
 *
 * @public
 */
proto.clear = function() {
  this.glink.selectAll('*').remove()
  this.gnode.selectAll('*').remove()
}

/**
 * Value function.
 *
 * @param  {*} val
 * @param {Object} data
 * @private
 */
function valFn(val, data) {
  if (typeof val !== 'function') {
    return val
  }

  try {
    var ret = val(data)
    return typeof ret === 'function' ? ret : val
  } catch (err) {
    return val
  }
}
