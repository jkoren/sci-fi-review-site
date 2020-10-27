import React, { useState, useEffect } from "react"

const ReviewTile = (props) => {
  const [upvotes, setUpvotes] = useState()

  useEffect(() => {
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
      setUpvotes(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
      <p>{props.rating} - {props.body}</p>
      <button className="button" onClick={(event) => upvoteHandler(props.id, event)}>Upvote</button>
      <p>{upvotes}</p>
    </div>
  )
}

export default ReviewTile
