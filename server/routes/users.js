const usersController = {};
const db = require('../db/config');
const Users = {};
const jwt = require('jsonwebtoken');

Users.create = user => {
	return db.one(
		`
			INSERT INTO whatever
			(user)
			VALUES ($1)
			RETURNING *
		`,
		[user]
	)
}

usersController.create = (req, res) => {
	Users.create({
		user: req.body
	})
}

usersController.temp = (req, res) => {
	//make sure req is valid, correct pw, actual user, etc, sanitized inputs
	// do a search on registered users
	//push into a list of active users?
	let token = jwt.sign({
								exp: Math.floor(Date.now() / 1000) + (60),
								data: req.body.username
								}, "secret")
	//return several things if valid: username, token?
	// res.json(req.body.username)
	req.session.token = token;
	let body = {
		user: req.body.username,
		token: token
	}
	
	res.json(body)
	// res.json({
	// 	token: token,
	// 	user: req.body.username
	// })
}

const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/authenticate', usersController.temp)

module.exports = usersRouter;