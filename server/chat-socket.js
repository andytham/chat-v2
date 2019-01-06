const axios = require('axios');

module.exports = function () {
  let chatHistory = [{usr: 'server', msg: 'welcome to the chatroom!', tme: ''}] //fallback
  axios.get(`http://localhost:8080/api/history`).then( data => {
    chatHistory = data.data;
  }).catch(err => {
    console.log('most likely no server found');
  })

  // function broadcastMessage(message) {
  //   members.forEach(m => m.emit('message', message))
  // }

  function addEntry(entry) {
    chatHistory = chatHistory.concat(entry)
    console.log('this is entry', entry);
    axios.post(`http://localhost:8080/api/history`,
    {
      usr: entry.usr,
      msg: entry.msg,
      tme: entry.tme
    })
    .then(res => {
      // console.log(res);
      console.log("post successful");
    })
    .catch(err => {
      console.log("post failed");
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
