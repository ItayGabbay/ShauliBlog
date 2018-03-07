var _ = require('lodash');
const mongoose = require("mongoose");
const Fans = mongoose.model("Fans");
const Posts = mongoose.model("Post")

exports.index = function(req, res) {
	let query = {};

	if (req.query["firstName"]) {
		query.firstName = { $regex: req.query["firstName"], $options: "i" };
	}

	if (req.query["lastName"]) {
		query.lastName = { $regex: req.query["lastName"], $options: "i" };
	}

	if (req.query["dateOfBirth"]) {
		query.dateOfBirth = new Date(req.query["dateOfBirth"]);
	}

	if (req.query["gender"]) {
		query.gender = req.query["gender"];
	}

	if (req.query["address"]) {
		query.address = { $regex: req.query["address"], $options: "i" };
	}

	Fans.find(query).exec(function (err, data) {
		if (err) throw err;

		res.send(data);
	})}


exports.show = function(req, res) {
	Fans.findOne({_id: req.params.id}, function (err, fan) {
		if (err) {
			throw err;
		}

		if (_.isEmpty(fan)) {
			res.sendStatus(404);
		} else {
			res.send(fan);
		}
	});
}

exports.getPostsByFanId = function (req, res) {

	// Fans.find({_id:req.params.id} ,function (err, fan)) {
	// 	if (err) throw err;
	// 	if (_.isEmpty()) 
	// }
	// Posts.find({"writer._id": }, function (err, res) {
	// 	if (err) {
	// 		throw err;
	// 	}

	// 	res.send(fan);
	// });

res.sendStatus(403);
}

exports.create = function (req, res) {
	// Creating fan by mode
	new Fans(req.body).save(function (err, fan) {
		if (err) throw err;
		res.send(fan);
	});
}

exports.search = function (req, res) {
	// gEtting fan to filter by from request
	let fan = req.body;

	// Initializind empty query object
	let query = {};

	// Checking which fields should be included in query
	if (fan.firstName) {
		query.firstName = fan.firstName;
	}

	if (fan.lastName) {
		query.lastName = fan.lastName;
	}

	if (fan.dateOfBirth) {
		query.dateOfBirth = new Date(fan.dateOfBirth);
	}

	if (fan.gender) {
		query.gender = fan.gender;
	}

	if (fan.address) {
		query.address = fan.address;
	}

	// Executing query with filter
	Fans.find(query, function (err, res) {
		if (err) throw err;

		res.send(res);
	})
}

exports.edit = function (req, res) {
	// Getting id from request
	var id = req.params.id;

	// executing uodate query
	Fans.findOneAndUpdate({ _id: id }, req.body, function(err, fan) {
		if (err) throw err;

		res.send(fan);
	});
}

exports.delete = function(req, res) {
	// Getting id
	var id = req.params.id;
  
	// Deleting
	Fans.remove({ _id: id }, function(err) {
	  if (err) throw err;
  
	  res.send(200);
	});
  };


