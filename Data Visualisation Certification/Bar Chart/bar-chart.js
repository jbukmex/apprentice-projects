// Constant Values
const width = 1500;
const height = 700;
const margin = { top: 20, right: 30, bottom: 40, left: 60 };

// Load the data
d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function (data) {
    const dataset = data.data;  

    // Create the SVG
    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

    // Create x and y scales
    const xScale = d3.scaleTime()
        .domain([new Date(d3.min(dataset, d => d[0])), new Date(d3.max(dataset, d => d[0]))])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])])
        .range([height - margin.bottom, margin.top]);

    // Create x and y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append x and y axes
    svg.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(xAxis);

    svg.append("g")
        .attr("id", "y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);

    // Create the bars
    svg.selectAll(".bar")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("x", d => xScale(new Date(d[0])))
        .attr("y", d => yScale(d[1]))
        .attr("width", width / dataset.length)
        .attr("height", d => height - margin.bottom - yScale(d[1]))
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);
});

// Function to show the tooltip
function showTooltip(event, d) {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "block";
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY - 30 + "px";
    tooltip.innerHTML = `${d[0]}<br>GDP: $${d[1]} Billion`;
    tooltip.setAttribute("data-date", d[0]);
}

// Function to hide the tooltip
function hideTooltip() {
    const tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
}