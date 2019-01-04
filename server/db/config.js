const options = {
	query: (event) => {
		console.log(event.query)
	}
}

const pgp = require('pg-promise')(options);

const setDb = () => {
	if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV){
		return pgp({
			database: "chat",
			port: 5432,
			host: "localhost"
		})
	} 
	else if (process.env.NODE_ENV === "production") {
		return pgp(process.env.DATABASE_URL)
	}
}

const db = setDb();

module.exports = db;