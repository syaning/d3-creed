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