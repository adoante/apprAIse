import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
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


});

function dropDownSelect(id) {
    console.log(id.textContent);
}


