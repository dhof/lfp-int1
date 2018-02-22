const csv = require('fast-csv')
const Movies = require('../models/movieModel')

const apiTests = require('../apiTests')

const populateMovies = () => {
	// clear db before loading movies
	Movies
		.remove({})
		.then(() => {
			const addMovies = []
			
			// import from movies.csv
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
		// run CREATE, UPDATE, DELETE tests
		.then(() => {
			apiTests.testUpdate()
			apiTests.testDelete()
			apiTests.testCreate()
		})
}

module.exports = {
	populateMovies
}