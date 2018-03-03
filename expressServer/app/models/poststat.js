/*!
 * Module dependencies
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * User schema
 */

const PostStatSchema = new Schema({
	postid: { type: Schema.Types.ObjectId},
	counter: {type: Number, default: 0 }
});

/**
 * Methods
 */

PostStatSchema.method({});

/**
 * Statics
 */

PostStatSchema.static({});

/**
 * Register
 */

mongoose.model("poststat", PostStatSchema);