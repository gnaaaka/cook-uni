let hashRoute;

function listen() {
	let current = getCurrent();
	if (current !== hashRoute) {
		console.log(window.location.hash);
		hashRoute = current;

		if (hashRoute == "" || hashRoute == "#home") {
			home();
		} else if (hashRoute == "#share") {
			share();
		} else if (hashRoute == "#edit") {
			edit();
		} else if (hashRoute == "#login") {
			login();
		} else if (hashRoute == "#register") {
			register();
		} else if (hashRoute.includes("#recipes")) {
			let hashSplit = hashRoute.split("/");
			recipes(hashSplit[1]);
			// } else if (hashRoute.includes("delete")) {
			// 	//#delete/-MjuM5NtwLEGafDenhIP
			// 	let [hash, itemID] = hashRoute.split("/");
			// 	console.log(itemID);
			// 	//delete the item
			// 	let url = `https://routing-lab-6734f-default-rtdb.firebaseio.com/furniture/${itemID}.json`;
			// 	let headers = {
			// 		method: "DELETE", // *GET, POST, PUT, DELETE, etc.
			// 	};
			// 	console.log(url);
			// 	fetch(url, headers)
			// 		.then(function (response) {
			// 			console.log(response.status);
			// 			if (response.status == 200) {
			// 				window.location.hash = "#profile";
			// 			}
			// 			//check the response for 200
			// 			//show that it worked in the notifications,
			// 			//probably need to reload the template
			// 		})
			// 		.catch(function (error) {
			// 			console.log("error");
			// 			//notifications show error
			// 		});
		}
	}
	setTimeout(listen, 200);
}
function getCurrent() {
	return window.location.hash;
}
listen();
