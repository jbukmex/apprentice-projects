document.addEventListener("DOMContentLoaded", function () {
    const margin = { top: 60, right: 40, bottom: 100, left: 60 };
    const width = 1000 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create the SVG for the heatmap
    const svg = d3.select("#heatmap")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create the SVG for the legend
    const legendSvg = d3.select("#legend")
        .attr("width", 300)
        .attr("height", 100);

    // Load the data from the provided JSON file
    d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json")
        .then(data => {
            // Process and render the heatmap

            const baseTemperature = data.baseTemperature;
            const monthlyVariance = data.monthlyVariance;

            // Define the range of years from the data
            const years = [...new Set(monthlyVariance.map(d => d.year))];

            // Define the months in the desired order
            const monthsInOrder = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            // Create x and y scales for the heatmap
            const xScale = d3.scaleBand()
                .domain(years)
                .range([0, width]);

            const yScale = d3.scaleBand()
                .domain(monthsInOrder)
                .range([0, height]);

            // Define color scale for temperature values
            const colorScale = d3.scaleSequential(d3.interpolateRdYlBu)
                .domain([
                    d3.min(monthlyVariance, d => baseTemperature + d.variance),
                    d3.max(monthlyVariance, d => baseTemperature + d.variance)
                ]);

            // Create the heatmap cells
            svg.selectAll(".cell")
                .data(monthlyVariance)
                .enter()
                .append("rect")
                .attr("class", "cell")
                .attr("x", d => xScale(d.year))
                .attr("y", d => yScale(d3.timeFormat("%B")(new Date(0, d.month - 1, 0))))
                .attr("width", xScale.bandwidth())
                .attr("height", yScale.bandwidth())
                .attr("data-year", d => d.year)
                .attr("data-month", d => d.month - 1)
                .attr("data-temp", d => baseTemperature + d.variance)
                .style("fill", d => colorScale(baseTemperature + d.variance))
                .on("mouseover", (event, d) => {
                    const tooltip = d3.select("#tooltip");
                    tooltip.style("display", "block");
                    tooltip.attr("data-year", d.year);
                    tooltip.html(
                        `${d3.timeFormat("%B")(new Date(0, d.month - 1, 0))} ${d.year}<br>` +
                        `${(baseTemperature + d.variance).toFixed(2)}°C<br>${d.variance.toFixed(2)}°C variance`
                    );
                    tooltip.style("left", (event.pageX + 10) + "px");
                    tooltip.style("top", (event.pageY - 40) + "px");
                })
                .on("mouseout", () => {
                    d3.select("#tooltip").style("display", "none");
                });

            // Create the x and y axes
            const xAxis = d3.axisBottom(xScale)
                .tickValues(years.filter(year => year % 10 === 0))
                .tickFormat(d3.format("d"));

            const yAxis = d3.axisLeft(yScale);

            svg.append("g")
                .attr("id", "x-axis")
                .attr("transform", `translate(0, ${height})`)
                .call(xAxis);

            svg.append("g")
                .attr("id", "y-axis")
                .call(yAxis);

            // Create the legend
            const legendColors = colorScale.ticks(6);
            const legendWidth = 40;

            const legend = legendSvg.selectAll(".legend")
                .data(legendColors)
                .enter()
                .append("rect")
                .attr("class", "legend")
                .attr("x", (d, i) => i * legendWidth)
                .attr("y", 20)
                .attr("width", legendWidth)
                .attr("height", 20)
                .style("fill", d => colorScale(d));

            // Add legend labels
            legendSvg.selectAll(".legend-label")
                .data(legendColors)
                .enter()
                .append("text")
                .attr("class", "legend-label")
                .text(d => d.toFixed(1))
                .attr("x", (d, i) => i * legendWidth)
                .attr("y", 45);
        })
        .catch(error => console.error(error));
});