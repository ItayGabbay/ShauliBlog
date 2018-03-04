var _ = require('lodash');
const mongoose = require("mongoose");
const Fans = mongoose.model("Fans");
const Posts = mongoose.model("Post")

exports.getAll = function(req, res) {
	Fans.find({}, function(err, fans) {
		if (err) {
			throw err;
		}
		res.send(fans);
	});
}

exports.getFanById = function(req, res) {
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
	new Fans(req.body).save(function (err, fan) {
		if (err) throw err;
		res.send(fan);
	});
}

exports.search = function (req, res) {
	let fan = req.body;
	let query = {};
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

	Fans.find(query, function (err, res) {
		if (err) throw err;

		res.send(res);
	})
}

exports.edit = function (req, res) {
	var id = req.params.id;

	Fans.findOneAndUpdate({ _id: id }, req.body, function(err, fan) {
		if (err) throw err;

		res.send(fan);
	});
}

exports.delete = function(req, res) {
	var id = req.params.id;
  
	Fans.remove({ _id: id }, function(err) {
	  if (err) throw err;
  
	  res.send(200);
	});
  };


