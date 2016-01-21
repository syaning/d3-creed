# creed

Force layout chart based on [d3.js](http://d3js.org/).

See [demos](http://syaning.com/creed/).

## Install

```
npm install d3-creed
```

## Usage

```javascript
var d3 = require('d3');
var creed = require('d3-creed');

// create chart
var chart = creed({
    container: '#container',
    width: 600,
    height: 400
});

// get data and render chart
d3.json('data.json', function(err, data) {
    if (err) {
        throw err;
    }
    chart.render(data);
});
```

## API

### creed(opts)

Create a new force layout chart with given options.

### creed.render([data])

Render the chart with given data. The parameter can be omitted when performing a rerendering.

### creed.clear()

Clear the chart.

### creed.extend(name, fn)

Extend creed's prototype.

## Option

Default option is

```javascript
{
    container: null,
    width: 0,
    height: 0,
    force: {
        charge: -120,
        linkDistance: 30
    },
    link: {
        isArc: false,
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
}
```

for the following options:

- `link.stroke`
- `link.strokeWidth`
- `node.radius`
- `node.fill`

they can be a primitive value or a function which returns a funtion, for example:

```javascript
function(data) {
    return function(d) {
        // return a primitive value
    };
}
```
