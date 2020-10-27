import React, { useState } from "react"

const ReviewTile = (props) => {
  const [upvotes, setUpvotes] = useState()

  const upvoteHandler = (reviewID, event) => {
    event.preventDefault()
    fetch(`/api/v1/reviews/${reviewID}/upvotes.json`, {
      method: "POST",
      credentials: "same-origin"
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
      <p onClick={(event) => upvoteHandler(props.id, event)}>Upvote</p>
      <p>{upvotes}</p>
    </div>
  )
}

export default ReviewTile
