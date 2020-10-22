import React, { useState } from 'react'
import ErrorList from './ErrorList'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'

const MoviesFormContainer = (props) => {
  const [submittedMovie, setSubmittedMovie] = useState({
    title: "",
    summary: "",
    year: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState({
    redirect: false,
    id: ""
  })
  const [errors, setErrors] = useState({})

  const validforSubmission = () => {
    let submittedErrors = {}
    const requiredFields = ["title", "summary", "year"]
    requiredFields.forEach(field => {
      if (submittedMovie[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }

  const inputChangeHandler = (event) => {
    setSubmittedMovie({
      ...submittedMovie,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    if (validforSubmission()) {
      debugger
      fetch('/api/v1/movies.json', {
        method: "POST",
        body: JSON.stringify(submittedMovie),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          // error stuff
        }
      }) 
      .then(body => {
        setShouldRedirect({
          redirect: true,
          id: body.id
        })
      })
    }
  }

  if (shouldRedirect.redirect) {
    return <Redirect to={`/movies/${shouldRedirect.id}`}/>
  }

  return(
    <form onSubmit={onClickHandler}>
      <ErrorList errors={errors} />
      <label>
        Title
        <input 
          name="title"
          id="title"
          type="text"
          onChange={inputChangeHandler}
          value={submittedMovie.title}
          />
      </label>
      <label>
        Summary
        <input 
          name="summary"
          id="summary"
          type="text"
          onChange={inputChangeHandler}
          value={submittedMovie.summary}
          />
      </label>
      <label>
        Year  
        <input 
          name="year"
          id="year"
          type="text"
          onChange={inputChangeHandler}
          value={submittedMovie.year}
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
