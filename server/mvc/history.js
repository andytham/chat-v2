const historyController = {};
const db = require('../db/config');
const History = {};

History.findAll = () => {
	return db.query(
		`
			SELECT * FROM chat_history
		`
	);
};

History.create = history => {
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

historyController.index = (req, res) => {
	History.findAll()
	.then(history => {
		res.json(history);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({err})
	})
}

historyController.create = (req, res) => {
	console.log(req.body);
	History.create({
		usr: req.body.usr,
		msg: req.body.msg,
		tme: req.body.tme
	})
	.then(history => {
		res.json({
			message: "History entry created",
			data: history
		})
	})
	.catch(err => {
		console.log(err);
	})
}

const express = require('express');
const historyRouter = express.Router();

historyRouter.get('/', historyController.index);
historyRouter.post('/', historyController.create);

module.exports = historyRouter;