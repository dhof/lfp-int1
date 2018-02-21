const Movies = require('../models/movieModel')

module.exports = {
	viewAllMovies(req, res) {
		let find = Movies.find({}).sort({ year: 1 })
		find.exec((err, movies) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				res.send(movies)
				console.log(movies.length, 'movies sent')
			}
		}) 
	},
}