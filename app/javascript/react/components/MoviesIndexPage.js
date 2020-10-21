import React, { useEffect, useState } from "react"

const MoviesIndexPage = (props) => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    fetch("/api/v1/movies.json")
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
    return <li>{movie.title} | {movie.summary} | {movie.year}</li>
  })

  return (
    <div>
      <ul>
        {movieListItems}
      </ul>
    </div> 
  )
}

export default MoviesIndexPage
