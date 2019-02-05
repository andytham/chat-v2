function xhrFunc(){
	var xhr = new XMLHttpRequest();
	if (localStorage.getItem("user")){
		xhr.open('HEAD','', true);
		xhr.setRequestHeader("Authorization", JSON.parse(localStorage.getItem("user")).token)

		xhr.send();
	}
}

export default xhrFunc;