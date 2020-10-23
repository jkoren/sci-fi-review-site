import React from "react"

const ReviewTile = (props) => {
  return(
    <div>
    <p>{props.rating} - {props.body}</p>
  </div>
  )
}

export default ReviewTile