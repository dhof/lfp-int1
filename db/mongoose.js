const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/lfpmovies')

module.exports = mongoose