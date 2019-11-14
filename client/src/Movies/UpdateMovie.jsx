import React, {useState, useEffect } from 'react';
import axios from 'axios'

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

export const UpdateMovie = props => {

    const [movie, setMovie] = useState(initialMovie);

    console.log(props.movies)

    useEffect(() => {
        console.log(movie)
        axios
          .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
          .then(res => {
            setMovie(res.data)
          })
          .catch(err => console.log(err))
      }, [])

      if (movie === "") {
        return <h3>Loading</h3>
      }    

      const handleChanges = e => {
        if (e.target.name === "stars") {
          setMovie({...movie, [e.target.name]: e.target.value.split(",")})
        } else {
          setMovie({...movie, [e.target.name]: e.target.value})
        }
      }

      const handleSubmit = e => {
        e.preventDefault();
        axios
          .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
          .then(res => console.log(res, "Success"))
          .catch(err => console.log(err))
        localStorage.setItem("needUpdate", true)
        props.history.push(`/movies/${props.match.params.id}`)
      }

return (
    <div>
        <h2> Update Movie</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={handleChanges}
                placeholder="Title"
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={handleChanges}
                placeholder="Director"
                value={movie.director}
            />
            <input
                type="number"
                name="metascore"
                onChange={handleChanges}
                placeholder="MetaScore"
                value={movie.metascore}
            />
            <input
                type="string"
                name="stars"
                onChange={handleChanges}
                placeholder="Stars"
                value={movie.stars}
            />    
            <button> Update </button>     
        </form>
    </div>
    );
}