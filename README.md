# d3-colorbar

This plugin provides a quick method to generate a color bar. The color bar can be created in a similar way to that of an axis, e.g.

```javascript
var colorScale = d3.scaleSequential(d3.interpolateWarm).domain([-1,1]);
var cb = d3.colorbarV(colorScale, 20,100);
svg.append("g").call(cb);
```

## Installing

If you use NPM, `npm install d3-colorbar`. Otherwise, download the [latest release](https://github.com/d3/d3-colorbar/releases/latest).

## API Reference

<a href="#colorbar" name="colorbar">#</a> <b>d3.colorbarH</b>(colorScale, width, height)
Create a horizontal color bar of size width x height that maps the given colorScale.

<a href="#colorbar" name="colorbar">#</a> <b>d3.colorbarV</b>(colorScale, width, height)
Create a vertical color bar of size width x height that maps the given colorScale.


<i>colorbar</i>.<b>tickValues</b>([array])
Set the tick values to be shown on the color bar.
