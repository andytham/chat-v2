
let axios = require('axios')
let obj = {fuck: "me"}

async function go() {
	try {
		const poop = await axios(`http://localhost:8080/sessions`)
		obj = poop.data;
		console.log('inside',obj);
		return await poop
	} catch (err){ console.log(err);}
}

let god = go().then(data => obj = data.data);
console.log('1',obj);
console.log('2',god);