const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')

const movieController = require('./controllers/movieController')

const app = express()

// load db config
const mongoose = require('./db/mongoose')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
	console.log('db connected succesfully')
	require('./seed/movieSeed').populateMovies()
})

// load middleware
app.use(bodyParser.json())
app.use(logger('dev'))

// routes
app.get('/', (req, res) => res.send('Welcome to the movies API!'))
app.get('/movies', movieController.movies)
app.get('/moviesbygenre', movieController.moviesByGenre)
app.get('/genres', movieController.genres)
app.post('/create', movieController.create)
app.put('/update', movieController.update)
app.delete('/remove', movieController.remove)


app.listen(4001, () => 
	console.log('Server running on port 4001')
)