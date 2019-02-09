const db = require('../db/config');
const UsersSession = { //model
	create: function(user){
		return db.one(
			`
				INSERT INTO users_sessions
				(username, last_online, current_status)
				VALUES ($1, $2, $3)
				RETURNING *
			`,
			[user.username, user.lastOnline, user.currentStatus]
		);
	},

	findAll: function(){
		return db.query(
			`
				SELECT * FROM users_sessions
			`
		);
	},

	update: function(user){
		return db.one(
			`
				UPDATE users_sessions SET
					last_online = $1,
					current_status = $2
				WHERE user = $3
				RETURNING *
			`,
			[user.lastOnline, user.currentStatus, user.username]
		);
	}
}

const usersSessionsController = {
	create: function(req, res){
		let user = req.body
		UsersSession.create({
			username: user.username,
			lastOnline: user.lastOnline,
			currentState: user.currentStatus
		})
		.then(user => {
			res.json({
				message: "User session created"
			})
		})
		.catch(err => {
			console.log(err);
		})
	},
	index: function(req, res){
		UsersSession.findAll()
		.then(usersSessions => {
			res.json({
				message: "Users sessions grabbed",
				data: usersSessions
			})
		})
		.catch(err => {
			console.log(err);
		})
	},
	update: function(req, res){
		let user = req.body
		UsersSession.update({
			username: user.username,
			lastOnline: user.lastOnline,
			currentState: user.currentStatus
		})
		.then(user => {
			res.json({
				message: "User session updated"
			})
		})
		.catch(err => {
			console.log(err);
		})
	}
}

const express = require('express');
const usersSessionsRouter = express.Router();

usersSessionsRouter.post('/', usersSessionsController.create)
usersSessionsRouter.get('/', usersSessionsController.index);
usersSessionsRouter.patch('/', usersSessionsController.update);

module.exports = usersSessionsRouter;