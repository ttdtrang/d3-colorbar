var vertical = 1,
    horizontal = 2;

function colorbar(orient, scale, width, height) {
    
    var tickValues = null; 
    var barThickness = orient === horizontal ? height: width;
    var barRange = orient === horizontal ? width : height;  
    function colorbar(context) {
        // The finer, the more continuous it looks
        var dL = 2;
        var nBars = Math.floor(barRange / dL);
        var barData =   [];
        var trueDL = barRange*1./nBars;
        for (var i = 0; i < nBars;i++) {
            barData.push(i*(trueDL));
        }
      
        var linearScale = d3.scaleLinear()
            .domain(scale.domain())
            .range([0, orient === horizontal ? width : height]);
        var interScale = d3.scaleLinear()
            .domain([0, barRange])
            .range(scale.domain());
        
         var bars = context.selectAll("rect")
            .data(barData)
            .enter()
            .append("rect")
            .attr("x", translateX)
            .attr("y", translateY)
            .attr("width", orient === horizontal ? trueDL : barThickness)
            .attr("height", orient === horizontal ? barThickness : trueDL)
            .style("stroke-width", "0px")
            .style("fill", function(d,i) {return scale(interScale(d))});
      
        var axisGroup = context.append("g")
            .attr("class", "colorbar axis")
            .attr("transform", "translate(" +  translateAxis() + ")");
        var myAxis = (orient === horizontal) ? d3.axisBottom(linearScale) : d3.axisRight(linearScale); 
        axisGroup.call(myAxis);
        if (tickValues == null) {
            tickValues = myAxis.tickValues();
        }
    }

    // set or get
    colorbar.scale = function(_) {
        return arguments.length ? (scale = _, colorbar) : scale;
    };
    colorbar.tickValues = function(_) {
        return arguments.length ? (tickValues = _, colorbar) : tickValues;
    };  
    
    function translateAxis() {
        var tX = orient === horizontal ? 0 : width;
        var tY = orient === horizontal ? height : 0;
        return tX + "," + tY;
    }
    
    function translateX(d,i) {
        if ( orient === horizontal) return d;
        else return 0;
    }
    
    function translateY(d,i) {
        if (orient === horizontal) return 0;
        else return d;
    }
    
    return colorbar;
}


function axis(orient, scale) {
    var tickArguments = [],
        tickValues = null,
        tickFormat = null,
        tickSizeInner = 6,
        tickSizeOuter = 6,
        tickPadding = 3,
        k = orient === top || orient === left ? -1 : 1,
        x, y = orient === left || orient === right ? (x = "x", "y") : (x = "y", "x"),
        transform = orient === top || orient === bottom ? translateX : translateY;

    function axis(context) {
        var values = tickValues == null ? (scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain()) : tickValues,
            format = tickFormat == null ? (scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : identity) : tickFormat,
            spacing = Math.max(tickSizeInner, 0) + tickPadding,
            range = scale.range(),
            range0 = range[0] + 0.5,
            range1 = range[range.length - 1] + 0.5,
            position = (scale.bandwidth ? center : identity)(scale.copy()),
            selection = context.selection ? context.selection() : context,
            path = selection.selectAll(".domain").data([null]),
            tick = selection.selectAll(".tick").data(values, scale).order(),
            tickExit = tick.exit(),
            tickEnter = tick.enter().append("g").attr("class", "tick"),
            line = tick.select("line"),
            text = tick.select("text");

        path = path.merge(path.enter().insert("path", ".tick")
            .attr("class", "domain")
            .attr("stroke", "#000"));

        tick = tick.merge(tickEnter);

        line = line.merge(tickEnter.append("line")
            .attr("stroke", "#000")
            .attr(x + "2", k * tickSizeInner)
            .attr(y + "1", 0.5)
            .attr(y + "2", 0.5));

        text = text.merge(tickEnter.append("text")
            .attr("fill", "#000")
            .attr(x, k * spacing)
            .attr(y, 0.5)
            .attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));

        if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);

            tickExit = tickExit.transition(context)
                .attr("opacity", epsilon)
                .attr("transform", function(d) { return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform"); });

            tickEnter
                .attr("opacity", epsilon)
                .attr("transform", function(d) { var p = this.parentNode.__axis; return transform(p && isFinite(p = p(d)) ? p : position(d)); });
        }

        tickExit.remove();

        path
            .attr("d", orient === left || orient == right
                ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter
                : "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter);

        tick
            .attr("opacity", 1)
            .attr("transform", function(d) { return transform(position(d)); });

        line
            .attr(x + "2", k * tickSizeInner);

        text
            .attr(x, k * spacing)
            .text(format);

        selection.filter(entering)
            .attr("fill", "none")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");

        selection
            .each(function() { this.__axis = position; });
    }

    axis.scale = function(_) {
        return arguments.length ? (scale = _, axis) : scale;
    };

    axis.ticks = function() {
        return tickArguments = slice.call(arguments), axis;
    };

    axis.tickArguments = function(_) {
        return arguments.length ? (tickArguments = _ == null ? [] : slice.call(_), axis) : tickArguments.slice();
    };

    axis.tickValues = function(_) {
        return arguments.length ? (tickValues = _ == null ? null : slice.call(_), axis) : tickValues && tickValues.slice();
    };

    axis.tickFormat = function(_) {
        return arguments.length ? (tickFormat = _, axis) : tickFormat;
    };

    axis.tickSize = function(_) {
        return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
    };

    axis.tickSizeInner = function(_) {
        return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
    };

    axis.tickSizeOuter = function(_) {
        return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
    };

    axis.tickPadding = function(_) {
        return arguments.length ? (tickPadding = +_, axis) : tickPadding;
    };

    return axis;
}

export function colorbarV(scale, width,height) {
    return colorbar(vertical, scale, width, height);
}

export function colorbarH(scale, width,height) {
    return colorbar(horizontal, scale, width, height);
}
