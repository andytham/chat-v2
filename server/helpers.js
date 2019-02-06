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

const axios = require('axios');
function chatroom() {
  let chatHistory = [{usr: 'server', msg: 'welcome to the chatroom!', tme: ''}] //fallback
  axios.get(`http://localhost:8080/api/history`).then( data => {
    chatHistory = data.data;
  }).catch(err => {
    console.log('Most likely no server found');
  })

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    // console.log('This is the entry being POSTed:', entry);
    axios.post(`http://localhost:8080/api/history`,
    {
      usr: entry.usr,
      msg: entry.msg,
      tme: entry.tme
    })
    .then(res => {
      console.log("POST Success!");
    })
    .catch(err => {
      console.log("POST Failed");
      console.log(err);
    })
  }

  function getChatHistory() {
    return chatHistory.slice()
  }

  return {
    addEntry,
    getChatHistory,
  }
}


module.exports = {
	timeGet: timeGet,
	cr: chatroom
}