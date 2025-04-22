import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
    dataGrabAndFill();
});

async function dataGrabAndFill() {
    const models = await api.filter_models();
    populateTable(models.models);
}

async function populateTable(models) {
    const tableBody = document.querySelector("#ModelLinksTable tbody");
    tableBody.innerHTML = "";
    
    // Make sure the models is an array and iterate over it
    for (let model of models) {
        let row = tableBody.insertRow();  // Create a new row
        // Insert data into each cell of the row
        row.insertCell(0).textContent = model.model_name || 'Unknown';  // Model Name
        row.insertCell(1).innerHTML = `<a href="${model.qai_hub_link}" target="_blank">QAI Hub</a>` || 'N/A';  // QAI Hub link
        row.insertCell(2).innerHTML = `<a href="${model.github_link}" target="_blank">GitHub</a>` || 'N/A';  // GitHub link
        row.insertCell(3).innerHTML = `<a href="${model.hugging_face_link}" target="_blank">Hugging Face</a>` || 'N/A';  // Hugging Face link
        row.insertCell(4).innerHTML = `<a href="${model.paper_link}" target="_blank">Paper</a>` || 'N/A';  // Paper link
    }
}
