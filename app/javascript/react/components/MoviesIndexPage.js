import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

const MoviesIndexPage = (props) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("/api/v1/movies.json", {
      credentials: "same-origin"
    })
    .then (response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw error
      }
    })
    .then(response => response.json())
    .then(body => {
      setMovies(body) 
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  let movieListItems = movies.map((movie) => {
    let poster
    if(movie.movie_poster.url){
      poster = <img className="poster" src={movie.movie_poster.url} alt="movie poster" />
    }
    return (
    <div className="callout secondary cell small-4"> 
      <Link to={`/movies/${movie.id}`}>
         <h2 className="title" >{movie.title} ({movie.year})</h2>
        <div>{poster}</div>
      </Link>
    </div>)
  })

  return (
    <div>
    <div className="grid-x grid-margin-x">
        {movieListItems} 
    </div> 
    <div>
    <Link className="big" to={`/movies/new`}>Add a New Movie </Link>
    </div>
    </div>
  )
}

export default MoviesIndexPage
