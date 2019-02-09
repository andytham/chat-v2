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