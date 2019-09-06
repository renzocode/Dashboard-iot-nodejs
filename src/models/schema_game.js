const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Game = new Schema({
	title : String,
	author : String,
	content : String,
	comment : String,
	img  : { data : Buffer, contentType : String },
	date : { type: Date, default : Date.now }
});

module.exports = mongoose.model('Game', Game);