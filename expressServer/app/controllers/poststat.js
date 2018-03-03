var mongoose = require("mongoose");
const PostStat = mongoose.model("poststat");

exports.addViewToPost = function(postId) {
    //Find the post
    PostStat.findOne({_id: postId}).exec(function(err, stat) {
        if (err) throw err;

        if (stat) {
            stat.counter++;
            PostStat.update({_id: postId}, stat, function(err, raw) {
                if (err) throw err;
            })
        }
        else {
            var stat = {_id: postId, counter: 1};
            PostStat.create(stat).then(undefined, function (err) {
                if (err) throw err;
            })
        }
    })
}

exports.getTopPosts = function(callback) {
    PostStat.aggregate([{$sort: {counter: -1}}, {$limit: 3}]).then(function(res) {
        callback(res);
    }, function(err) {
        if (err) throw err;
    });
}