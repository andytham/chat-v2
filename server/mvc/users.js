const usersController = {};
const db = require('../db/config');
const Users = {};

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

	//return if valid
	res.json(req.body.username)
}

const express = require('express');
const usersRouter = express.Router();

usersRouter.post('/authenticate', usersController.temp)

module.exports = usersRouter;