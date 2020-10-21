import React, { useState } from 'react'

const MoviesFormContainer = (props) => {
  const [submittedMovie, setSubmittedMovie] = useState({
    title: "",
    summary: "",
    year: ""
  })

  const inputChangeHandler = (event) => {
    setSubmittedMovie({
      ...submittedMovie,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    fetch('/api/v1/movies.json', {
      method: "POST",
      body: JSON.stringify(submittedMovie)
    })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        // error stuff
      }
    }) 
    .then(body => {
      debugger
    })
  }

  return(
    <form onSubmit={onClickHandler}>
      <label>
        Title
        <input 
          name="title"
          id="title"
          type="text"
          onChange={inputChangeHandler}
          />
      </label>
      <label>
        Summary
        <input 
          name="summary"
          id="summary"
          type="text"
          onChange={inputChangeHandler}
          />
      </label>
      <label>
        Year  
        <input 
          name="year"
          id="year"
          type="text"
          onChange={inputChangeHandler}
          />
      </label>
      <input
        type="submit"
        value="Add New Movie"
      />
    </form>
  )
}

export default MoviesFormContainer
