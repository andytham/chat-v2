function xhrFunc(){
	var xhr = new XMLHttpRequest();
	if (localStorage.getItem("user")){
		console.log(document.location);
		xhr.open('HEAD',document.location, true);
		xhr.setRequestHeader("Authorization", "Bearer " + JSON.parse(localStorage.getItem("user")).token)

		xhr.send();
	}
	let headers = new Headers();
	headers.set('Authorization', "Bearer " + JSON.parse(localStorage.getItem("user")).token)
}

export default xhrFunc;