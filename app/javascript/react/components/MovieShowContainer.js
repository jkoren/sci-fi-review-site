import React, { useState, useEffect } from "react"

import MovieShow from "./MovieShow"

const MovieShowContainer = (props) => {
  const [movie, setMovie] = useState({}) 
  const id = props.match.params.id 
  useEffect(() => {
    fetch(`/api/v1/movies/${id}`)
      .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
      })
      .then((responseBody) => {
        setMovie(responseBody)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])
  return (
    <MovieShow 
      id={movie.id}
      title={movie.title}
      summary={movie.summary}
      year={movie.year}
    />
  )
}

export default MovieShowContainer 