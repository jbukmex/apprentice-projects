// Define the dimensions of the tree map.
const width = 800;
const height = 600;

// Create an SVG container for the tree map.
const svg = d3.select("#tree-map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load the dataset (Video Game Sales) using d3.json.
d3.json("https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json").then(data => {
    // Create a treemap layout.
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);

    const treemap = d3.treemap()
        .size([width, height])
        .padding(1)
        .round(true)(root);

    // Create the tiles (rectangles) for the tree map.
    const tiles = svg.selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g");

    tiles.append("rect")
        .attr("class", "tile")
        .attr("data-name", d => d.data.name)
        .attr("data-category", d => d.data.category)
        .attr("data-value", d => d.data.value)
        .attr("x", d => d.x0)
        .attr("y", d => d.y0)
        .attr("width", d => d.x1 - d.x0)
        .attr("height", d => d.y1 - d.y0)
        .attr("fill", d => getColor(d.data.category)); // Define a function to get fill color based on category.

    // Create the legend.
    const legend = d3.select("#legend");

    // Add legend items.
    const legendItems = legend.selectAll(".legend-item")
        .data(data.children)
        .enter()
        .append("div")
        .attr("class", "legend-item");

    legendItems.append("div")
        .attr("class", "legend-color")
        .style("background-color", d => getColor(d.name)); // Define a function to get legend item color.

    legendItems.append("div")
        .attr("class", "legend-label")
        .text(d => d.name);

    // Add tooltips.
    tiles.on("mouseover", (event, d) => {
        const tooltip = d3.select("#tooltip");
        tooltip
            .attr("data-value", d.data.value)
            .html(getTooltipContent(d.data));
        tooltip.style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY + 10) + "px");
        tooltip.style("opacity", 1);
    });

    tiles.on("mouseout", () => {
        d3.select("#tooltip").style("opacity", 0);
    });
});

// Define a function to get fill color based on category.
function getColor(category) {
    // Customize colors as needed.
    const colorScale = d3.scaleOrdinal()
        .domain(["PS2", "X360", "PS3", "Wii", "DS", "PSP", "PS", "PC", "XB", "GC"])
        .range(d3.schemeSet3);
    return colorScale(category);
}

// Define a function to get tooltip content.
function getTooltipContent(data) {
    return `
    <strong>${data.name}</strong><br>
    Category: ${data.category}<br>
    Value: ${data.value}
    `;
}