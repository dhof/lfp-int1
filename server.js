const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')

const movieController = require('./movieController')

const app = express()

// load db config
const mongoose = require('./mongoose')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('db connected succesfully')
  require('./movieSeed').populateMovies()
})

// load middleware
app.use(bodyParser.json())
app.use(logger('dev'))

// routes
app.get('/', (req, res) => res.send('You are here.'))


app.listen(4000, () => 
	console.log('Server running on port 4000')
)