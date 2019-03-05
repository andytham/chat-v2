const io = require('socket.io-client')

export default function() {
  // const socket = io.connect('http://localhost:3000')
  const socket = io();

  function receive(updateChat){
    socket.on('message', msg => {
      console.log("receive message from serverside",msg);
      updateChat(msg)
    })
  }

  function message(msg, cb){
    socket.emit("message", msg)
  }

  function join(user){
    //when user joins the server
    console.log(user, 'from socketjs');
    socket.emit("join", user)
  }

  function history(updateChat){
    socket.on('history', function(hist){
      updateChat(hist)
    })
  }

  function onStatusUpdate(dispatchGet){
    socket.on('update-status', function(){
      dispatchGet()
    })
  }

  function updateStatus(data){
    socket.emit('update-status', data)
  }

  return {
    receive,
    message,
    join,
    history,
    onStatusUpdate,
    updateStatus
  }
}
