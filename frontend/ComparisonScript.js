import api from './js/modules/api_wrapper.js';

const models = await api.filter_models()
const devices = await api.filter_devices()
const libraries = await api.filter_libraries()
console.log(libraries)

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".dropdown-content-model").forEach(model => {
		model.insertAdjacentHTML(
			"afterbegin",
			`<p class="dropdownItem">Model Name 1</p>`,	
		);
	})
});

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
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdownItem").forEach(button=>{
        button.addEventListener("click", function(event){
            /*
			Add a function here that gets called when a dropdown
			option is clicked
			*/
			console.log(this.textContent + " clicked!")
        })
    });
});

