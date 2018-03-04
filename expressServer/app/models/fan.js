/*!
 * Module dependencies
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Fan schema
 */
const FanScema = new Schema({
	firstName: {type: String, default: ""},
	lastName: {type: String, default: ""},
	gender: {type: String, default: "Not sexually defined"},
	dateOfBirth: {type: Date, default: null},
	yearsOfSeniority: {type: Number, default: 0},
	address: {type: String, default: ""}
})

mongoose.model("Fans", FanScema);