/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Comment schema
 */
var commentSchema = new Schema({
	postId: { type: Schema.Types.ObjectId },
	title: { type: String, default: "" },
	writer: { type: String, default: "" },
	writerWebsiteUrl: { type: String, default: "" },
	content: { type: String, default: "" }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

commentSchema.method({});

/**
 * Statics
 */

commentSchema.static({});

/**
 * Register
 */

mongoose.model("Comment", commentSchema);
