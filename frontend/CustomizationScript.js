// Store color preferences in localStorage
function saveColors(color1, color2, color3) {
    localStorage.setItem("chartColor1", color1);
    localStorage.setItem("chartColor2", color2);
    localStorage.setItem("chartColor3", color3);
}

// Get color preferences from localStorage
function getChartColors() {
    return [
        localStorage.getItem("chartColor1") || "#0000FF",
        localStorage.getItem("chartColor2") || "#FF0000",
        localStorage.getItem("chartColor3") || "#00FF00"
    ];
}

// Save the chart type in localStorage
function saveChartType(type) {
    localStorage.setItem("chartType", type);
}

// Get the chart type from localStorage
function getChartType() {
    return localStorage.getItem("chartType") || "bar";
}

// Apply settings from the customization page
function applySettings() {
    const color1 = document.getElementById("colorPicker1").value;
    const color2 = document.getElementById("colorPicker2").value;
    const color3 = document.getElementById("colorPicker3").value;

    saveColors(color1, color2, color3);

    // Update the chart type based on the active button
    const activeType = document.querySelector('.chart-type-btn.active').getAttribute("data-type");
    saveChartType(activeType);

    // Display a confirmation message
    const statusMessage = document.getElementById("statusMessage");
    statusMessage.textContent = "Settings applied successfully!";
    statusMessage.style.color = "green";

    console.log("Chart Colors Saved:", getChartColors());
    console.log("Chart Type Saved:", getChartType());
}

// Expose functions to be used in the global scope
window.getChartColors = getChartColors;
window.getChartType = getChartType;
window.applySettings = applySettings;
