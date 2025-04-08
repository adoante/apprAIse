import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
    let selectedDevice = "";
    let selectedLibrary = "";

    function dropDownSelect(item) {
        const selectedText = item.textContent;
        const value = item.getAttribute("data-value");

        const parentDropdown = item.closest('.dropdown');
        const dropdownBtn = parentDropdown.querySelector('.dropdown-btn p');

        dropdownBtn.textContent = selectedText;

        if (parentDropdown.id === "deviceDropdown") {
            selectedDevice = value;
        } else if (parentDropdown.id === "libraryDropdown") {
            selectedLibrary = value;
        }

        console.log("Device selected:", selectedDevice);
        console.log("Library selected:", selectedLibrary);

        if (selectedDevice && selectedLibrary) {
            fetchBenchmarkData();
        }
    }

    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            console.log('Dropdown item clicked:', button);
            event.stopPropagation();
            let content = this.nextElementSibling;
            let isOpen = content.style.maxHeight;
            let arrow = this.querySelector(".arrow");

            document.querySelectorAll(".dropdown-content").forEach(drop => {
                drop.style.maxHeight = null;
                let otherArrow = drop.previousElementSibling.querySelector(".arrow");
                if (otherArrow) otherArrow.classList.remove("rotated");
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (arrow) arrow.classList.add("rotated");
            }
        });
    });

    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-content").forEach(drop => {
            drop.style.maxHeight = null;
        });
    });

    const modelInferenceTimeDiv = document.getElementById('modelInferenceTime');
    const modelMemoryUsageDiv = document.getElementById('modelMemoryUsage');
    const modelComputeUnitsDiv = document.getElementById('modelComputeUnits');

    const fetchBenchmarkData = () => {
        //FIlter benchmarks by device and lbirary
        //Filter models to figure out the right model, and then retrieve the appropriate benchmark
        if (!selectedDevice || !selectedLibrary) {
            console.log("Both device and library must be selected.");
            return;
        }
        console.log("Fetching benchmark data for:", selectedDevice, selectedLibrary);

        // Filter models to find the right one based on the selected device and library
        api.filter_models().then(data => {
            const model = data["models"].find(m => m.model_name === infoType.trim());
            if (model) {
                console.log("Found model:", model);

                api.filter_benchmarks(selectedDevice, selectedLibrary)
                .then(benchmarkData => {
                    const benchmark = benchmarkData["benchmarks"].find(n => n.model_id === model.model_id)
                    if(model.model_id === benchmark.model_id){
                        modelInferenceTimeDiv.textContent = benchmark.inference_time || 'N/A';
                        modelMemoryUsageDiv.textContent = benchmark.memory_usage || 'N/A';
                        modelComputeUnitsDiv.textContent = benchmark.npu_layers || 'N/A';
                    }
                })
                .catch(err => {
                    console.error('Error fetching benchmark data:', err);
                    modelInferenceTimeDiv.textContent = 'Error fetching data';
                    modelMemoryUsageDiv.textContent = '';
                    modelComputeUnitsDiv.textContent = '';
                });
            } else {
                console.log("No model found for the selected device and library.");
            }
        }).catch(err => {
            console.error('Error fetching models:', err);
        });
    };
    document.querySelectorAll(".dropdownItem").forEach(item => {
        item.addEventListener("click", function () {
            dropDownSelect(item);
        });
    });

    const infoType = getQueryParam('info');
    const contentDiv = document.getElementById('content');
    const shortModelDescDiv = document.getElementById('shortModelDesc');
    const longModelDescDiv = document.getElementById('longModelDesc');
    const modelGithubDiv = document.getElementById('modelGithub');
    const modelHuggingFaceElementDiv = document.getElementById('modelHuggingFace');
    const modelResearchPaperDiv = document.getElementById('modelResearchPaper');
    const modelImageDiv = document.getElementById('modelImage');
    const modelqaiHubLink = document.getElementById('modelqaiHublink');

    if (contentDiv) {
        if (infoType) {
            api.filter_models().then(data => {
                data["models"].forEach(model => {
                    if (infoType.trim() === model["model_name"]) {
                        document.getElementById("model-checkpoint").textContent = "Model Checkpoint: " + model["model_end_point"];
                        document.getElementById("input-resolution").textContent = "Input Resolution: " + model["input_resolution"];
                        document.getElementById("num-parameters").textContent = "Number of Parameters: " + model["parameters"] + "M";
                        document.getElementById("model-size").textContent = "Model Size: " + model["model_size"] +"MB";
                        contentDiv.textContent = model["model_name"];
                        shortModelDescDiv.textContent = model["short_desc"];
                        longModelDescDiv.textContent = model["long_desc"];
                        modelGithubDiv.href = model["github_link"];
                        modelHuggingFaceElementDiv.href = model["hugging_face_link"];
                        modelResearchPaperDiv.href = model["research_paper_link"];
                        modelImageDiv.src = model['model_img'];
                        modelqaiHubLink.href = model["qai_hub_link"]
                    }
                });
            });
        } else {
            contentDiv.textContent = "No parameter provided.";
        }
    }
});

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
