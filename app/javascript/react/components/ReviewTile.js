import React, { useState, useEffect } from "react"

const ReviewTile = (props) => {
  const [votes, setVotes] = useState()
  const [error, setError] = useState("")
  useEffect(() => {
    setError("")
    let votePayLoad = {
      reviewID: props.id
    }
    fetch('/api/v1/votes', {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(votePayLoad),
      headers: {
        Accept: "application/json",
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
      setVotes(body) 
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
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
        Accept: "application/json",
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
    <div className="callout secondary cell small-6">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"/>
      <p>{props.rating} - {props.body}</p>
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
