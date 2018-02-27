const Movies = require('../models/movieModel')

module.exports = {
	// show all movies
	movies(req, res) {
		let find = Movies.find({}).sort({ year: 1 })
		find.exec((err, movies) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				console.log(movies.length, 'movies sent')
				res.send(movies)
			}
		}) 
	},
	// show all movies by specific genre
	moviesByGenre(req, res) {
		let { genre } = req.query
		let find = Movies.find({ genres: { $regex: genre, $options: "i" }}).sort({ year: 1 })
		find.exec((err, movies) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				console.log(movies.length, genre, ' movies sent')
				res.send(movies)
			}
		})
	},
	// show all movies ordered by most per year
	mostMoviesByYear(req, res) {
		let aggregate = Movies.aggregate([
			{ $group: {
		 		_id: "$year", 
		 		count: { $sum: 1 }, 
		 		movies: { $push: { 
		 			id: "$id", 
		 			title: "$title", 
		 			genres: "$genres", 
		 			year: "$year"
		 		} } } },
		 	{ $sort: { count: -1 } }	
		 ],
		(err, movies) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				res.send(movies)
			}
		})
	},
	// show all genre types
	genres(req, res) {
		let find = Movies.find().distinct("genres", (err, genres) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				res.send(genres)
			}
		})
	},
	// show genres ordered by most movies
	genresByMostMovies(req, res) {
		let aggregate = Movies.aggregate([
			{ $unwind: "$genres" }, 
			{ $group: { 
				_id: "$genres", 
				count: { $sum: 1 } } },
			{ $sort: { count: -1 } } 
		],
		(err, genres) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				res.send(genres)
			}
		})
	},
	// create new movie
	create(req, res) {
		let { title, genres, year } = req.body
		// check title string for year, add if it does not exist
		var fullTitle
		if ( title[title.length - 6] === '(') {
			fullTitle = title
		} else {
			fullTitle = title + ' (' + year + ')'
		}

		let find = Movies.findOne({}).sort({ id: -1 })
		find.exec((err, movie) => {
			let newId = movie.id + 1
			if (err) {
				console.log(err)
			} else {
				// console.log('newId', newId, fullTitle, genres, year)
				let newMovie = new Movies({ id: newId, title: fullTitle, genres, year })
				newMovie.save().then(() => {
					var find = Movies.findOne({ id: newId })
					find.exec((err, movie) => {
						if (err) {
							console.log(err)
							res.send(err)
						} else {
							console.log('CREATED:', movie)
							res.send(movie)
						}
					})
				})
			}
		})
	},
	// update one movie based on id
	update(req, res) {
		let { id, title, genres, year } = req.body
		let update = Movies.update(
			{ id },
			{ $set: { title, genres, year } }
		)
		update.exec((err, movie) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				let find = Movies.findOne({ id })
				find.exec((err, movie) => {
					if (err) {
						console.log(err)
						res.send(err)
					} else {
						console.log('UPDATED:', movie)
						res.send(movie)
						
					}
				}) 
			}
		})
	},
	// remove one movie from db
	remove(req, res) {
		let { id } = req.body
		let remove = Movies.remove({ id })
		remove.exec((err, movie) => {
			if (err) {
				console.log(err)
				res.send(err)
			} else {
				console.log('DELETED', movie)
				res.send(movie.result)
			}
		})
	}
}