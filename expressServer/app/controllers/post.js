var mongoose = require("mongoose");
const Post = mongoose.model("Post");
//=============================
// List
//=============================
 exports.index = function(req, res) {
  var query = {};

  if (req.query["startDate"] || req.query["endDate"]) {
    query.publishDate = {};
    req.query["startDate"] ?query.publishDate["$gte"] = new Date(req.query["startDate"]):null;
    req.query["endDate"]?query.publishDate["$lte"] = new Date(req.query["endDate"]):null;
  }
  if (req.query["postWriter"]) {
    query.writer = { $regex: req.query["postWriter"], $options: "i" };
  }

  if (req.query["postTitle"]) {
    query.title = { $regex: req.query["postTitle"], $options: "i" };
  }

  if (req.query["wordsInPost"]) {
    query.content = { $regex: req.query["wordsInPost"], $options: "i" };
  }

  if (req.query["postWriterWebsiteURL"]) {
    query.writerWebsiteUrl = {
      $regex: req.query["postWriterWebsiteURL"],
      $options: "i"
    };
  }

  if (req.query["postComments"]) {
    query.comments = { $size: req.query["postComments "] };
  }

  console.log("query is", query);

  Post.find(query).populate("comments").exec(function(err, posts) {
    if (err) throw err;

    res.send(posts);
  });
};

//=============================
// Show
//=============================
exports.show = function(req, res) {
  var id = req.params.id;

  Post.findOne({ _id: id }).exec(function(err, post) {
    if (err) throw err;
    post.counter++;
    Post.update({_id: id}, post, function(err, raw) {
      if (err) throw err;
    })
    res.send(post);
  });
};
//=============================
// Create
//=============================
exports.create = function(req, res) {
  console.log('create post',req);
  new Post(req.body).save(function(err, post) {
    if (err) throw err;

    res.send(post);
  });
};

//=============================
// Update
//=============================
exports.update = function(req, res) {
  var id = req.params.id;

  Post.findOneAndUpdate({ _id: id }, req.body, function(err, Post) {
    if (err) throw err;

    res.send(Post);
  });
};

//=============================
// Delete
//=============================
// exports.delete = function(req, res) {
//   var id = req.params.id;

//   Post.remove({ _id: id }, function(err) {
//     if (err) throw err;

//     res.send(200);
//   });
// };

exports.delete = function(postId, callback) {
  Post.remove({ _id: postId }, callback);
};

exports.getTopPosts = function(req, res) {
  Post.aggregate([{$sort: {counter: -1}}, {$limit: 3}]).then(function(results) {
    res.send(results);
  }, function(err) {
    if (err) throw err;
  });
}

exports.getPostsCountByWriter = function(req, res) {
  Post.aggregate([{"$group": {
    '_id': '$writer', 'count': { '$sum': 1 }
  }}], function(err, results) {
    if (err) throw err;
    res.send(results);
  })
}

exports.getPostStats = function(req, res) {
  Post.find({"counter": {'$gte': 1}}, {title: 1, counter: 1}).exec(function(err, results) {
    if (err) throw err;
    res.send(results);
  })
}

exports.admin = function(req, res) {
  var adminCookieFound = false;
  var cookies = Object.keys(req.cookies);
  cookies.forEach(function(key) {
    if (key == "admin") {
      adminCookieFound = true;
    }
  })
  if (!adminCookieFound) {
    res.sendStatus(401);;
  }
  else {
    exports.index(req, res);
  }
}
// //=============================
// // Search
// //=============================
// exports.search = function(req, res) {

//   req.params.startDate,
//   req.paramas.endDate
//   req.params.postWriter
//   req.params.postTitle,
//   req.params.wordsInPosts,
//   req.params.postWriterWebsiteUrl
//   req.params.numOfComments

//    Post.find({}function(err, posts) {
//     if (err) throw err;

//     res.send(posts);
//   });
// };
