// let user = "";

// function home(user) {
// 	if (user.length != 0) {
// 		context.loggedIn = true;
// 	} else {
// 		context.loggedIn = false;
// 	}
// }

function home() {
	fetch(
		"https://module4project-74b81-default-rtdb.firebaseio.com/recipes.json"
	)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			let recipesArray = Object.entries(data);

			console.log(recipesArray);

			recipesArray = recipesArray.map(function (innerArray) {
				let [recipesId, recipesObject] = innerArray;
				recipesObject.id = recipesId;
				return recipesObject;
			});
			console.log(recipesArray);
			let src = document.getElementById("home").innerHTML;
			let template = Handlebars.compile(src);
			let context = { recipesArray };
			let html = template(context);
			render(html);
		})
		.catch((err) => {
			console.log(err);
		});
}

function share() {
	let src = document.getElementById("share").innerHTML;
	let template = Handlebars.compile(src);
	let context = {};
	let html = template(context);
	let categoryImageURL;
	render(html);
	document
		.getElementById("shareButton")
		.addEventListener("click", function (event) {
			console.log("clicked");

			event.preventDefault();
			let meal = document.getElementById("defaultRecepieShareMeal").value;
			let ingredients = document.getElementById(
				"defaultRecepieShareIngredients"
			).value;
			let prepMethod = document.getElementById(
				"defaultRecepieShareMethodOfPreparation"
			).value;
			let description = document.getElementById(
				"defaultRecepieShareDescription"
			).value;
			let foodImageURL = document.getElementById(
				"defaultRecepieShareFoodImageURL"
			).value;
			let category = document.getElementById("recipeCategory").value;

			if (category == "Vegetables and legumes/beans") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg";
			} else if (category == "Grain Food") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg";
			} else if (category == "Fruits") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg";
			} else if (category == "Milk, cheese, eggs and alternatives") {
				categoryImageURL =
					"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg";
			} else if (
				category == "Lean meats and poultry, fish and alternatives"
			) {
				categoryImageURL =
					"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg";
			}

			let data = {
				meal,
				ingredients,
				prepMethod,
				description,
				foodImageURL,
				category,
				categoryImageURL,
			};
			console.log(data);
			console.log(categoryImageURL);
			let url =
				"https://module4project-74b81-default-rtdb.firebaseio.com/recipes.json";
			let headers = {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						console.log("DONE!!");
						window.location.hash = "#home";
					} else {
						console.log(response.status);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
}

function recipes(recipesId) {
	console.log(recipesId);
	fetch(
		`https://module4project-74b81-default-rtdb.firebaseio.com/recipes/${recipesId}.json`
	)
		.then(function (response) {
			console.log(response);
			return response.json();
		})
		.then(function (data) {
			console.log(data);

			let recipesDetails = data;

			let src = document.getElementById("recipes").innerHTML;
			let template = Handlebars.compile(src);
			let context = recipesDetails;
			let html = template(context);
			render(html);
		})
		.catch((err) => {
			console.log(err);
		});
}

function edit(recipesId) {
	let src = document.getElementById("edit").innerHTML;
	let template = Handlebars.compile(src);
	let context = {};
	let html = template(context);
	let categoryImageURL;
	render(html);
	document
		.getElementById("editButton")
		.addEventListener("click", function (event) {
			console.log("clicked");

			event.preventDefault();
			let meal = document.getElementById("defaultRecepieEditMeal").value;
			let ingredients = document.getElementById(
				"defaultRecepieEditIngredients"
			).value;
			let prepMethod = document.getElementById(
				"defaultRecepieEditMethodOfPreparation"
			).value;
			let description = document.getElementById(
				"defaultRecepieEditDescription"
			).value;
			let foodImageURL = document.getElementById(
				"defaultRecepieEditFoodImageURL"
			).value;
			let category = document.getElementById("editCategory").value;

			if (category == "Vegetables and legumes/beans") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg";
			} else if (category == "Grain Food") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg";
			} else if (category == "Fruits") {
				categoryImageURL =
					"https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg";
			} else if (category == "Milk, cheese, eggs and alternatives") {
				categoryImageURL =
					"https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg";
			} else if (
				category == "Lean meats and poultry, fish and alternatives"
			) {
				categoryImageURL =
					"https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg";
			}

			let data = {
				meal,
				ingredients,
				prepMethod,
				description,
				foodImageURL,
				category,
				categoryImageURL,
			};
			console.log(data);
			console.log(categoryImageURL);
			let url = `https://module4project-74b81-default-rtdb.firebaseio.com/recipes/${recipesId}.json`;
			let headers = {
				method: "PUT", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						console.log("DONE!!");
						window.location.hash = "#home";
					} else {
						console.log(response.status);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
}

function register() {
	let src = document.getElementById("register").innerHTML;
	let template = Handlebars.compile(src);
	let context = {};
	let html = template(context);
	render(html);
	document
		.getElementById("registerButton")
		.addEventListener("click", function (event) {
			console.log("clicked");

			event.preventDefault();
			let firstName = document.getElementById(
				"defaultRegisterFormFirstName"
			).value;
			let lastName = document.getElementById(
				"defaultRegisterFormLastName"
			).value;
			let username = document.getElementById(
				"defaultRegisterFormUsername"
			).value;
			let password = document.getElementById(
				"defaultRegisterFormPassword"
			).value;
			let repeatPassword = document.getElementById(
				"defaultRegisterRepeatPassword"
			).value;

			let data = {
				firstName,
				lastName,
				username,
				password,
				repeatPassword,
			};
			console.log(data);
			let url =
				"https://module4project-74b81-default-rtdb.firebaseio.com/registeredUsers.json";
			let headers = {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						console.log("DONE!!");
						window.location.hash = "#home";
					} else {
						console.log(response.status);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
}

function login() {
	let src = document.getElementById("login").innerHTML;
	let template = Handlebars.compile(src);
	let context = {};
	let html = template(context);
	render(html);
	document
		.getElementById("loginButton")
		.addEventListener("click", function (event) {
			console.log("clicked");

			event.preventDefault();
			let username = document.getElementById(
				"defaultRegisterFormUsername"
			).value;
			let password = document.getElementById(
				"defaultRegisterFormPassword"
			).value;

			let data = {
				username,
				password,
			};
			console.log(data);
			let url =
				"https://module4project-74b81-default-rtdb.firebaseio.com/users.json";
			let headers = {
				method: "POST", // *GET, POST, PUT, DELETE, etc.
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			};
			fetch(url, headers)
				.then(function (response) {
					if (response.status == 200) {
						console.log("DONE!!");
						window.location.hash = "#home";
					} else {
						console.log(response.status);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		});
}

function render(html) {
	document.getElementById("container").innerHTML = html;
}
