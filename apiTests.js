const axios = require('axios')

// Test cases for CREATE, UPDATE and DELETE operations 
const testCreate = () => {
	axios.post('http://localhost:4001/create', {
	    title: 'Equilibrium',
	    genres: ['Action', 'Drama', 'Sci-Fi'],
	    year: 2002
  })
}
const testUpdate = () => {
	axios.put('http://localhost:4001/update', {
		id: 73,
	    title: 'Le Mis',
	    genres: ['War', 'Sci-Fi', 'Romance', 'Children'],
	    year: 1702
  })
}
const testDelete = () => {
	axios.delete('http://localhost:4001/remove', {
		data: {
			id: 7
		}
  })
}

module.exports = {
	testCreate,
	testUpdate,
	testDelete
}