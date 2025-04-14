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

	// Center Dashboard content
	const sidebarWidth = document.querySelector(".dashboardSidebar").offsetWidth;
	document.querySelector(".dashboardContent").style.marginLeft = `${sidebarWidth}px`;

	// Select Content
	const footer =
		`
		<div class="footer">
			<div class="footerLogo">
				<p class="title"><a class="footerTitle" href="index.html">ApprAIse</a></p>
			</div>
			<div class="footerDescription">Evaluating and comparing <br>Image Classification AI Models</div>
			<div>
				<ul class="footerMenu">
					<li><a class="footerMenuItem" href="Leaderboard.html">Leaderboard</a></li>
					<li><a class="footerMenuItem" href="Models.html">Models</a></li>
					<li><a class="footerMenuItem" href="Comparison.html">Comparison</a></li>
					<li><a class="footerMenuItem" href="About.html">About</a></li>
					<li><a class="footerMenuItem" href="Dashboard.html">Dashboard</a></li>
				</ul>
			</div>
		</div>
		`

	let contentContainer = document.querySelector(".dashboardContent")

	document.getElementById("accountDropdown").addEventListener("click", function (event) {
		if (event.target.classList.contains("dropdownItem")) {
			let content = event.target.textContent;

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

							contentContainer.insertAdjacentHTML("beforeend", footer)
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

							contentContainer.insertAdjacentHTML("beforeend", footer)
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

							contentContainer.insertAdjacentHTML("beforeend", footer)
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
									<input type="email" id="email" name="email" required>
	
										<button class="dashboardBtn" type="submit">Change</button>
								</form>
							</div>`
							)

							contentContainer.insertAdjacentHTML("beforeend", footer)
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

							contentContainer.insertAdjacentHTML("beforeend", footer)
						})
					break;
				case "Password":
					api.get_current_user()
						.then(data => {
							contentContainer.insertAdjacentHTML(
								"beforeend",
								`
								<div style="background: red;" class="formAlert">
									WARNING:<br>
									Currently we do not have plans to implement password recovery.<br>
									Do not forget your password if you for some reason really really<br>
									like your current user name.
								</div>
								<div class="dashboardForm">
									<h2>Change Password</h2>
									<p>Current Password: LMAO JK</p>
									<form class="formContainer" id="password">
										<label for="password">New Password</label>
										<input type="password" type="text" id="password" name="password" required>
		
											<button class="dashboardBtn" type="submit">Change</button>
									</form>
								</div>
								`
							)

							contentContainer.insertAdjacentHTML("beforeend", footer)
						})
					break;
				case "Disable Account":
					api.get_current_user()
						.then(data => {
							let accountStatus = ""

							if (data["disabled"]) {
								accountStatus = "Disabled"
							} else {
								accountStatus = "Active"
							}

							contentContainer.insertAdjacentHTML(
								"beforeend",
								`
							<div style="background: red;" class="formAlert">
								WARNING:<br>
								This basically deletes your account.<br>
								We currently have no method to activate a disabled account.<br>
							</div>

							<div class="dashboardForm">
								<h2>Disable Account</h2>
								<p>Account Status: ${accountStatus}</p>
								<form class="formContainer" id="disable">
									<label for="disable">Type: disable_account</label>
									<input type="text" id="disable" name="disable" required>
	
										<button style="background: red;" class="dashboardBtn" type="submit">Disable Account</button>
								</form>
							</div>
							`
							)

							contentContainer.insertAdjacentHTML("beforeend", footer)
						})
					break;
			}
		}
	})

	// Handle Submits
	document.body.addEventListener("submit", function (e) {
		e.preventDefault();

		const form = e.target;

		const formId = form.id;

		const formData = new FormData(form);
		const fieldName = formData.keys().next().value;
		const fieldValue = formData.get(fieldName);

		if (formId == "disable") {
			if (fieldValue != "disable_account") {
				contentContainer.lastElementChild.insertAdjacentHTML(
					"beforebegin",
					`<div class="formAlert">Wrong Input.</div>`
				);
			} else {
				api.disable_user()
					.then(data => {
						contentContainer.lastElementChild.insertAdjacentHTML(
							"beforebegin",
							`<div class="formAlert">${data["message"]}</div>`
						);

						contentContainer.lastElementChild.insertAdjacentHTML(
							"beforebegin",
							`<div class="formAlert">Redirecting in <span id="redirectCountdown">5</span> seconds...<div>`,
						);

						let seconds = 5;
						const countdownEl = document.getElementById('redirectCountdown');

						const interval = setInterval(() => {
							seconds--;
							countdownEl.textContent = seconds;

							if (seconds === 0) {
								clearInterval(interval);
								localStorage.removeItem("access_token");
								window.location.replace("Login.html");
							}
						}, 1000);
					})
			}
		}

		if (formId != "disable") {
			// Update the user data (common function for all forms)
			api.update_user_data(fieldName, fieldValue)
				.then(data => {
					contentContainer.lastElementChild.insertAdjacentHTML(
						"beforebegin",
						`<div class="formAlert">${data["message"]}</div>`
					);

					if (!data["message"].includes("409") && !data["message"].includes("400")) {
						contentContainer.lastElementChild.insertAdjacentHTML(
							"beforebegin",
							`<div class="formAlert">Redirecting in <span id="redirectCountdown">5</span> seconds...<div>`,
						);

						let seconds = 5;
						const countdownEl = document.getElementById('redirectCountdown');

						const interval = setInterval(() => {
							seconds--;
							countdownEl.textContent = seconds;

							if (seconds === 0) {
								clearInterval(interval);
								localStorage.removeItem("access_token");
								window.location.replace("Login.html");
							}
						}, 1000);

					}
				})
		}

	});
});