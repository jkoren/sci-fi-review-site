import React, { useState, useEffect } from "react"

const ReviewTile = (props) => {
  const [upvotes, setUpvotes] = useState()
  const [error, setError] = useState("")

  useEffect(() => {
    setError("")
    fetch(`/api/v1/reviews/${props.id}/votes.json`)
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

  const voteHandler = (reviewID, vote, event) => {
    setError("")

    event.preventDefault()
    let userVote = new FormData()
    userVote.append("vote[type]", vote)
    fetch(`/api/v1/reviews/${reviewID}/votes.json`, {
      method: "POST",
      credentials: "same-origin",
      body: userVote
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
      <button className="button" onClick={(event) => voteHandler(props.id, 1, event)}>Upvote</button>
      <p>{upvotes}</p>
      <button className="button" onClick={(event) => voteHandler(props.id, -1, event)}>Downvote</button>
    </div>
  )
}

export default ReviewTile
