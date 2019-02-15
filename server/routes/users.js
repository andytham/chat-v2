
const db = require('../db/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Users = {
	findAll: function(){
		return db.query(
			`
				SELECT * FROM users
			`
		)
	},
	create: user => {
		return db.one(
			`
				INSERT INTO users
				(username, password, email)
				VALUES ($1, $2, $3)
				RETURNING *
			`,
			[user.username, user.password, user.email]
		)
	},
	find: user => {
		return db.oneOrNone(
			`
				SELECT * FROM users
				WHERE username = $1
			`,
			[user.username]
		)
	}
};

const usersController = {
	index: () => {

	},
	create: (req, res) => {
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
				Users.create({
					username: req.body.username,
					password: hash,
					email: req.body.email
				}).then(user => {
					res.json({
						message: "User created"
					})
				})
				.catch(err => {
					console.log(err);
				})
			});
		});
	},
	login: (req, res) => {
		Users.find({
			username: req.body.username
		})
		.then(user => {
			bcrypt.compare(req.body.password, user.password, function(err, bcryptRes){
				if (bcryptRes){
					let token = jwt.sign({
						exp: Math.floor(Date.now() / 1000) + (60 * 60),
						data: req.body.username
						}, "secret")
					req.session.token = token;
					req.session.username = req.body.username;
					res.json({
						username: req.body.username,
						token: token,
						message: "User found",
						success: true
					})
				} else {
					res.json({
						// pw: user.password,
						success: false
					})
				}
			})
		})
		.catch(err => {
			console.log(err);
		})
	},
	current: (req, res) => {
		let response = {username: req.session.username}
		console.log(response);
		if(req.session.username){
			res.json(response)
		} else {
			res.json({message: "no one logged in"})
		}
	},
	temp: (req, res) => {
		//make sure req is valid, correct pw, actual user, etc, sanitized inputs
		// do a search on registered users
		//push into a list of active users?
		let token = jwt.sign({
									exp: Math.floor(Date.now() / 1000) + (60 * 60),
									data: req.body.username
									}, "secret")
	
		req.session.token = token;
		req.session.username = req.body.username;
		let body = {
			username: req.body.username,
			token: token
		}
		res.json(body)
	}
};

const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/all', usersController.index)
usersRouter.post('/authenticate', usersController.login)
usersRouter.post('/create', usersController.create)
usersRouter.get('/current', usersController.current)
module.exports = usersRouter;