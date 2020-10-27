import React from "react"

const ReviewTile = (props) => {

  const upvoteHandler = (reviewID, event) => {
    event.preventDefault()
    fetch(`/api/v1/reviews/${reviewID}/upvotes.json`, {
      method: "POST",
      credentials: "same-origin"
    })
    .then(response => response.json()) 
    .then(body => {
      debugger
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }

  return(
    <div>
      <p>{props.rating} - {props.body}</p>
      <p onClick={(event) => upvoteHandler(props.id, event)}>Upvote</p>
    </div>
  )
}

export default ReviewTile
