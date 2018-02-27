### Movie API

To run this project locally, the following must be installed:
* [Node and NPM](https://nodejs.org/en/download/)  
* [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installing and Running Locally
```
- mongod (may need to run sudo mongod)
- open a second command shell
- git clone https://github.com/dhof/lfp-int1.git
- cd lfp-int1
- npm install
- npm start
```

Axios was used in this project but you may use any tool you like to perform the below AJAX calls 

### Endpoints
| Endpoints            | Description                                   |
|----------------------|-----------------------------------------------|
| /movies              | get all movies		                           |
| /moviesbygenre       | get movies by genre                           |
| /mostmoviesbyear     | movies ordered by most per year               |
| /genres              | get all genres                                |
| /genresbymostmovies  | genres ordered by majority number of movies   |
| /create 			   | add a movie to the database                   |
| /update              | edit a movie in the database                  |
| /remove              | remove a movie from the database              |

### Endpoint Examples

##### /moviesbygenre
```
http://localhost:4001/moviesbygenre?genre=action
```

##### /create
```
const testCreate = () => {
	axios.post('http://localhost:4001/create', {
	    title: 'Equilibrium',
	    genres: ['Action', 'Drama', 'Sci-Fi'],
	    year: 2002
  })
}
```

##### /update
```
const testUpdate = () => {
	axios.put('http://localhost:4001/update', {
		id: 73,
	    title: 'Le Mis',
	    genres: ['War', 'Sci-Fi', 'Romance', 'Children'],
	    year: 1702
  })
}
```

##### /remove
```
const testDelete = () => {
	axios.delete('http://localhost:4001/remove', {
		data: {
			id: 7
		}
  })
}
```




