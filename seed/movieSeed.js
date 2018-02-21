const csv = require('fast-csv')
const Movies = require('../models/movieModel')

const populateMovies = () => {
	console.log('POPULATED MOVIES')

	Movies
		.remove({})
		.then(() => {
			const addMovies = []

			csv
				.fromPath('./movies.csv', {headers: true, ignoreEmpty: true})
				.on('data', function(data){						
					addMovies.push(new Movies({
						id: data['movie id'],
						title: data.title,
						genres: data.genres.split("|"),
						year: data.title.slice(-5, -1)
					}).save())
				})
				.on('end', function(){
					console.log('imported', addMovies.length, 'movies')
				})
		})
}

module.exports = {
	populateMovies
}