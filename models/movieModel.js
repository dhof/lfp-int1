const mongoose = require('mongoose')

const MoviesSchema = mongoose.Schema({
	id: Number,
	title: String,
	genres: Array,
	year: Number
})

const Movies = mongoose.model('Movies', MoviesSchema)

module.exports = Movies
