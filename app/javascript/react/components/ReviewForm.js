import React, { useState, useEffect } from "react"

const ReviewForm = (props) => {

  const [newReview, setNewReview] = useState({
    rating: "",
    body: ""
  })

  const handleChange = (event) => {
    setNewReview({
      ...newReview,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(1)
    props.addNewReviewFunction(newReview)
    setNewReview({
      rating: "",
      body: ""
    })
  }
  return (
    <form className="new-review-form callout" onSubmit={handleSubmit}>
      <label>
        Rating:
        <input
          name="rating"
          id="rating"
          type="number"
          onChange={handleChange}
          value={newReview.rating}
        />
      </label>
      <label>
        Review Body:
        <input
          name="body"
          id="body"
          type="text"
          onChange={handleChange}
          value={newReview.body}
        />
      </label>

      <div className="button-group">
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ReviewForm
