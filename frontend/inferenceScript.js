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
		document.getElementById("classAndLabel").textContent = `Class Index: ${results["predicted_class"]} - Predicted Label: ${results["predicted_label"]}`
		inferenceResultsChart = displayResults(
			results["top5_labels"],
			results["top5_probabilities"],
			"Inference Results %",
			inferenceResultsChart
		);
	} catch (error) {
		console.error("Inference failed:", error);
		document.querySelector(".inferenceContainer").insertAdjacentHTML(
			"afterbegin",
			`<div class="customAlert" style="background:#6F9CDE;">
			Most likely you need to login. 😀
			<div>`,
		);
		
		document.querySelector(".inferenceContainer").insertAdjacentHTML(
			"afterbegin",
			`<div class="customAlert" style="background:red;">
			${error["message"]}<br>
			<div>`,
		);

		document.querySelector(".inferenceContainer").insertAdjacentHTML(
			"afterbegin",
			`<div class="customAlert">Redirecting in <span id="redirectCountdown2">10</span> seconds...<div>`,
		);

		let seconds = 10;
		const countdownEl = document.getElementById('redirectCountdown2');

		const interval = setInterval(() => {
			seconds--;
			countdownEl.textContent = seconds;

			if (seconds === 0) {
				clearInterval(interval);
				window.location.href = "Login.html"; // Change to your target URL
			}
		}, 1000);
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
