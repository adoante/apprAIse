import api from './js/modules/api_wrapper.js';

document.addEventListener("DOMContentLoaded", function () {
	/* Matthew's dropdown stuff*/
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

	// Logout button
	document.getElementById("logout").addEventListener("click", function () {
		localStorage.removeItem("access_token");
		window.location.replace("index.html");
	})

	const sidebarWidth = document.querySelector(".dashboardSidebar").offsetWidth;
	document.querySelector(".dashboardContent").style.marginLeft = `${sidebarWidth}px`;

	// Select Content
	document.getElementById("accountDropdown").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			let content = event.target.textContent;
			let contentContainer = document.querySelector(".dashboardContent")

			contentContainer.innerHTML =
				`<div class="pageTitle">
				<h1 class="title">Dashboard</h1>
			</div> <!--Content Insert Here-->`;

			switch (content) {
				case "Username":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`<div class="dashboardForm">
								<h2>Change Username</h2>
								<p>Current Username: ${data["user_name"]}</p>
								<form class="formContainer" id="username">
									<label for="username">Username</label>
									<input type="text" id="username" name="username" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)
						})

					break;
				case "Firstname":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`<div class="dashboardForm">
								<h2>Change Firstname</h2>
								<p>Current Firstname: ${data["first_name"]}</p>
								<form class="formContainer" id="firstname">
									<label for="firstname">Firstname</label>
									<input type="text" id="firstname" name="firstname" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)
						})
					break;
				case "Lastname":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`<div class="dashboardForm">
								<h2>Change Lastname</h2>
								<p>Current Lastname: ${data["last_name"]}</p>
								<form class="formContainer" id="lastname">
									<label for="lastname">Lastname</label>
									<input type="text" id="Lastname" name="lastname" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)
						})
					break;
				case "Email":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`<div class="dashboardForm">
								<h2>Change Email</h2>
								<p>Current Email: ${data["email"]}</p>
								<form class="formContainer" id="email">
									<label for="email">Email</label>
									<input type="text" id="email" name="email" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)
						})
					break;
				case "QAI Hub Token":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`<div class="dashboardForm">
								<h2>Change QAI Hub Token</h2>
								<p>Current QAI Hub Token: ${data["qai_hub_api_token"]}</p>
								<form class="formContainer" id="qai-hub-token">
									<label for="qai-hub-token">QAI Hub Token</label>
									<input type="text" id="qai-hub-token" name="qai-hub-token" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)
						})
					break;
				case "Password":
					console.log(content)
					break;
				case "Disable Account":
					console.log(content)
					break;
			}
		}
	})

	// Update user data

	const observer = new MutationObserver((mutationsList, observer) => {
		const usernameForm = document.querySelector("#username"); // or `.myForm`
		if (usernameForm) {
		  console.log("Form is now in the DOM!");
		}

		const firstnameForm = document.querySelector("#firstname"); // or `.myForm`
		if (firstnameForm) {
		  console.log("Form is now in the DOM!");
		}

		const lastnameForm = document.querySelector("#lastname"); // or `.myForm`
		if (lastnameForm) {
		  console.log("Form is now in the DOM!");
		}

		const emailForm = document.querySelector("#email"); // or `.myForm`
		if (emailForm) {
		  console.log("Form is now in the DOM!");
		}

		const qaiHubTokenForm = document.querySelector("#qai-hub-token"); // or `.myForm`
		if (qaiHubTokenForm) {
		  console.log("Form is now in the DOM!");
		}
	  });
	  
	  observer.observe(document.body, { childList: true, subtree: true });
});