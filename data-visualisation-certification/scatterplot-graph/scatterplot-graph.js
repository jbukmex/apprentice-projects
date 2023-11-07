d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
  .then(data => {
    const width = 1000;
    const height = 700;
    const margin = { top: 50, right: 50, bottom: 50, left: 50 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot")
      .attr("width", width)
      .attr("height", height);

    const parseTime = d3.timeParse("%M:%S");

    const years = data.map(d => d.Year);
    const times = data.map(d => parseTime(d.Time));

    const xScale = d3.scaleLinear()
      .domain([d3.min(years) - 1, d3.max(years) + 1])
      .range([0, innerWidth]);

    const yScale = d3.scaleTime()
      .domain([d3.min(times), d3.max(times)])
      .range([0, innerHeight]);

    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.format("d"));

    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d3.timeFormat("%M:%S"));

    svg.append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(${margin.left}, ${innerHeight + margin.top})`)
      .call(xAxis);

    svg.append("g")
      .attr("id", "y-axis")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);

    svg.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("data-xvalue", d => d.Year)
      .attr("data-yvalue", d => parseTime(d.Time))
      .attr("cx", d => xScale(d.Year) + margin.left)
      .attr("cy", d => yScale(parseTime(d.Time)) + margin.top)
      .attr("r", 5)

    svg.append("text")
      .attr("id", "legend")
      .attr("x", innerWidth + margin.left)
      .attr("y", innerHeight + margin.top)
      .text("Riders with doping allegations");

    const tooltip = d3.select("#tooltip");
    svg.selectAll(".dot")
      .on("mouseover", function (event, d) {
        tooltip.style("display", "block")
          .attr("data-year", d.Year)
          .html(`${d.Name}: ${d.Nationality}<br>Year: ${d.Year}<br>Time: ${d.Time}<br>${d.Doping ? "Doping allegations" : "No doping allegations"}`);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });
  })
  .catch(error => {
    console.error("Error loading dataset:", error);
  });
