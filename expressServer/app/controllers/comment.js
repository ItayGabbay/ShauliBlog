const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

exports.index = function(req, res) {
	var query = {};

	if (req.query["title"]) {
		query.title = { $regex: req.query["title"], $options: "i" };
	}

	if (req.query["writer"]) {
		query.writer = { $regex: req.query["writer"], $options: "i" };
	}

	if (req.query["content"]) {
		query.content = { $regex: req.query["content"], $options: "i" };
	}
	Comment.find(query, function(err, posts) {
		if (err) throw err;

		res.send(posts);
	});
};

//=============================
// Create
//=============================
exports.create = function(req, res) {
	Post.findOne({ _id: req.body.postId }, function(err, post) {
		if (err) throw err;

		new Comment(req.body).save(function(err, comment) {
			if (err) throw err;

			post.comments.push(comment);

			post.save(function(err) {
				if (err) throw err;
				res.send(comment);
			});
		});
	});
};

//=============================
// Show
//=============================
exports.show = function(req, res) {
	var id = req.params.id;

	Comment.findOne({ _id: id }, function(err, post) {
		if (err) throw err;

		res.send(post);
	});
};

//=============================
// Update
//=============================
exports.update = function(req, res) {
	var id = req.params.id;

	Comment.findOneAndUpdate({ _id: id }, req.body, function(err, Post) {
		if (err) throw err;

		res.send(Post);
	});
};

//=============================
// Delete
//=============================
exports.delete = function(req, res) {
	var id = req.params.id;
	Post.find(function(err, posts) {
		if (err) throw err;

		for (var i = 0; i < posts.length; i++) {
			var commentIndex = posts[i].comments.indexOf(id);
			console.log(commentIndex);

			if (commentIndex !== -1) {
				posts[i].comments.splice(commentIndex, 1);
				posts[i].save(function(err) {
					if (err) throw err;
					Comment.remove({ _id: id }, function(err) {
						if (err) throw err;

						res.send(200);
					});
				});
			}
		}
	});
};
