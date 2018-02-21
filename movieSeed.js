const csv = require('fast-csv')
const Movies = require('./movieModel')

// const movies = [
// 	{
// 		id: 1,
// 		name: 'Toy Story (1995)',
// 		genre: ['Adventure', 'Animation', 'Children', 'Comedy', 'Fantasy']
// 	}
// ]

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
						genres: data.genres
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