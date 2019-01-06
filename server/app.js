const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT || 8080;
const server = require('http').createServer(app);

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "PATCH, POST")
  next();
});

app.use(express.static('build'));
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname + '../index.html'))
})
app.get('/login', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})
app.get('/chat', (req, res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

const historyRoutes = require('./mvc/history.js');
app.use('/api/history', historyRoutes);

server.listen(PORT, (err) => {
	let t = new Date;
	let tM = t.getMinutes();
	if (t.getMinutes() < 10){
		tM = "0" + t.getMinutes();
	}
	console.log(`Listening on port ${PORT}, ${t.getHours()}:${tM}`);
})