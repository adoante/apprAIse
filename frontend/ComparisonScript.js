import api from './js/modules/api_wrapper.js';

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

	/* Populate models, devices, libraries dropdowns dynamically*/
	api.filter_models().then(data => {
		data["models"].forEach(model => {
			document.querySelectorAll(".dropdown-content-model").forEach(modelDropdown => {
				modelDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${model["model_name"]}</p>`,
				);
			})
		})
	})

	api.filter_devices().then(data => {
		data["devices"].forEach(device => {
			document.querySelectorAll(".dropdown-content-device").forEach(deviceDropdown => {
				deviceDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${device["device_name"]}</p>`,
				);
			})
		})
	})

	api.filter_libraries().then(data => {
		data["libraries"].forEach(library => {
			document.querySelectorAll(".dropdown-content-library").forEach(libraryDropdown => {
				libraryDropdown.insertAdjacentHTML(
					"afterbegin",
					`<p class="dropdownItem">${library["library_name"]}</p>`,
				);
			})
		})
	})

	/* Construct Individual Charts */

	let chart_labels = ["", "", ""]
	let top1 = [0, 0, 0]
	let top5 = [0, 0, 0]
	let inference = [0, 0, 0]
	let memory = [0, 0, 0]

	let top1Chart;
	let top5Chart;
	let inferenceChart;
	let memoryChart;

	let model_1 = {
		"name": "",
		"device": "",
		"library": ""
	}

	function updateMetricCard() {
		top1.forEach(top1_score => {
			document.getElementById("top1Metrics").insertAdjacentHTML(
				"afterbegin",
				`<div class="metricCard"><p>${top1_score}%</p></div>`
			)
		})
	}

	document.getElementById("dropdown-content-model-1").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_1["name"] = event.target.textContent

			getBenchmarkData(model_1).then(data => {
				chart_labels[0] = model_1["name"]
				if (data[0] !== undefined) {
					top1[0] = data[0]["accuracy_top1"]
					top5[0] = data[0]["accuracy_top5"]
					inference[0] = data[0]["inference_time"]
					memory[0] = data[0]["memory_usage"]
				} else {
					top1[0] = 0
					top5[0] = 0
					inference[0] = 0
					memory[0] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)

				updateMetricCard()
			})
		}
	});

	document.getElementById("dropdown-content-device-1").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_1["device"] = event.target.textContent
			getBenchmarkData(model_1).then(data => {
				chart_labels[0] = model_1["name"]
				if (data[0] !== undefined) {
					top1[0] = data[0]["accuracy_top1"]
					top5[0] = data[0]["accuracy_top5"]
					inference[0] = data[0]["inference_time"]
					memory[0] = data[0]["memory_usage"]
				} else {
					top1[0] = 0
					top5[0] = 0
					inference[0] = 0
					memory[0] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	document.getElementById("dropdown-content-library-1").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_1["library"] = event.target.textContent
			getBenchmarkData(model_1).then(data => {
				chart_labels[0] = model_1["name"]
				if (data[0] !== undefined) {
					top1[0] = data[0]["accuracy_top1"]
					top5[0] = data[0]["accuracy_top5"]
					inference[0] = data[0]["inference_time"]
					memory[0] = data[0]["memory_usage"]
				} else {
					top1[0] = 0
					top5[0] = 0
					inference[0] = 0
					memory[0] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	let model_2 = {
		"name": "",
		"device": "",
		"library": ""
	}

	document.getElementById("dropdown-content-model-2").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_2["name"] = event.target.textContent
			getBenchmarkData(model_2).then(data => {
				chart_labels[1] = model_2["name"]
				if (data[0] !== undefined) {
					top1[1] = data[0]["accuracy_top1"]
					top5[1] = data[0]["accuracy_top5"]
					inference[1] = data[0]["inference_time"]
					memory[1] = data[0]["memory_usage"]
				} else {
					top1[1] = 0
					top5[1] = 0
					inference[1] = 0
					memory[1] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	document.getElementById("dropdown-content-device-2").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_2["device"] = event.target.textContent
			getBenchmarkData(model_2).then(data => {
				chart_labels[1] = model_2["name"]
				if (data[0] !== undefined) {
					top1[1] = data[0]["accuracy_top1"]
					top5[1] = data[0]["accuracy_top5"]
					inference[1] = data[0]["inference_time"]
					memory[1] = data[0]["memory_usage"]
				} else {
					top1[1] = 0
					top5[1] = 0
					inference[1] = 0
					memory[1] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	document.getElementById("dropdown-content-library-2").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_2["library"] = event.target.textContent
			getBenchmarkData(model_2).then(data => {
				chart_labels[1] = model_2["name"]
				if (data[0] !== undefined) {
					top1[1] = data[0]["accuracy_top1"]
					top5[1] = data[0]["accuracy_top5"]
					inference[1] = data[0]["inference_time"]
					memory[1] = data[0]["memory_usage"]
				} else {
					top1[1] = 0
					top5[1] = 0
					inference[1] = 0
					memory[1] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	let model_3 = {
		"name": "",
		"device": "",
		"library": ""
	}

	document.getElementById("dropdown-content-model-3").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_3["name"] = event.target.textContent
			getBenchmarkData(model_3).then(data => {
				chart_labels[2] = model_3["name"]
				if (data[0] !== undefined) {
					top1[2] = data[0]["accuracy_top1"]
					top5[2] = data[0]["accuracy_top5"]
					inference[2] = data[0]["inference_time"]
					memory[2] = data[0]["memory_usage"]
				} else {
					top1[2] = 0
					top5[2] = 0
					inference[2] = 0
					memory[2] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	document.getElementById("dropdown-content-device-3").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_3["device"] = event.target.textContent
			getBenchmarkData(model_3).then(data => {
				chart_labels[2] = model_3["name"]
				if (data[0] !== undefined) {
					top1[2] = data[0]["accuracy_top1"]
					top5[2] = data[0]["accuracy_top5"]
					inference[2] = data[0]["inference_time"]
					memory[2] = data[0]["memory_usage"]

				} else {
					top1[2] = 0
					top5[2] = 0
					inference[2] = 0
					memory[2] = 0
				}

				top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
				top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
				inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
				memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
			})
		}
	});

	document.getElementById("dropdown-content-library-3").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			console.log(event.target.textContent + " clicked!");
			model_3["library"] = event.target.textContent
			getBenchmarkData(model_3).then(data => {
				chart_labels[2] = model_3["name"]
				if (data[0] !== undefined) {
					top1[2] = data[0]["accuracy_top1"]
					top5[2] = data[0]["accuracy_top5"]
					inference[2] = data[0]["inference_time"]
					memory[2] = data[0]["memory_usage"]

					top1Chart = constructChart(chart_labels, top1, "accuracyTop1Chart", "Accuracy Top 1", top1Chart)
					top5Chart = constructChart(chart_labels, top5, "accuracyTop5Chart", "Accuracy Top 5", top5Chart)
					inferenceChart = constructChart(chart_labels, inference, "inferenceTimeChart", "Inference Time", inferenceChart)
					memoryChart = constructChart(chart_labels, memory, "memoryUsageChart", "Memory Usage", memoryChart)
				}
			})
		}
	});

	async function getBenchmarkData(model) {
		const benchmarkData = await api.filter_benchmarks(model["device"], model["library"]);

		const modelData = (await Promise.all(benchmarkData["benchmarks"].map(async (benchmark) => {
			let model_name = await api.read_model(benchmark["model_id"]);
			return model_name["model_name"] === model["name"] ? benchmark : null;
		}))).filter(Boolean);  // Removes null values

		return modelData
	}

	function constructChart(chart_labels, metric, chart_id, chart_label, chart) {
		if (chart) {
			chart.destroy()
		}

		console.log(metric)

		const ctx = document.getElementById(chart_id);

		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: chart_labels,
				datasets: [{
					label: chart_label,
					data: metric,
					borderWidth: 1
				}]
			},
			options: {
				scales: {
					y: {
						beginAtZero: true
					}
				}
			}
		});

		return chart;
	}
});