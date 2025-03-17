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


function dropDownSelect(id) {
    console.log(id.textContent);
}
