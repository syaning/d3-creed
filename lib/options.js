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