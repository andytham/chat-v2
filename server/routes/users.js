
const db = require('../db/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { check, validationResult } = require('express-validator/check');

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
		let password = req.body.password,
				email = req.body.email,
				username = req.body.username
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json(errors.array())
			return res.status(422).json({ errors: errors.array() });
		}
		bcrypt.genSalt(saltRounds, function(err, salt) {
			bcrypt.hash(password, salt, function(err, hash) {
				Users.create({
					username: username,
					password: hash,
					email: email
				}).then(user => {
					res.json({
						msg: "User created.",
						success: true
					})
				})
				.catch(err => {
					if(err.code == "23505"){
						res.json({
							msg: "Username already exists.",
							success: false
						})
					} else {
						console.log(err);
						res.json({
							msg: "Error occurred when registering.",
							success: false
						})
					}

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
						msg: "User found",
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
			res.json({
				success: false
			})
		})
	},
	current: (req, res) => {
		let response = {username: req.session.username}
		console.log(response);
		if(req.session.username){
			res.json(response)
		} else {
			res.json({msg: "no one logged in"})
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
usersRouter.post('/create', [
	check('username')
		.isLength({ max: 16, min: 3}).withMessage('Username must be 3-16 characters long.')
		.matches(/^[a-zA-Z0-9_-]*$/).withMessage('Username can only have A-Z, 0-9, -, and _ as characters.').escape(),
  check('email').isEmail().withMessage('Email must be valid').escape(),
  check('password').isLength({ min: 3 }).withMessage('Password length must be at least 3 characters long.').escape()
], usersController.create)
usersRouter.get('/current', usersController.current)
module.exports = usersRouter;