// Define the dimensions of the map and legend
const mapWidth = 800;
const mapHeight = 500;
const legendWidth = 400;
const legendHeight = 50;

// Create SVG elements for the map and legend
const svg = d3.select("#map")
    .attr("width", mapWidth)
    .attr("height", mapHeight);

const legendSvg = d3.select("#legend")
    .attr("width", legendWidth)
    .attr("height", legendHeight);

// Load the JSON data files
Promise.all([
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json"),
    d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json")
]).then(([countyData, educationData]) => {
    renderMap(countyData, educationData);
});

function renderMap(countyData, educationData) {
    // Define the color scale for the legend
    const colorScale = d3.scaleThreshold()
        .domain([10, 20, 30, 40, 50, 60, 70, 80, 90])
        .range(d3.schemeBlues[9]);

    // Create the legend
    legendSvg.selectAll("rect")
        .data(colorScale.range())
        .enter()
        .append("rect")
        .attr("x", (d, i) => (i * (legendWidth / 9)))
        .attr("y", 0)
        .attr("width", legendWidth / 9)
        .attr("height", legendHeight)
        .style("fill", d => d);

    // Add legend text labels
    legendSvg.selectAll("text")
        .data(colorScale.domain())
        .enter()
        .append("text")
        .text(d => `${Math.round(d)}%`)
        .attr("x", (d, i) => (i * (legendWidth / 9)))
        .attr("y", legendHeight + 15)
        .attr("text-anchor", "middle");

    // Create a tooltip
    const tooltip = d3.select("#tooltip");

    // Draw the map
    svg.selectAll("path")
        .data(topojson.feature(countyData, countyData.objects.counties).features)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", d => d.id)
        .attr("data-education", d => {
            const county = educationData.find(item => item.fips === d.id);
            return county ? county.bachelorsOrHigher : 0;
        })
        .attr("d", d3.geoPath())
        .style("fill", d => colorScale(d3.max([0, d3.min([100, d3.max([0, d3.min([90, d3.max([2.6, +d.properties.bachelorsOrHigher])])])])])))
        .on("mouseover", d => {
            const county = educationData.find(item => item.fips === d.id);
            tooltip.style("opacity", 0.9);
            tooltip.html(`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`)
                .attr("data-education", county.bachelorsOrHigher)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });
}

