# creed

Force layout chart based on [d3.js](http://d3js.org/).

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
