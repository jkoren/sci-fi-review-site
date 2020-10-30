import React from "react"

const ReviewTile = (props) => {
  return(
    <div className="callout secondary cell small-12">
      <p className="reviews">Rating: {props.rating} | Review: {props.body}</p>
    </div>
  )
}

export default ReviewTile