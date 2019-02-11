function timeGet(type){
  let t = new Date;
  
  function addZero(num){
    if (num < 10){
      return "0" + num;
    }
    return num;
  }

	let tH = addZero(t.getHours());
	let tM = addZero(t.getMinutes());
	let tS = addZero(t.getSeconds());
  let yy = t.getFullYear();
  let mm = addZero(t.getMonth() + 1);
  let dd = addZero(t.getDate())
  
  switch (type){
    case "hms":
      return `${tH}:${tM}:${tS}`;
    case "hm":
      return `${tH}:${tM}`;	
    case "yymmdd":
      return `${yy}-${mm}-${dd}`
    case "full":
    return `${yy}-${mm}-${dd} ${tH}:${tM}:${tS}`
    default:
      return `${tH}:${tM}:${tS}`;
  }
	if (type == "hms"){
		return `${tH}:${tM}:${tS}`;
	} else if (type == "hm"){
		return `${tH}:${tM}`;	
	} else {
		return `${tH}:${tM}:${tS}`;
	}
}

//backend for chatroom, seperate?
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