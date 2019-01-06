const axios = require('axios');

module.exports = function () {
  let chatHistory = [{usr: 'server', msg: 'welcome to the chatroom!', tme: ''}] //fallback
  axios.get(`http://localhost:8080/api/history`).then( data => {
    chatHistory = data.data;
  }).catch(err => {
    console.log('Most likely no server found');
  })

  // function broadcastMessage(message) {
  //   members.forEach(m => m.emit('message', message))
  // }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    console.log('This is the entry being POSTed:', entry);
    axios.post(`http://localhost:8080/api/history`,
    {
      usr: entry.usr,
      msg: entry.msg,
      tme: entry.tme
    })
    .then(res => {
      // console.log(res);
      console.log("POST Success!");
    })
    .catch(err => {
      console.log("POST Failed");
      console.log(err);
    })
    // console.log("added to chat history: ", chatHistory);
  }

  function getChatHistory() {
    // console.log("getting chat history: ", chatHistory);
    return chatHistory.slice()
  }


  return {
    // broadcastMessage,
    addEntry,
    getChatHistory,
  }
}
