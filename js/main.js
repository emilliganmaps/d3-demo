window.onload = function(){
    var w = 900, h = 500;
    
    //outer rectangle container styling
    var container = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "container")
        .style("background-color", "rgba(0,0,0,0.2)");
    
    //inner rectangle container styling
    var innerRect = container.append("rect")
        .datum(400)
        .attr("width", function(d){
            return d * 2;
        })
        .attr("height", function(d){
              return d;
        })
        .attr("class", "innerRect")
        .attr("x", 50)
        .attr("y", 50)
        .style("fill", "#FFFFFF");
    
    //Midwestern cities selected for array
    var cityPop = [
        {   city: 'Rochester',
            population: 115733
        },
        { 
            city: 'Minneapolis',
            population: 422331
        },
        {
            city: 'Wauwatosa',
            population: 48277
        },
        {
            city: 'Saint Paul',
            population: 306621
        },
        {   city: 'Maplewood',
            population: 40918
        },
        {
            city: 'La Crosse',
            population: 51834
        }
    ];
    
    //scales the population circles
    var x = d3.scaleLinear() //create the scale
        .range([100, 475]) //output min and max
        .domain([0, 3]); //input min and max
    
    //find array minimum
    var minPop = d3.min(cityPop, function(d){
        return d.population;
    });

    //find array maximum
    var maxPop = d3.max(cityPop, function(d){
        return d.population;
    });

    //scale for circles center y coordinate
    var y = d3.scaleLinear()
        .range([450, 50])
        //max value for y axis
        .domain([0, 500000]);
    
    //assign colors based on population values from low to high, light to dark
    var color = d3.scaleLinear()
        .range([
            "#f2f0f7",
            "#6a51a3"
        ])
        .domain([
            minPop,
            maxPop
        ]);
    
    var circles = container.selectAll(".circles")
        .data(cityPop)
        .enter()
        .append("circle")
        .attr("class", "circles")
        .attr("id", function(d){
            return d.city;
        })
        .attr("r", function(d){
            var area = d.population * 0.01;
            return Math.sqrt(area/Math.PI);
        })
        .attr("cx", function(d, i){
            return x(i);
        })
        .attr("cy", function(d){
            return y(d.population);
        })
        .style("fill", function(d, i){
            return color(d.population);
        })
        .style("stroke", "#000");
    
    var yAxis = d3.axisLeft(y);
    
    //creates a y axis
    var axis = container.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(50,0)")
        .call(yAxis);
    
    yAxis(axis);
    
    //creates chart title
    var title = container.append("text")
        .attr("class", "title")
        .attr("text-anchor", "middle")
        .attr("x", 450)
        .attr("y", 30)
        .text("City Populations");
    
    //creates circle labels
    var labels = container.selectAll(".labels")
        .data(cityPop)
        .enter()
        .append("text")
        .attr("class", "labels")
        .attr("text-anchor", "left")
        .attr("x", function(d,i){
            //horizontal position of labels
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("y", function(d){
            //vertical position of labels
            return y(d.population);
        });

    //first line of circle label
    var nameLine = labels.append("tspan")
        .attr("class", "nameLine")
        .attr("x", function(d,i){
            //horizontal position to the right of each circle
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .text(function(d){
            return d.city;
        });

    //properly formats second line of label
    var format = d3.format(",");

    //second line of label
    var popLine = labels.append("tspan")
        .attr("class", "popLine")
        .attr("x", function(d,i){
            return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
        })
        .attr("dy", "15") //vertical offset
        .text(function(d){
            return "Pop. " + format(d.population);
        });
};