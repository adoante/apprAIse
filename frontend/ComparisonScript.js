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

	const model_names = []

	function getModelNames(id, idx) {
		document.getElementById(id).addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
				model_names[idx] = event.target.textContent
				console.log(model_names)
			}
		});
	}

	getModelNames("dropdown-content-model-1", 0)
	getModelNames("dropdown-content-model-2", 1)
	getModelNames("dropdown-content-model-3", 2)

	const device_names = []

	function getDeviceNames(id, idx) {
		document.getElementById(id).addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
				device_names[idx] = event.target.textContent
				console.log(device_names)
				getBenchmarks()
			}
		});
	}

	getDeviceNames("dropdown-content-device-1", 0)
	getDeviceNames("dropdown-content-device-2", 1)
	getDeviceNames("dropdown-content-device-3", 2)

	const library_names = []

	function getLibraryNames(id, idx) {
		document.getElementById(id).addEventListener("click", function (event) {
			if (event.target.classList.contains("dropdownItem")) {
				console.log(event.target.textContent + " clicked!");
				library_names[idx] = event.target.textContent
				console.log(library_names)
				getBenchmarks()
			}
		});
	}

	getLibraryNames("dropdown-content-library-1", 0)
	getLibraryNames("dropdown-content-library-2", 1)
	getLibraryNames("dropdown-content-library-3", 2)

	const accuracy_top1_scores = {}
	const accuracy_top5_scores = {}
	const inference_times = {}
	const memory_usage = {}

	function getBenchmarks() {
		if (model_names.length != 0) {
			if (library_names.length == device_names.length) {
				for (let i = 0; i < library_names.length; i++) {
					if (library_names[i] != "" && device_names[i] != "") {
						api.filter_benchmarks(device_names[i], library_names[i])
							.then(benchmarkData => {
								benchmarkData["benchmarks"].forEach(benchmark => {
									api.read_model(benchmark["model_id"]).then(
										modelData => {
											if (model_names.includes(modelData["model_name"])) {
												accuracy_top1_scores[modelData["model_name"]] = benchmark["accuracy_top1"]
												accuracy_top5_scores[modelData["model_name"]] = benchmark["accuracy_top5"]
												inference_times[modelData["model_name"]] = benchmark["inference_time"]
												memory_usage[modelData["model_name"]] = benchmark["memory_usage"]
											}
										}
									)
								})
							})
					}
				}
			}
		}
	}

	let accuracyTop1Chart;
	let accuracyTop5Chart;
	let inferenceTimeChart;
	let memoryUsageChart;

	function constructAccuracyTop1Chart() {
		if (accuracyTop1Chart) {
			accuracyTop1Chart.destroy();
		}

		const ctx = document.getElementById('accuracyTop1Chart');

		accuracyTop1Chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys(accuracy_top1_scores),
				datasets: [{
					label: 'Accuracy Top 1',
					data: Object.values(accuracy_top1_scores),
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
	}

	function constructAccuracyTop5Chart() {
		if (accuracyTop5Chart) {
			accuracyTop5Chart.destroy();
		}

		const ctx = document.getElementById('accuracyTop5Chart');

		accuracyTop5Chart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys(accuracy_top5_scores),
				datasets: [{
					label: 'Accuracy Top 5',
					data: Object.values(accuracy_top5_scores),
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
	}

	function constructInferenceTimeChart() {
		if (inferenceTimeChart) {
			inferenceTimeChart.destroy();
		}

		const ctx = document.getElementById('inferenceTimeChart');

		inferenceTimeChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys(inference_times),
				datasets: [{
					label: 'Inference Time',
					data: Object.values(inference_times),
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
	}

	function constructMemoryUsageChart() {
		if (memoryUsageChart) {
			memoryUsageChart.destroy();
		}

		const ctx = document.getElementById('memoryUsageChart');

		memoryUsageChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: Object.keys(memory_usage),
				datasets: [{
					label: 'Accuracy Top 1',
					data: Object.values(memory_usage),
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
	}

	document.querySelector(".ChartBtn").addEventListener("click", function (event) {
		constructAccuracyTop1Chart()
		constructAccuracyTop5Chart()
		constructInferenceTimeChart()
		constructMemoryUsageChart()
	});
});