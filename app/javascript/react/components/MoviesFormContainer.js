import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { Redirect } from 'react-router-dom'

import _ from 'lodash'

import ErrorList from './ErrorList'

const MoviesFormContainer = (props) => {
  const [submittedMovie, setSubmittedMovie] = useState({
    title: "",
    summary: "",
    year: "",
    image: ""
  })
  const [shouldRedirect, setShouldRedirect] = useState({
    redirect: false,
    id: ""
  })
  const [errors, setErrors] = useState({})

  const handleFileUpload = (acceptedFiles) => {
    setSubmittedMovie({
      ...submittedMovie,
      image: acceptedFiles[0]
    })
  }

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
    let movie = new FormData()
    movie.append("movie[title]", submittedMovie.title)
    movie.append("movie[summary]", submittedMovie.summary)
    movie.append("movie[year]", submittedMovie.year)
    movie.append("movie[movie_poster]", submittedMovie.image)
    if (validforSubmission()) {
      fetch('/api/v1/movies.json', {
        method: "POST",
        body: movie,
        credentials: "same-origin"
      })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
        }
      }) 
      .then(body => {
        if (body.errors === undefined) {
          setShouldRedirect({
            redirect: true,
            id: body.id
          })
        } else {
          const requiredFields = ["title", "summary", "year"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
          })
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`))
    }
  }

  if (shouldRedirect.redirect) {
    return <Redirect to={`/movies/${shouldRedirect.id}`}/>
  }

  return(
    <div>
      <div>
        <p class="callout secondary cell small-6">To add a new movie please enter title, summary, and year!</p>
      </div>
      
      <div class="field">
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

          <Dropzone onDrop={handleFileUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Click to upload a movie poster</p>
                </div>
              </section>
            )}
          </Dropzone>

          <input
            type="submit"
            value="Add New Movie"
          />
      </form>
      </div>
    </div>
  )
}

export default MoviesFormContainer
