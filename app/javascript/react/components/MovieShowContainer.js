import React, { useState, useEffect } from "react"
import MovieShow from "./MovieShow"
import ReviewList from "./ReviewList"

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
    <div>
      <MovieShow 
        id={movie.id}
        title={movie.title}
        summary={movie.summary}
        year={movie.year}
      />
      <h2>Reviews:</h2>
      <ReviewList
        movieReviews={movie.reviews}
      />
    </div>
  )
}

export default MovieShowContainer 