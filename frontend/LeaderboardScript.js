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
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdownItem").forEach(button=>{
        button.addEventListener("click", function(event){
            dropDownSelect("Hi2")
        })
    });
});

async function dropDownSelect(id) {
    try {
            const device = "";
            const library = "";
            const sort = "accuracy_top1";
            const order = "desc"; // or "asc"
    
            const benchmarks =  await api.filter_benchmarks(device, library, sort, order);
            console.log("All Benchmarks:", JSON.stringify(benchmarks));
            console.log(benchmarks.benchmarks[0].accuracy_top1);
            console.log(benchmarks.benchmarks[1].accuracy_top1);

            populateTable(benchmarks)
        } catch (error) {
            console.error("Error fetching all benchmarks:", error);
        }
       console.log(id);
}


function populateTable(benchmarks){
    const tableBody = document.querySelector("#Leaderboard tbody");
    tableBody.innerHTML = "";
    let i = 1;

    benchmarks.benchmarks.forEach(benchmarks =>{
        let row = tableBody.insertRow();
        
        row.insertCell(0).textContent = i;
        row.insertCell(1).textContent = "TempName"
        row.insertCell(2).textContent = benchmarks.accuracy_top1+"%";
        row.insertCell(3).textContent = benchmarks.memory_usage+"MB";
        row.insertCell(4).textContent = benchmarks.inference_time+"ms"
        i++;
    });
}