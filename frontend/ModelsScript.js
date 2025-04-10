import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
    
    let selectedDevice = "";
    let selectedLibrary = "";
    let selectedQuantize = "";
    let quantized = false;
    let floatingPoint = false;

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
        }else if (parentDropdown.id === "quantizedDropdown") {
            selectedQuantize = value;
        }

        console.log("Device selected:", selectedDevice);
        console.log("Library selected:", selectedLibrary);
        console.log("Quantized selected:", selectedQuantize);

        if (selectedDevice || selectedLibrary) {
            fetchBenchmarkData();
        }

        if(selectedQuantize){
            quantizedOrNot();
        }
    }

    

    function quantizedOrNot(){
        if(selectedQuantize == "Quantized"){
            floatingPoint = false;
            quantized = true;
        }else if(selectedQuantize == "All"){
            floatingPoint = false;
            quantized = false;
        }else{
            floatingPoint = true;
            quantized = false;
        }
        filterModelsBySearch();
    }

    
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

    // Fetch models and create HTML elements for each model
    api.filter_models().then(data => {
        const modelsContainer = document.querySelector(".models"); // Select the container div
        let i = -1
        data["models"].forEach(model => {

            console.log(model["model_name"])
            let color = "pink"
            console.log(color)

            switch (++i) {
                case 0:
                    color = "blue";
                    break;
                case 1:
                    color = "green";
                    break;
                case 2:
                    color = "pink";
                    break;
                case 3:
                    color = "purple";
                    break;
                case 4:
                    color = "red";
                    break;
                case 5:
                    color = "orange";
                    i = -1
                    break;
            }

            console.log(color)
            // Create the anchor element
            const modelLink = document.createElement("a");
            modelLink.classList.add("modelLink")
            modelLink.href = `ExampleModel.html?info=${encodeURIComponent(model["model_name"])}`;

            // Create the model div
            console.log(color)
            const modelElement = document.createElement("div");
            modelElement.classList.add("model", color);

            // Create the color div
            const modelColor = document.createElement("div");
            modelColor.classList.add("modelColor", color);

            // Create the image element
            console.log(model["model_img"])
            const modelImg = document.createElement("img");
            modelImg.classList.add("modelImg");
            modelImg.src = model["model_img"]; // You may want this to come from `model`
            modelImg.alt = "";

            // Create the title paragraph
            const modelTitle = document.createElement("p");
            modelTitle.classList.add("modelTitle");
            modelTitle.textContent = model["model_name"];

            // Create the description paragraph
            const modelDes = document.createElement("p");
            modelDes.classList.add("modelDes");
            modelDes.textContent = "Imagenet classifier and general purpose backbone."; // You might want to change this dynamically

            // Append all elements inside the model div
            modelElement.appendChild(modelColor);
            modelElement.appendChild(modelImg);
            modelElement.appendChild(modelTitle);
            modelElement.appendChild(modelDes);

            // Append model div inside the anchor element
            modelLink.appendChild(modelElement);

            // Append the whole structure inside the models container
            modelsContainer.appendChild(modelLink);
        });
    });


    let originalOrder = [];  // Store the original order of models

    window.filterModelsBySearch = function() {
        const searchQuery = document.getElementById('modelSearch').value.toLowerCase();

        // Select all model elements within the models container
        const models = document.querySelectorAll('.models .modelLink');

        // Save the original order of models if it's not done yet
        if (originalOrder.length === 0) {
            originalOrder = Array.from(models);  // Save the initial order when the page loads
        }


        const modelsContainer = document.querySelector(".models");

        // Always re-order models in their original order
        modelsContainer.innerHTML = "";  // Clear the container

        // show all models in their original order
        originalOrder.forEach(model => {
            model.style.display = '';  // Ensure all models are visible
            modelsContainer.appendChild(model);  // Re-append the models in their original order
        });
        
        // Otherwise, filter models that match the search query
        const matched = [];
        const unmatched = [];

        // Loop over all models and separate them into matched and unmatched
        originalOrder.forEach((model) => {
            const modelName = model.querySelector(".modelTitle").textContent.toLowerCase();
            if(quantized){
                if (modelName.includes(searchQuery) && modelName.includes("quantized")) {
                    matched.push(model);  // Add to matched if it matches the query
                } else {
                    unmatched.push(model);  // Otherwise, add to unmatched
                }
            }else if(floatingPoint){
                if (modelName.includes(searchQuery) && !modelName.includes("quantized")) {
                    matched.push(model);  // Add to matched if it matches the query
                } else {
                    unmatched.push(model);  // Otherwise, add to unmatched
                }
            }else{
                if (modelName.includes(searchQuery)) {
                    matched.push(model);  // Add to matched if it matches the query
                } else {
                    unmatched.push(model);  // Otherwise, add to unmatched
                }
            }
        });

        // Hide unmatched models
        unmatched.forEach(model => {
            model.style.display = 'none';  // Hide models that don't match the query
        });

        // If no models match, display a "no results" message
        if (matched.length === 0) {
            modelsContainer.innerHTML = "<p>No models found matching your search.</p>";
        }
    }

    // Add event listener to the search bar
    //document.getElementById('modelSearch').addEventListener('input', filterModelsBySearch);

    async function fetchBenchmarkData(){
        const benchmarks = await api.filter_benchmarks("ONNX","Sam");
        console.log(benchmarks);
    }

    //const benchmarks = await api.filter_benchmarks(device, library, sort, order);


    document.querySelectorAll(".dropdownItem").forEach(item => {
        item.addEventListener("click", function () {
            dropDownSelect(item);
        });
    });

});
