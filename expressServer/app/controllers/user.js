var mongoose = require("mongoose");
const User = mongoose.model("User");

exports.login = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    console.log(username + " " + password)
    User.findOne({ username: username, password: password }).exec(function(err, user) {
        if (err) throw err;
        console.log(user);
        
        if (user) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(401);
        }
        
    });
}