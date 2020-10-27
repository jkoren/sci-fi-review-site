import React, { useState, useEffect } from "react"

const ReviewTile = (props) => {
  const [upvotes, setUpvotes] = useState()
  const [error, setError] = useState("")

  useEffect(() => {
    setError("")
    fetch(`/api/v1/reviews/${props.id}/upvotes.json`)
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
      setUpvotes(body) 
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }, [])

  const upvoteHandler = (reviewID, event) => {
    setError("")
    event.preventDefault()
    fetch(`/api/v1/reviews/${reviewID}/upvotes.json`, {
      method: "POST",
      credentials: "same-origin"
    })
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
        if (isNaN(body)) {
          setError(body)
        } else {
          setUpvotes(body)
        }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div className="callout secondary cell small-6">
      <p>{props.rating} - {props.body}</p>
      <p>{error}</p>
      <button className="button" onClick={(event) => upvoteHandler(props.id, event)}>Upvote</button>
      <p>{upvotes}</p>
    </div>
  )
}

export default ReviewTile
