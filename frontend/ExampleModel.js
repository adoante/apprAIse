document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-btn").forEach(button => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevents event from bubbling to document

            let content = this.nextElementSibling;
            let isOpen = content.style.maxHeight;

            // Close all dropdowns first
            document.querySelectorAll(".dropdown-content").forEach(drop => {
                drop.style.maxHeight = null;
            });

            // Toggle only the clicked one
            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Close dropdowns if clicking outside
    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-content").forEach(drop => {
            drop.style.maxHeight = null;
        });
    });
});

function dropDownSelect(id) {
    console.log(id.textContent);
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener("DOMContentLoaded", function () {
    const infoType = getQueryParam('info');
    const contentDiv = document.getElementById('content');

    if (contentDiv) {
        if (infoType) {
            contentDiv.textContent = `${infoType}`;
        } else {
            contentDiv.textContent = "No parameter provided.";
        }
    }
});

