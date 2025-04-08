import api from './js/modules/api_wrapper.js';

var device = "Samsung Galaxy S24";
var library = "tflite";
var sort = "accuracy_top1";
var order = "desc"; // or "asc"

const devices = ["Samsung Galaxy S24", "Google Pixel", "Snapdragon 8 Elite QRD", "Snapdragon X Elite CRD"]
const libraries = ["TFLite", "ONNX", "Qualcomm© AI Engine Direct"]
const sorts = ["Accuracy Top 1", "Accuracy Top 5", "Memory Usage","Inference Time"]

document.addEventListener("DOMContentLoaded", function () {
    dataGrabAndFill()
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
    document.querySelectorAll(".dropdownItem").forEach(button => {
        button.addEventListener("click", function (event) {
            dropDownSelect(button.textContent)
        })
    });
});

async function dropDownSelect(id) {
    try {
        var newDevice = device;
        var newLibrary = library;
        var newSort = sort;
        var newOrder = order; // or "asc"

        if (devices.includes(id)) {
            id = id.toLowerCase()
            newDevice = id
            device = id
        } else if (libraries.includes(id)) {
            id = id.toLowerCase()
            newLibrary = id
            library = id
        } else if (sorts.includes(id)) {
            console.log(id)
            if (id == "Accuracy Top 1") {
                newSort = "accuracy_top1"
                sort = "accuracy_top1"
                order = "desc"
                newOrder = "desc"
            } else if (id == "Accuracy Top 5") {
                newSort = "accuracy_top5"
                sort = "accuracy_top5"
                order = "desc"
                newOrder = "desc"
            } else if (id == "Memory Usage") {
                newSort = "memory_usage"
                sort = "memory_usage"
                order = "asc"
                newOrder = "asc"
            }else if (id == "Inference Time") {
                newSort = "inference_time"
                sort = "inference_time"
                order = "asc"
                newOrder = "asc"
            }
        }

        dataGrabAndFill();
        
    } catch (error) {
        console.error("Error fetching all benchmarks:", error);
    }
}

async function dataGrabAndFill(){
    const benchmarks = await api.filter_benchmarks(device, library, sort, order);
    populateTable(benchmarks);
}


async function populateTable(benchmarks) {
    const tableBody = document.querySelector("#Leaderboard tbody");
    tableBody.innerHTML = "";
    let i = 1;

    // Use a for...of loop to handle async/await correctly
    for (let benchmark of benchmarks.benchmarks) {
        let row = tableBody.insertRow();

        // Assuming api.read_model is an asynchronous function
        const model = await api.read_model(benchmark.model_id);

        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = model.model_name;
        row.insertCell(2).textContent = benchmark.accuracy_top1 + "%";
        row.insertCell(3).textContent = benchmark.accuracy_top5 + "%";
        row.insertCell(4).textContent = benchmark.memory_usage + "MB";
        row.insertCell(5).textContent = benchmark.inference_time + "ms";
        row.insertCell(6).textContent = benchmark.npu_layers;

        i++;
    }
}
