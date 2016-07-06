# d3-creed

Force layout chart based on [d3.js](http://d3js.org/).

### Install

```sh
$ npm install d3-creed
```

### Usage

```javascript
const creed = require('d3-creed')

// create chart
var chart = creed({
    target: '#chart'
})

chart.render({
    nodes: [...],
    links: [...]
})
```

or in browser:

```html
<script src="path/to/d3-creed.min.js"></script>
<script>
    var chart = creed({
        target: '#chart'
    });
    chart.render({
        nodes: [...],
        links: [...]
    });
</script>
```

### API

#### creed(options)

Create a new force layout chart with given options.

#### chart.render(data)

Render the chart with given data.

#### chart.clear()

Clear the chart.

### License

[MIT]()
