import React, { useState, useEffect } from "react"
import MovieShow from "./MovieShow"
import ReviewList from "./ReviewList"
import _ from "lodash" 
import ReviewErrorList from "./ReviewErrorList"
import ReviewForm from "./ReviewForm"
const MovieShowContainer = (props) => {
  const [movie, setMovie] = useState({})
  const [errors, setErrors] = useState({})
  const [reviews, setReviews] = useState(null)
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

  if (movie.title && !reviews){
    setReviews(movie.reviews)
  }
  const validforSubmission = (submittedReview) => {
    let submittedErrors = {}
    const requiredFields = ["rating"]
    requiredFields.forEach(field => {
      if (submittedReview[field].trim() === "") {
        submittedErrors = {
          ...submittedErrors,
          [field]: "is blank"
        }
      }
    })
    setErrors(submittedErrors)
    return _.isEmpty(submittedErrors)
  }
  const addNewReview = (newReviewObject) => {
    event.preventDefault() 
    if (validforSubmission(newReviewObject)) {
      fetch(`/api/v1/movies/${id}/reviews.json`, {
        method: "POST",
        body: JSON.stringify(newReviewObject),
        credentials: "same-origin",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(body => {
        if (body.errors === undefined) {
          setReviews([
            ...reviews,
            body
          ])
        } else {
          const requiredFields = ["rating"]
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
        movieReviews={reviews}
      />
      <ReviewErrorList errors={errors} />
      <ReviewForm addNewReviewFunction={addNewReview} />
    </div>
  )
}

export default MovieShowContainer 