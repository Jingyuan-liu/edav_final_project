  const xValue = d => d.timestamp;
  const xLabel = 'Time';
  const yValue = d => d.Close_scale;

  const yLabel = 'Scaled Closing Price';
  const margin = { left: 100, right: 15, top: 60, bottom: 300 };

  const svg = d3.select('svg');
  const width = svg.attr('width');
  const height = svg.attr('height');
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
  const xAxisG = g.append('g')
      .attr('transform', `translate(0, ${innerHeight})`);
  const yAxisG = g.append('g');
  
  svg.append('circle').attr('dx', 400).attr('dy',400).attr('r', 100).attr('fill','orange');

  
  svg.append('circle').attr('fill','orange').attr('dx', 400).attr('dy',400).attr('r', 100)

  xAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('x', innerWidth / 2)
      .attr('y', 100)
      .text(xLabel);

  yAxisG.append('text')
      .attr('class', 'axis-label')
      .attr('x', -innerHeight / 2)
      .attr('y', -100)
      .attr('transform', `rotate(-90)`)
      .style('text-anchor', 'middle')
      .text(yLabel);

  const xScale = d3.scaleTime();
  const yScale = d3.scaleLinear();

  const xAxis = d3.axisBottom()
    .scale(xScale)
    .tickPadding(20)
    .ticks(12)
    .tickSize(-innerHeight);

  const yTicks = 5;
  const yAxis = d3.axisLeft()
    .scale(yScale)
    .ticks(yTicks)
    .tickPadding(15)
    .tickSize(-innerWidth);



  const line = d3.line()
    .x(d => xScale(xValue(d)))
    .y(d => yScale(yValue(d)))
    .curve(d3.curveBasis);

  row = d => {
    d.timestamp = new Date(d.Date);
    d.Close_scale = +d.Close_scale;
    d.index = d.Index;
    return d;
  };


  d3.csv('https://gist.github.com/Jingyuan-liu/b51a8b906769fe1764650648a26be35d/raw/stock_price.csv', row).then(function(data){



    xScale.domain(d3.extent(data, xValue))
          .range([0, innerWidth]);

    yScale.domain(d3.extent(data, yValue))
          .range([innerHeight, 0])
          .nice(yTicks);

  	// var sumstat = d3.nest()
  	//                  .key(function(d) {return d.index;})
  	//                  .entries(data)

    var sumstat = d3.group(data, d=>d.index);
    
    // var res = sumstat.map(function(d){return d.key})
    res = Array.from(sumstat.keys());

    var color = d3.scaleOrdinal()
		              .domain(res).range(["#18c61a", "#9817ff", "#d31911", 
                    "#24b7f1", "#fa82ce", "#736c31", "#1263e2", "#18c199", 
                    "#ed990a", "#f2917f", "#7b637c", "#a8b311", "#a438c0", 
                    "#d00d5e", "#1e7b1d", "#05767b", "#aaa1f9", "#a5aea1", 
                    "#a75312", "#026eb8", "#94b665", "#91529e", "#caa74f", 
                    "#c90392", "#a84e5d", "#6a4cf1"]);


	 industry = ["Gaming", "Streaming", "Work-From-Home", "Online-Retail", "Tech-Giants"];
	 companies = {"Gaming":["EA", "NTDOY", "SCPL", "TTWO", "ATVI"], 
				 "Streaming":["NFLX", "DIS", "T", "ROKU"],
				 "Work-From-Home":["ZM", "CSCO", "EGHT", "RNG", "LOGM"],
				 "Online-Retail": ["OSTK", "APRN", "W", "ETSY", "CHWY", "FTCH"], 
				 "Tech-Giants": ["MSFT", "GOOGL", "TWTR", "FB"]
				 };

	 for (k = 0; k < 5; k++){
		   svg.append("circle")
    		.attr("cx", 120+300*k)
    		.attr("cy", 1070)
    		.attr('r', 10)
    		.attr('fill', 'white')
    		.attr('stroke', 'black')
    		.attr('stroke-width', 3)
    		.attr('class', 'utls')
    		.datum(industry[k]);

	     svg.append("text")
		      .attr("x", 140 + 300*k)
		      .attr("y", 1078)
		      .text(industry[k])
		      .attr('font-size', '30px')
		      .attr('font-weight', 'bold');
	 }

  k = 5;
  svg.append("circle")
		.attr("cx", 120+300*k)
		.attr("cy", 1070)
		.attr('r', 10)
		.attr('fill', 'white')
		.attr('stroke', 'black')
		.attr('stroke-width', 3)
		.attr('id', 'clear')
		.attr('class', 'utls');

	svg.append("text")
		.attr("x", 140 + 300*k)
		.attr("y", 1078)
		.text('Clear')
		.attr('font-size', '30px')
		.attr('font-weight', 'bold');


  var x = -120;
  j = 0;
  for (i = 0; i < 5; i++) {
  	if (i%5 == 0) {x += 300; 
  					j = 0}
  svg.append("circle")
  		.attr("cx", x-20)
  		.attr("cy", 1100 + 30*j)
  		.attr('r', 10)
  		.attr('fill', 'white')
  		.attr('stroke', color(res[i]))
  		.attr('stroke-width', 3)
  		.attr('class', industry[0])
  		.datum(res[i]);

	svg.append("text")
		.attr("x", x)
		.attr("y", 1108+30*j)
		.text(res[i])
		.attr('font-size', '30px')
		.attr('font-weight', 'bold');
		j += 1;

  }

  for (i = 5; i < 9; i++) {
    if (i%5 == 0) {x += 300; 
    					j = 0}
    	svg.append("circle")
    		.attr("cx", x-20)
    		.attr("cy", 1100 + 30*j)
    		.attr('r', 10)
    		.attr('fill', 'white')
    		.attr('stroke', color(res[i]))
    		.attr('stroke-width', 3)
    		.attr('class', industry[1])
    		.datum(res[i]);
		svg.append("text")
			.attr("x", x)
			.attr("y", 1108+30*j)
			.text(res[i])
			.attr('font-size', '30px')
			.attr('font-weight', 'bold');
			j += 1;

    }

  for (i = 10; i < 15; i++) {
    if (i%5 == 0) {
      x += 300; 
      j = 0;
    }

    svg.append("circle")
    		.attr("cx", x-20)
    		.attr("cy", 1100 + 30*j)
    		.attr('r', 10)
    		.attr('fill', 'white')
    		.attr('stroke', color(res[i-1]))
    		.attr('stroke-width', 3)
    		.attr('class', industry[2])
    		.datum(res[i-1]);

	svg.append("text")
		.attr("x", x)
		.attr("y", 1108+30*j)
		.text(res[i-1])
		.attr('font-size', '30px')
		.attr('font-weight', 'bold');
		j += 1;

  }

	j = 0;
	x += 300;

for (i = 14; i < 21; i++) {
	svg.append("circle")
		.attr("cx", x-20)
		.attr("cy", 1100 + 30*j)
		.attr('r', 10)
		.attr('fill', 'white')
		.attr('stroke', color(res[i]))
		.attr('stroke-width', 3)
		.attr('class', industry[3])
		.datum(res[i]);

	svg.append("text")
		.attr("x", x)
		.attr("y", 1108+30*j)
		.text(res[i])
		.attr('font-size', '30px')
		.attr('font-weight', 'bold');
		j += 1;

    }

    x += 300;
    j = 0;

for (i = 21; i < 26; i++) {
    svg.append("circle")
    		.attr("cx", x-20)
    		.attr("cy", 1100 + 30*j)
    		.attr('r', 10)
    		.attr('fill', 'white')
    		.attr('stroke', color(res[i]))
    		.attr('stroke-width', 3)
    		.attr('class', industry[4])
    		.datum(res[i]);

	 svg.append("text")
		  .attr("x", x)
		  .attr("y", 1108+30*j)
		  .text(res[i])
		  .attr('font-size', '30px')
		  .attr('font-weight', 'bold');
		  j += 1;
    }


    new_res = [];


    svg.selectAll('circle.utls').on('mouseover', function(){
    	d3.select(this).attr('fill', 'black');
    });

    svg.selectAll('circle.utls').on('mouseout', function(){
    	d3.select(this).attr('fill', 'white');
    });

    svg.selectAll('Circle').on('click', function(){

    	var company = d3.select(this).data();
    	if (industry.includes(company[0])){
    		circles = svg.selectAll('Circle.' + company[0]);
    		circles.attr('fill', function(d){return color(d)});
    		company_list = companies[company[0]];
    		for (i = 0; i < company_list.length; i++) {
    			if (!new_res.includes(company_list[i])) {
    				new_res.push(company_list[i]);
    			}
    		}
    		drawline(new_res);
    	}
    	
    	else if (d3.select(this).attr('id') == 'clear') {
    		// d3.select(this).transition().duration(100).attr('fill', 'black');
    		// d3.select(this).transition().delay(100).duration(100).attr('fill', 'white')
    		new_res = [];
    		d3.selectAll('circle').attr('fill', 'white');
    		drawline(new_res);
    	}


	else if (d3.select(this).attr('fill') == color(company))     {
		d3.select(this).attr('fill', 'white');
		fresh_res = [];
		for (j = 0; j < new_res.length; j++) {
			if (new_res[j] != company) {
				fresh_res.push(new_res[j]);
			}
		}
		console.log(fresh_res);
		new_res = fresh_res;
		drawline(new_res);
	}
	else {
		d3.select(this).attr('fill', color(company));
		new_res.push(company[0]);
		console.log(new_res);
		drawline(new_res);
	}



    })


	drawline(new_res);

	function drawline(res) {
		g.selectAll('path').remove();
		xScale
      	.domain(d3.extent(data, xValue))
      	.range([0, innerWidth]);

    yScale
      .domain(d3.extent(data, yValue))
      .range([innerHeight, 0])
      .nice(yTicks);
    cur_data = data.filter(function(d){return res.includes(d.Index)});

    if (res.length > 0) {
    	 xScale
      	.domain(d3.extent(cur_data, xValue))
      	.range([0, innerWidth]);

      yScale
      .domain(d3.extent(cur_data, yValue))
      .range([innerHeight, 0])
      .nice(yTicks);
    }

    g.selectAll('path')
    	.data(sumstat, d => d.keys())
    	.enter()
    	.append('path')
    	.filter(function(d){return res.includes(d[0]);})
     	.attr('fill', 'none')
     	.attr('stroke', function(d){return color(d[0])})
      .attr('stroke-width', 4)
      .attr('d', function(d){
        	return line(d[1])
        });



        
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);


}

  });

