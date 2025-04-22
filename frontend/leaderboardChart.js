import api from './js/modules/api_wrapper.js';

var ctx;
var suggestedMax = 1;
var startAtZero = false;

document.addEventListener("DOMContentLoaded", function () {
    ctx = document.getElementById('leaderboardChart').getContext('2d');



    const chartContainer = document.getElementById("leaderboardChart").parentElement;
    chartContainer.insertBefore(recreateChartBtn, ctx.canvas);

    recreateChartBtn.addEventListener("click", function () {
        getAllBenchmarks();
        console.log("click")
    });
});

let chart;
let fetchedData = [];

async function getAllBenchmarks(selectedMetric = "accuracy_top1") {
    try {
        var order //= selectedMetric === "inference_time" ? "asc" : "desc";
        if(selectedMetric == "inference_time"){
            order = "asc"
        }else if(selectedMetric == "memory_usage"){
            order = "asc"
        }else if(selectedMetric == "accuracy_top1"){
            order = "desc"
        }else{
            order = "desc"
        }

        console.log(order)



        const response = await fetch(`${api.baseURL}/benchmark/?sort=${selectedMetric}&order=${order}`);
        const data = await response.json();
        console.log(response)
        console.log("Fetched Benchmarks:", data);

        let benchmarksData = data.benchmarks || [];

        let uniqueModels = {};
        benchmarksData.forEach(b => {
            if (!uniqueModels[b.model_id] || uniqueModels[b.model_id][selectedMetric] < b[selectedMetric]) {
                uniqueModels[b.model_id] = b;
            }
        });

        console.log(uniqueModels);

        let sortedData = Object.values(uniqueModels).sort((a, b) => {
            return selectedMetric === "inference_time"
                ? a[selectedMetric] - b[selectedMetric]
                : b[selectedMetric] - a[selectedMetric];
        });

        console.log(sortedData)

        fetchedData = await Promise.all(sortedData.slice(0, 3).map(async (b, index) => {
            const modelData = await api.read_model(b.model_id);
            return {
                model: modelData.model_name,
                score: b[selectedMetric],
            };
        }));

        let currentViewMode = document.getElementById("viewMode").value;
        renderChart(currentViewMode);

    } catch (error) {
        console.error("Error fetching all benchmarks:", error);
    }
}

function renderChart(mode = "top3") {
    let selectedMetric = document.getElementById("metricSelector").value;
    let displayedData = mode === "top1" ? [fetchedData[0]] : fetchedData.slice(0, 3);

    if (chart) {
        chart.destroy();
    }

    const colors = window.getChartColors();


    /*chart = new Chart(ctx, {
        type: window.getChartType(),
        data: {
            labels: displayedData.map(d => d.model),
            datasets: [{
                label: document.getElementById("metricSelector").selectedOptions[0].text,
                data: displayedData.map(d => d.score),
                backgroundColor: colors.slice(0, displayedData.length),
                borderWidth: 0,
                borderRadius: 15
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            let value = tooltipItem.raw;
                            if (selectedMetric === "inference_time") {
                                return `${value} ms`;
                            } else if (selectedMetric === "memory_usage") {
                                return `${value} MB`;
                            }
                            return `${value}%`;
                        }
                    }
                }
            },
            layout: { padding: { top: 30, bottom: 30 } }
        }
    });*/

    chart = new Chart(ctx, {
        type: window.getChartType(),
        data: {
            labels: displayedData.map(d => d.model),
            datasets: [{
                label: document.getElementById("metricSelector").selectedOptions[0].text,
                data: displayedData.map(d => d.score),
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
                            if (selectedMetric === "inference_time") {
                                return `${value} ms`;
                            } else if (selectedMetric === "memory_usage") {
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

function redirectToCustomization() {
    window.location.href = "Customization.html";
}




getAllBenchmarks();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("metricSelector").addEventListener("change", function () {
        let currentViewMode = document.getElementById("viewMode").value;
        getAllBenchmarks(this.value, currentViewMode);
    });

    document.getElementById("viewMode").addEventListener("change", function () {
        renderChart(this.value);
    });
});
