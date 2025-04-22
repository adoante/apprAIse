import api from './js/modules/api_wrapper.js'; // Adjust path if needed

document.addEventListener("DOMContentLoaded", function () {
	/* Matthew's dropdown stuff*/
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

	const uploadInput = document.getElementById("imageUpload");
	const loader = document.getElementById("loader");
	let inferenceResultsChart;
	let model_file;
	let device;
	let library;

	document.getElementById("models").addEventListener("click", function (event) {
		model_file = event.target.textContent
		this.parentElement.parentElement.querySelectorAll(".dropdown-btn")[0].textContent = model_file
	})

	document.getElementById("libraries").addEventListener("click", function (event) {
		library = event.target.textContent
		this.parentElement.parentElement.querySelectorAll(".dropdown-btn")[1].textContent = library
	})

	document.getElementById("devices").addEventListener("click", function (event) {
		device = event.target.textContent
		this.parentElement.parentElement.querySelectorAll(".dropdown-btn")[2].textContent = device
	})

	uploadInput.addEventListener("change", async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		// Show preview
		const reader = new FileReader();
		reader.onload = function (e) {
			const preview = document.getElementById("imagePreview");
			preview.src = e.target.result;

			if(inferenceResultsChart) {
				inferenceResultsChart.destroy()
			}

			const token = localStorage.getItem("access_token");

			if (!token) {

				document.querySelector(".inferenceContainer").insertAdjacentHTML(
					"afterbegin",
					`<div class="customAlert">Redirecting in <span id="redirectCountdown">5</span> seconds...<div>`,
				);

				let seconds = 5;
				const countdownEl = document.getElementById('redirectCountdown');

				const interval = setInterval(() => {
					seconds--;
					countdownEl.textContent = seconds;

					if (seconds === 0) {
						clearInterval(interval);
						window.location.href = "Login.html";
					}
				}, 1000);
			}
		};
		reader.readAsDataURL(file);

		try {
			loader.style.display = "block"; // Show spinner

			const results = await api.run_inference(file, model_file, device, library);
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
				`<div class="customAlert" style="background:red;">
			${error["message"]}<br>
			<div>`,
			);

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

			},
		});

		return chart;
	}
});
