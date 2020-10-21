import React, { useState } from 'react'

const MoviesFormContainer = (props) => {
  const [submittedMovie, setSubmittedMovie] = useState({
    title: "",
    summary: "",
    year: ""
  })

  const handleInputChange = (event) => {
    setSubmittedMovie({
      ...submittedMovie,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return(
    <form>
      <label>
        Title
        <input 
          name="title"
          id="title"
          type="text"
          onChange={handleInputChange}
          />
      </label>
      <label>
        Summary
        <input 
          name="summary"
          id="summary"
          type="text"
          onChange={handleInputChange}
          />
      </label>
      <label>
        Year  
        <input 
          name="year"
          id="year"
          type="text"
          onChange={handleInputChange}
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
