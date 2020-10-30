import React, { useState, useEffect } from "react"
import MovieShow from "./MovieShow"
import ReviewList from "./ReviewList"
import _ from "lodash" 
import ReviewErrorList from "./ReviewErrorList"
import ReviewForm from "./ReviewForm"

const MovieShowContainer = (props) => {
  const [movie, setMovie] = useState({})
  const [errors, setErrors] = useState({})
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState(null)
  const id = props.match.params.id 

  useEffect(() => {
    fetch(`/api/v1/movies/${id}`, {
      credentials: "same-origin"
    })
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
        setReviews(responseBody.reviews)
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`))
  }, [])

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
        if (body.errors) {
          const requiredFields = ["rating"]
          requiredFields.forEach(field => { 
            if (body.errors[field] !== undefined) {
              setErrors({
                ...errors,
                [field]: body.errors[field][0]
              })
            }
          })
        }else if(body.error){
          setError(body.error[0])
        }else {
          setReviews([
            ...reviews,
            body
          ])
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
        movie_poster={movie.movie_poster}
      />
      <h2 className="review-label-header">Reviews:</h2>
      <ReviewList
        movieReviews={reviews}
      />
      <ReviewErrorList errors={errors} 
      error={error}/>
      <ReviewForm addNewReviewFunction={addNewReview} />
      
    </div>
  )
}

export default MovieShowContainer 