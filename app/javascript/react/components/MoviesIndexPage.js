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
    return (
    <div className="callout secondary cell small-4"> 
    {movie.title} | {movie.summary} | {movie.year}
    </div>)
  })

  return (
    <div className="grid-x grid-margin-x">
        {movieListItems}  
    </div> 
  )
}

export default MoviesIndexPage
