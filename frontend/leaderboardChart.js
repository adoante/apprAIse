import api from './js/modules/api_wrapper.js'

var ctx

document.addEventListener("DOMContentLoaded" , function() {
	ctx = document.getElementById('leaderboardChart').getContext('2d');
})


let chart;
let fetchedData = [];

async function getAllBenchmarks(selectedMetric = "accuracy_top1") {
	try {
		const order = selectedMetric === "inference_time" ? "asc" : "desc"; // Sort inference time in ascending order

		// Fetch from the FastAPI backend
		const response = await fetch(`http://127.0.0.1:8000/api/v1/benchmark/?sort=${selectedMetric}&order=${order}`);
		const data = await response.json();

		console.log("Fetched Benchmarks:", data);

		let benchmarksData = data.benchmarks || [];

		// Keep only the highest value for each model based on the selected metric
		let uniqueModels = {};
		benchmarksData.forEach(b => {
			if (!uniqueModels[b.model_id] || uniqueModels[b.model_id][selectedMetric] < b[selectedMetric]) {
				uniqueModels[b.model_id] = b;
			}
		});

		// Convert back to array and sort based on metric
		let sortedData = Object.values(uniqueModels).sort((a, b) => {
			return selectedMetric === "inference_time"
				? a[selectedMetric] - b[selectedMetric]
				: b[selectedMetric] - a[selectedMetric];
		});

		// Take the top 3 models for display
        // Fetch model_name for each model asynchronously
        fetchedData = await Promise.all(sortedData.slice(0, 3).map(async (b, index) => {
            // Fetch model data using the API wrapper
            const modelData = await api.read_model(b.model_id);

            return {
                model: modelData.model_name,
                score: b[selectedMetric],
                color: index === 0 ? "blue" : index === 1 ? "pink" : "orange"
            };
        }));

		// ✅ Get the currently selected view mode (Top 1 or Top 3)
		let currentViewMode = document.getElementById("viewMode").value;

		// ✅ Render chart with the selected view mode
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

	chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: displayedData.map(d => d.model),
			datasets: [{
				label: document.getElementById("metricSelector").selectedOptions[0].text,
				data: displayedData.map(d => d.score),
				backgroundColor: displayedData.map(d => d.color),
				borderWidth: 0,
				borderRadius: 15
			}]
		},
		options: {
			responsive: true,
			indexAxis: 'x',
			scales: {
				y: { display: false, grid: { display: false } },
				x: { display: false, grid: { display: false } }
			},
			plugins: {
				legend: { display: false },
				tooltip: {
					callbacks: {
						label: function (tooltipItem) {
							let value = tooltipItem.raw;
							if (selectedMetric === "inference_time") {
								return `${value} ms`; // Add "ms" without changing value
							} else if (selectedMetric === "memory_usage") {
								return `${value} MB`; // Add "MB" without changing value
							}
							return `${value}%`; // Default format for accuracy
						}
					}
				}
			},
			layout: { padding: { top: 30, bottom: 30 } }
		}
	});
}

// ✅ Fetch data initially
getAllBenchmarks();

// ✅ Listen for metric changes and update leaderboard
document.addEventListener("DOMContentLoaded" , function() {
	document.getElementById("metricSelector").addEventListener("change", function () {
		let currentViewMode = document.getElementById("viewMode").value; // Keep the current view mode
		getAllBenchmarks(this.value, currentViewMode);
	});
});



// ✅ Listen for Top 1 / Top 3 toggle
document.addEventListener("DOMContentLoaded" , function() {
	document.getElementById("viewMode").addEventListener("change", function () {
		renderChart(this.value);
	});
});
