/**
*Name : bar_d3.js
*Varsion : 0.01 
*Globar object : $$bar
*Dependencies : D3.js
**/

(function (window, jQuery, d3) {

    var l_fnHbard3 = function () {
        return new l_csHbard3_init()
    };

    //Base object constructor 
    function l_csHbard3_init() {

        //Data object contain json data to visualize 
        //Type array[]
        this.data = [];

        //Bar style attributes
        //Type array[]
        this.bar_style = [];

        //Add selector to the dom
        //Type array[]
        this.selector = "";

        //Add colors to the bar Chart 
        //Type array[]
        this.colors = "blue";

        //Add animation to the Chart
        //Type array of object
        this.animation = "";

        //Add Events to the Chart 
        //Type array[]
        this.events = [];

        this.svg_width = 0;

        this.svg_height = 0;

        //Add Yaxis values to the Chart 
        //Type array []
        this.tickValues = [];

        this.chart = "";

    };




    l_fnHbard3.prototype = {



        /** Add basic config to the bar chart **/
        /* Param Type : p_data[],toAppend[],yAxisValues[];
        **/
        fn_barConfig: function (p_data, toAppend) {

            if (p_data instanceof Array) {
                this.data = p_data;
                this.selector = toAppend;
            } else {
                throw new Error("All parammeters should be array");
                // console.log("Some parameter is not array");
            }
            return this;
        },
        fn_draw: function () {
            //Remove existing chart for testing purpose
            //d3.select("#svg_pointer").remove();
            var self = this;
            var l_data = d3.map(self.data);
            var l_element = d3.map(self.selector);


            //check the third param is valid or not

            //check data is empty or not 


        


                // Get selector to where we want to append the chart
                //filter logic to select valid selectors 

                var l_strAppend = self.selector;


                d3.select(l_strAppend + " #svg_pointer").remove();
                //console.log(l_strAppend+"#"+svg_pointer);

                //Get Max value from the data.value using array.map function
                function getMaxValue(a) {
                    return a.value;
                    console.log(a.value);
                }

                var arrayOfValueBox = [];

                arrayOfValueBox = self.data.map(getMaxValue);

                var maxValue = d3.max(arrayOfValueBox);


                var canvas = d3.select(l_strAppend || "body")
                     .append('svg')
                     .attr("id", "svg_pointer")
                     .attr({ 'width': this.svg_width || 900, 'height': this.svg_height || 550 });


                //set chart siz inside the logic
                w = jQuery(l_strAppend).innerWidth(),
                h = jQuery(l_strAppend).innerHeight(),
                margin = { top: 40, right: 200, bottom: 20, left: 400 }



                var xscale = d3.scale.linear()
                                .domain([0, maxValue])
                                .range([0, 722]);

                var yscale = d3.scale.linear()
                                .domain([0, l_data.size()])
                                .range([0, 480]);

                var colorScale = d3.scale.quantize()
                                .domain([0, self.data.length])
                                .range(this.colors);



                var xAxis = d3.svg.axis();
                xAxis
                    .orient('bottom')
                    .scale(xscale)
                    .tickSize(2)
                    .tickFormat(function (d, i) { return d + "K" })
                //.tickValues(tickVals);

                var yAxis = d3.svg.axis();
                yAxis
                    .orient('left')
                    .scale(yscale)
                    .tickSize(2)
                    .tickFormat(function (d, i) { return self.data[i].category; })
                    .tickValues(d3.range(self.data.length));








                var y_xis = canvas.append('g')
                                  .attr("transform", "translate(150,4)")
                                  .attr('id', 'yaxis')
                                  .call(yAxis);

                var x_xis = canvas.append('g')
                                  .attr("transform", "translate(150,480)")
                                  .attr('id', 'xaxis')
                                  .call(xAxis);


                var chart = canvas.append('g')
                .attr("transform", "translate(150,6)")
                .attr('id', 'bars')
                .selectAll('rect')
                .data(self.data)
                .enter()
                .append('rect')
                .attr('height', 20)
                .attr({ 'x': 0, 'y': function (d, i) { return yscale(i); } })
                .style('fill', function (d, i) { return colorScale(i); })
                .attr('width', function (d) { return 0; xscale(d.value) });


                var transit = d3.select(l_strAppend + " #svg_pointer").selectAll("rect")
                          .data(self.data)
                          .transition()
                          .duration(this.animation.duration || 0)
                          .ease(this.animation.ease || "")
                          .attr("width", function (d) { return xscale(d.value); });

                //end events 

                chart.on("mouseover", function (d, i) {
                    d3.select(this)
                    .style('fill', function () {
                        // console.log(d);
                        // console.log(i);
                        return colorScale(i);
                    });

                    canvas.append("text")
                          .attr({
                              id: "t" + d.value,
                              x: function () { return d.value + 200; },
                              y: function () { return yscale(i); }
                          })
                          .text(function () {
                              //  console.log("[" + d.category + "==" + d.value + "]")
                              return [d.category, +d.value];
                          });

                })

                .on("mouseout", function (d, i) {
                    d3.select("#t" + d.value).remove();
                    //console.log("This is triggered");
                });

                this.chart = canvas;

                return this;

                //** End basic bar login **/

            
        },

        /** AddData to the Visual 
        ** Type of param : json type
        **/
        fn_addData: function (p_jsonData) {
            this.data.push(p_jsonData);
            return this;
        },

        /** AddStyle to the Visual 
        ** Type of param : Array of object type
        **/
        fn_addStyle: function (p_jsonStyleData) {

            var height = 0;
            var width = 0;

            p_jsonStyleData.forEach(function (key, a) {
                console.log(key);
                if (key.width) {
                    width = key.width;

                } else {
                    throw "AddStyle width param is required";
                }

                if (key.height) {
                    height = key.height;

                } else {
                    throw "AddStyle height param is required";
                }

            });

            this.svg_width = width;
            this.svg_height = height;

            return this;
        },


        /** AddSelector to the Visual 
        ** Type of param : json type
        **/
        fn_addSelectors: function (p_jsonSelectorData) {
            self.selector.push(p_jsonSelectorData);
            return this;
        },

        /** AddColors to the Visual 
        ** Type of param : json type
        **/
        fn_addColors: function (p_jsonColorData) {
            this.colors = p_jsonColorData;
            console.log(this.colors);
            return this;
        },

        /** AddAnimation to the Visual 
        ** Type of param : json type
        **/
        fn_addAnimation: function (p_jsonAnimationAttr) {
            this.animation = p_jsonAnimationAttr;
            console.log(this.animation.duration);
            return this;
        },


        fn_addYaxisValues: function (p_yaxisValues) {
            this.tickValues.push(p_yaxisValues);
            return this;
        },


        /** AddEvents to the Visual 
        ** Type of param : json type
        **/
        fn_addEvents: function (event, callback) {

            if (!this.chart == "") {
                this.chart.on(event, callback);
            }
            else {
                throw "There is no Visual found";
            }

            return this;
        },


        //Remove existing svg
        fn_removeChart: function (selector) {
            d3.select(selector + " #svg_pointer").remove();
        }

    }; //Prototype End


    //assign prototype to l_csHbard3_init constructor
    l_csHbard3_init.prototype = l_fnHbard3.prototype;

    //Add hBard3 object to globally using window object
    window.hrbr = window.$$bar = l_fnHbard3;

}(window, jQuery, d3))
//Pass window and d3 object


//mainCallback(function(p_arr){ console.log(p_arr); })

