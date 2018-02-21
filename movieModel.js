const mongoose = require('mongoose')

const MoviesSchema = mongoose.Schema({
	id: Number,
	title: String,
	genres: Array
})

const Movies = mongoose.model('Movies', MoviesSchema)

module.exports = Movies
