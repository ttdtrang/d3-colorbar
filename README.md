# d3-colorbar

This plugin provides a quick method to generate a color bar which can be created in a similar way to an axis, e.g.

```javascript
var colorScale = d3.scaleSequential(d3.interpolateWarm).domain([-1,1]);
var cb = d3.colorbarV(colorScale, 20,100);
svg.append("g").call(cb);
```
Some examples

![image](https://cloud.githubusercontent.com/assets/11604145/23041389/0f3d68c6-f452-11e6-8a60-63cf2e96f332.png)


## Installing

If you use NPM, `npm install d3-colorbar`. Otherwise, download the [latest release](https://github.com/d3/d3-colorbar/releases/latest).

## API Reference

<a href="#colorbar" name="colorbar">#</a> <b>d3.colorbarH</b>(_colorScale, width, height_)

Create a horizontal color bar of size width x height that maps the given colorScale.

<a href="#colorbar" name="colorbar">#</a> <b>d3.colorbarV</b>(_colorScale, width, height_)

Create a vertical color bar of size width x height that maps the given colorScale.


<i>colorbar</i>.<b>tickValues</b>(_array_)

Set the tick values to be shown on the color bar.
