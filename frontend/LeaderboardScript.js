import api from './js/modules/api_wrapper.js';

var device = "Samsung Galaxy S24";
var library = "tflite";
var sort = "accuracy_top1";
var order = "desc"; // or "asc"

const devices = ["Samsung Galaxy S24", "Samsung Galaxy S23", "Snapdragon 8 Elite QRD", "Snapdragon X Elite CRD"]
const libraries = ["TFLite", "ONNX"]
const sorts = ["Accuracy Top 1", "Accuracy Top 5", "Memory Usage", "Inference Time"]

document.addEventListener("DOMContentLoaded", function () {
    dataGrabAndFill()
    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents event from bubbling to document

            let content = this.nextElementSibling;
            let isOpen = content.style.maxHeight;
            let arrow = this.querySelector(".arrow"); // Get the arrow inside the button

            // Close all dropdowns and reset arrows
            document.querySelectorAll(".dropdown-content").forEach(drop => {
                drop.style.maxHeight = null;
                let otherArrow = drop.previousElementSibling.querySelector(".arrow");
                if (otherArrow) {
                    otherArrow.classList.remove("rotated"); // Avoid null error
                }
            });

            // Toggle only the clicked one
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (arrow) {
                    arrow.classList.add("rotated"); // Add class only if arrow exists
                }
            }
        });
    });

    // Close dropdowns if clicking outside
    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-content").forEach(drop => {
            drop.style.maxHeight = null;
            let arrow = drop.previousElementSibling.querySelector(".arrow");
            if (arrow) {
                arrow.classList.remove("rotated");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdownItem").forEach(button => {
        button.addEventListener("click", function (event) {
            dropDownSelect(button.textContent)
        })
    });
});

async function dropDownSelect(id) {
    try {
        var newDevice = device;
        var newLibrary = library;
        var newSort = sort;
        var newOrder = order; // or "asc"

        if (devices.includes(id)) {
            id = id.toLowerCase()
            newDevice = id
            device = id
        } else if (libraries.includes(id)) {
            id = id.toLowerCase()
            newLibrary = id
            library = id
        } else if (sorts.includes(id)) {
            console.log(id)
            if (id == "Accuracy Top 1") {
                newSort = "accuracy_top1"
                sort = "accuracy_top1"
                order = "desc"
                newOrder = "desc"
            } else if (id == "Accuracy Top 5") {
                newSort = "accuracy_top5"
                sort = "accuracy_top5"
                order = "desc"
                newOrder = "desc"
            } else if (id == "Memory Usage") {
                newSort = "memory_usage"
                sort = "memory_usage"
                order = "asc"
                newOrder = "asc"
            } else if (id == "Inference Time") {
                newSort = "inference_time"
                sort = "inference_time"
                order = "asc"
                newOrder = "asc"
            }
        }

        dataGrabAndFill();

    } catch (error) {
        console.error("Error fetching all benchmarks:", error);
    }
}

async function dataGrabAndFill() {
    const benchmarks = await api.filter_benchmarks(device, library, sort, order);
    renderChart(benchmarks);
    populateTable(benchmarks);

    document.querySelector(".customAlert").innerHTML = ``


    document.querySelector(".customAlert").insertAdjacentHTML(
        "afterbegin",
        `Current Benchmarks: <b>${device}</b> on <b>${library}</b> by <b>${sort}</b>`
    )
}


async function populateTable(benchmarks) {
    const tableBody = document.querySelector("#Leaderboard tbody");
    tableBody.innerHTML = "";
    let i = 1;

    console.log(benchmarks);

    // Use a for...of loop to handle async/await correctly
    for (let benchmark of benchmarks.benchmarks) {
        let row = tableBody.insertRow();

        // Assuming api.read_model is an asynchronous function
        const model = await api.read_model(benchmark.model_id);

        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = model.model_name;
        row.insertCell(2).textContent = benchmark.accuracy_top1 + "%";
        row.insertCell(3).textContent = benchmark.accuracy_top5 + "%";
        row.insertCell(4).textContent = benchmark.memory_usage + "MB";
        row.insertCell(5).textContent = benchmark.inference_time + "ms";
        row.insertCell(6).textContent = benchmark.npu_layers;

        i++;
    }
}

var ctx;
let chart;

document.addEventListener("DOMContentLoaded", function () {
    ctx = document.getElementById('leaderboardChart').getContext('2d');



    const chartContainer = document.getElementById("leaderboardChart").parentElement;
    chartContainer.insertBefore(recreateChartBtn, ctx.canvas);

    recreateChartBtn.addEventListener("click", function () {
        getAllBenchmarks();
        console.log("click")
    });
});

/*function renderChart(benchmarks, mode = "top3") {
    let displayedData = []; //: benchmarks.benchmark.slice(0, 3);
    let i = 0

    for (let benchmark of benchmarks.benchmarks) {
        i++;
        displayedData.push(benchmark.accuracy_top1);
        if (i >= 3) {
            break;
        }
    }

    console.log(displayedData)

    console.log(benchmarks[0])

    if (chart) {
        chart.destroy();
    }

    const colors = window.getChartColors();

    chart = new Chart(ctx, {
        type: window.getChartType(),
        data: {
            //labels: displayedData.map(d => d.model),
            datasets: [{
                label: sort,
                data: displayedData,
                backgroundColor: colors.slice(0, displayedData.length),
                borderWidth: 0,
                borderRadius: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, // Allows height scaling
            layout: {
                padding: {
                    top: 30,
                    bottom: 30
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMax: 1 // Adjust as needed
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            if (sort === "inference_time") {
                                return `${value} ms`;
                            } else if (sort === "memory_usage") {
                                return `${value} MB`;
                            }
                            return `${value}%`;
                        }
                    }
                }
            }
        }
    });

}*/

async function renderChart(benchmarks) {
    let displayedData = [];
    let model_names = [];
    let i = 0;
    let suggestedMin = 0;
    let mode = "";

    for (let benchmark of benchmarks.benchmarks) {
        i++;
        switch (sort) {
            case "inference_time":
                displayedData.push(benchmark.inference_time);
                mode = "Inference Time";
                break;
            case "accuracy_top1":
                displayedData.push(benchmark.accuracy_top1);
                mode = "Accuracy Top 1";
                break;
            case "accuracy_top5":
                displayedData.push(benchmark.accuracy_top5);
                mode = "Accuracy Top 5";
                break;
            case "memory_usage":
                displayedData.push(benchmark.memory_usage);
                mode = "Memory Usage";
                break;
        }
        const model = await api.read_model(benchmark.model_id);
        model_names.push(model.model_name);
        if (i >= 3) {
            break;
        }
    }

    if (sort == "accuracy_top1" || sort == "accuracy_top5") {
        suggestedMin = displayedData[displayedData.length - 1] - (displayedData[displayedData.length - 1] % 10)
    }

    if (chart) {
        chart.destroy();
    }

    const colors = window.getChartColors();

    const labels = model_names;

    chart = new Chart(ctx, {
        type: window.getChartType(),
        data: {
            labels: labels,
            datasets: [{
                label: mode,
                data: displayedData,
                backgroundColor: colors.slice(0, displayedData.length),
                borderWidth: 0,
                borderRadius: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 30,
                    bottom: 30
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMax: .5,
                    suggestedMin: suggestedMin,
                }
            },
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        boxWidth: 20
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            if (sort === "inference_time") {
                                return `${value} ms`;
                            } else if (sort === "memory_usage") {
                                return `${value} MB`;
                            }
                            return `${value}%`;
                        }
                    }
                }
            }
        }
    });
}




