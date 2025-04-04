import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
    // Dropdown logic
    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            let content = this.nextElementSibling;
            let isOpen = content.style.maxHeight;

            document.querySelectorAll(".dropdown-content").forEach(drop => {
                drop.style.maxHeight = null;
            });

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-content").forEach(drop => {
            drop.style.maxHeight = null;
        });
    });

    // Model info logic
    const infoType = getQueryParam('info');
    const contentDiv = document.getElementById('content');
    const shortModelDescDiv = document.getElementById('shortModelDesc')
    const longModelDescDiv = document.getElementById('longModelDesc')
    const modelGithubDiv = document.getElementById('modelGithub');
    const modelHuggingFaceElementDiv = document.getElementById('modelHuggingFace');
    const modelResearchPaperDiv = document.getElementById('modelResearchPaper');
    const modelImageDiv = document.getElementById('modelImage');

    if (contentDiv) {
        if (infoType) {
            api.filter_models().then(data => {
                data["models"].forEach(model => {
                    if (infoType.trim() == model["model_name"]) {
                        document.getElementById("model-checkpoint").innerText += " " + model["model_end_point"];
                        document.getElementById("input-resolution").innerText += " " + model["input_resolution"];
                        document.getElementById("num-parameters").innerText += " " + model["parameters"];
                        document.getElementById("model-inference-time").textContent = model["inference_time"];
                        document.getElementById("model-memory-usage").textContent = model["memory_usage"];
                        document.getElementById("model-layers").textContent = model["layers"];
                        contentDiv.textContent = model["model_name"];
                        shortModelDescDiv.textContent = model["short_desc"];
                        longModelDescDiv.textContent = model["long_desc"];
                        modelGithubDiv.href = model["github_link"];
                        modelHuggingFaceElementDiv.href = model["hugging_face_link"];
                        modelResearchPaperDiv.href = model["research_paper_link"];
                        modelImageDiv.src = model['model_img'];
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

function dropDownSelect(id) {
    console.log(id.textContent);
}
