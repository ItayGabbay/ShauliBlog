var _ = require('lodash');
const mongoose = require("mongoose");
const Fans = mongoose.model("Fans");

exports.getAll = function(req, res) {
	Fans.find({}, function(err, fans) {
		if (err) {
			throw err;
		}
		res.send(fans);
	});
}

exports.getFanById = function(req, res) {
	Fans.findOne({_id: req.body.fanId}, function (err, fan) {
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


