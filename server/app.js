const express = require('express');
const app = express();
const path = require('path');

const { timeGet } = require('./helpers');
const PORT = process.env.PORT || 8080;
//debug log in console
const logger = require('morgan');
app.use(logger("dev"));
//handle request bodies incoming from the client
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
const session = require('express-session');
//redis for persistence
// const RedisStore = require('connect-redis')(session);
// const sessionStore = new RedisStore({host: "localhost"})

app.use(express.static('build')) 
//near top level otherwise will get unexpected token error and other errors
//express.static is also serving '/'? overwriting any other calls to the root, so place those over?

app.use(session({
	secret: "secretSession",
	// store: sessionStore,
	resave: true,
	saveUninitialized: true,
	cookie: {
		originalMaxAge: null,
  	maxAge: 60 * 60 * 1000,
    httpOnly: true,
		// secure: true, // https only?
	}
}))

app.get('/login', (req,res)=>{
	res.sendFile(path.join(__dirname + '../../index.html'))
})


app.get('/', (req,res) => {
	res.sendFile(path.join(__dirname + '../../index.html'))
})

const privateRoute = require('./routes/private');
app.use('/chat', privateRoute);

//login POST
const userRoute = require('./routes/users');
app.use('/users', userRoute);

//chat history routes
const historyRoute = require('./routes/history');
app.use('/api/history', historyRoute);


const server = require('http').createServer(app);
//socket.io
const socket = require('./chat-socket');
socket(server);

server.listen(PORT, (err) => {
	console.log(`Listening on port ${PORT}, ${timeGet("hm")}`);
})