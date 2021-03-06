/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Post schema
 */

const PostSchema = new Schema(
	{
		title: { type: String, default: "" },
		writer: { type: String, default: "" },
		writerWebsiteUrl: { type: String, default: "" },
		publishDate: { type: Date, default: new Date() },
		content: { type: String, default: "" },
		counter: {type: Number, default: 0 },
		comments: {
			type: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
			default: []
		}
	},
	{
		usePushEach: true
	}
);

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

PostSchema.method({});

/**
 * Statics
 */

PostSchema.static({});

/**
 * Register
 */

mongoose.model("Post", PostSchema);
