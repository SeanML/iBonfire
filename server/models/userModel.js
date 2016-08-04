const db = require('../db/db.js');

const User = module.exports;

User.findAllUsers = () => {
	return db('users')
		.then(rows => {
			return rows;
		});
};

User.findUserById = FB_id => {
	return db('users').where({
			FB_id: FB_id
		}).limit(1)
		.then(rows => {
			return rows[0];
		});
};

User.findUserByLocation = (latitude, longitude) => {
	return db('users').where({
			latitude: latitude,
			longitude: longitude
		}).limit(1)
		.then(rows => {
			return rows[0];
		});
};

User.createUser = function(attr) {
	return new Promise(function(resolve, reject) {
		return db('users').insert(attr)
			.then(function(result) {
				console.log(result, "THIS IS RESULT");
				console.log(attr, "THIS IS THE ATTR")
				attr.id = result[0];
				resolve(attr);
			});
	});
};

User.deleteUser = function(id){
	return db('users').where({
		FB_id: id
	}).del()
		.then((response) => {
			return response;
		})
}