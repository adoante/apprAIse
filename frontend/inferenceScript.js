import api from './js/modules/api_wrapper.js'; // Adjust path if needed

const uploadInput = document.getElementById("imageUpload");
const loader = document.getElementById("loader");
let inferenceResultsChart;

uploadInput.addEventListener("change", async (event) => {
	const file = event.target.files[0];
	if (!file) return;

	// Show preview
	const reader = new FileReader();
	reader.onload = function (e) {
		const preview = document.getElementById("imagePreview");
		preview.src = e.target.result;
	};
	reader.readAsDataURL(file);

	try {
		loader.style.display = "block"; // Show spinner

		const results = await api.run_inference(file);
		inferenceResultsChart = displayResults(
			results["top5_labels"],
			results["top5_probabilities"],
			"Inference Results %",
			inferenceResultsChart
		);
	} catch (error) {
		console.error("Inference failed:", error);
	} finally {
		loader.style.display = "none"; // Hide spinner
	}
});

function displayResults(chart_labels, metric, chart_label, chart) {
	const ctx = document.getElementById("inferenceResults").getContext("2d");

	if (chart) {
		chart.destroy();
	}

	chart = new Chart(ctx, {
		type: window.getChartType(),
		data: {
			labels: chart_labels,
			datasets: [
				{
					label: chart_label,
					data: metric,
					backgroundColor: window.getChartColors(),
					borderWidth: 0,
					borderRadius: 15,
				},
			],
		},
		options: {
			scales: {
				y: { display: false, grid: { display: false } },
			},
		},
	});

	return chart;
}
