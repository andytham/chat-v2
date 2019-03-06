
const db = require('../db/config');

// Model
const History = {
	findAll: () => {
		return db.query(
			`
				SELECT * FROM chat_history
			`
		);
	},
	create: history => {
		return db.one(
			`
			INSERT INTO chat_history
			(usr, msg, tme)
			VALUES ($1, $2, $3)
			RETURNING *
			`,
			[history.usr, history.msg, history.tme]
		)
	}
}

// Controller
const historyController = {
	index: (req, res) => {
		History.findAll()
		.then(history => {
			res.json(history);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({err})
		})
	},
	create: (req, res) => {
		console.log(req.body);
		History.create({
			usr: req.body.usr,
			msg: req.body.msg,
			tme: req.body.tme
		})
		.then(history => {
			res.json({
				msg: "History entry created",
				data: history
			})
		})
		.catch(err => {
			console.log(err);
		})
	}
};

const express = require('express');
const historyRouter = express.Router();

// Route
historyRouter.get('/', historyController.index);
historyRouter.post('/', historyController.create);

module.exports = historyRouter;