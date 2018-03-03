/*!
 * Module dependencies
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
	username: { type: String, default: "" },
	password: {type: String, default: "" }
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

UserSchema.method({});

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */

mongoose.model("User", UserSchema);
