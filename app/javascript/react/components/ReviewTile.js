import React, { useState, useEffect } from "react"

const ReviewTile = (props) => {
  const [votes, setVotes] = useState()
  const [error, setError] = useState("")
  
  useEffect(() => {
    let num = 0
    props.votes.forEach(voteObj => {
    num += voteObj.vote
    })
    setVotes(num)
  }, [])

  const voteHandler = (reviewID, vote, event) => {
    setError("")
    event.preventDefault()
    let votePayLoad = {
      reviewID: reviewID,
      voteType: vote
    }
    fetch('/api/v1/votes', {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(votePayLoad),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
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
          setVotes(body)
        }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
  }
  return(
    <div className="callout secondary cell small-12">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
      <p className="reviews">Rating: {props.rating} | Review: {props.body}</p>
      <p>{error}</p>
      <span>
        <button className="button" onClick={(event) => voteHandler(props.id, 1, event)}>Upvote</button>
      </span>
      <span>
        <button className="button" onClick={(event) => voteHandler(props.id, -1, event)}>Downvote</button>
      </span>
      <span>
        {votes == 1
          ?  <i className="fas fa-arrow-circle-up"></i>
          : <i className="fas fa-arrow-up"></i>
        }
        {votes == -1
          ? <i className="fas fa-arrow-circle-down"></i>
          : <i className="fas fa-arrow-down"></i>
        }
        {votes}
      </span>
    </div>
  )
}
export default ReviewTile
