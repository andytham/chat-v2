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
  axios.get(`/api/history`).then( data => {
    chatHistory = data.data;
  }).catch(err => {
    console.log('Most likely no server found');
  })

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    // console.log('This is the entry being POSTed:', entry);
    axios.post(`/api/history`,
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

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

var players = {
	// "test": {
  //   x: 300 / 2,
  //   y: 300 / 2,
  //   width: 20,
  //   height: 20,
  //   jumpHeight: 5,
  //   moveSpeed: 5,
  //   velX: 0,
  //   velY: 0,
  //   jumping: false,
  //   grounded: false,
  //   color: 'red',
  //   online: true
  // }
}
function game () {

  function getPlayers(){
    return players;
  }
  
  function addPlayer(username){
    let width= 300, 
height= 300
		console.log("adding a player...");
    players[username] = {
      x: width / 2,
      y: height / 2,
      width: 20,
      height: 20,
      jumpHeight: 5,
      moveSpeed: 5,
      velX: 0,
      velY: 0,
      jumping: false,
      grounded: false,
      color: getRandomColor(),
      online: true
    }
  }

  function updatePlayer(playerData, username){
    players[username] = playerData
	}
	function disconnect(username){
		players[username].online = false
	}
	function connect(username){
    players[username] = {}
		players[username].online = true
	}
	return {
		getPlayers,
		updatePlayer,
		addPlayer,
		disconnect,
		connect
	}
}

module.exports = {
	timeGet: timeGet,
  cr: chatroom,
  game: game,
  getRandomColor: getRandomColor
}