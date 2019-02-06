function timeGet(type){
	let t = new Date;
	let tH = t.getHours();
	if (t.getHours() < 10){
		tH = "0" + t.getHours();
	}

	let tM = t.getMinutes();
	if (t.getMinutes() < 10){
		tM = "0" + t.getMinutes();
	}

	let tS = t.getSeconds();
	if (t.getSeconds() < 10){
		ts = "0" + t.getSeconds();
	}
	if (type == "hms"){
		return `${tH}:${tM}:${tS}`;
	} else if (type == "hm"){
		return `${tH}:${tM}`;	
	} else {
		return `${tH}:${tM}:${tS}`;
	}
}


module.exports = {
	timeGet: timeGet
}