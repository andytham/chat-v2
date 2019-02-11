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
				WHERE username = $3
				RETURNING *
			`,
			[user.lastOnline, user.currentStatus, user.username]
		);
	}
}

const usersSessionsController = {
	create: function(req, res){
		let user = req.body
		console.log(user.currentStatus);
		UsersSession.create({
			username: user.username,
			lastOnline: user.lastOnline,
			currentStatus: user.currentStatus
		})
		.then(user => {
			res.json({
				message: "User session created",
				data: user
			})
		})
		.catch(err => {
			console.log(err);
		})
	},
	index: function(req, res){
		res.setHeader('Last-Modified', (new Date()).toUTCString());
		//https://vlasenko.org/2011/10/12/expressconnect-static-set-last-modified-to-now-to-avoid-304-not-modified/
		UsersSession.findAll()
		.then(usersSessions => {
			res.json({usersSessions})
		})
		.catch(err => {
			console.log(err);
		})
	},
	update: function(req, res){
		let user = req.body
		console.log(req.body);
		console.log(res.body);
		UsersSession.update({
			username: user.username,
			lastOnline: user.lastOnline,
			currentStatus: user.currentStatus
		})
		.then(user => {
			res.json({
				message: "User session updated",
				data: user
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