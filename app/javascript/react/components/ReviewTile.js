import React from "react"

const ReviewTile = (props) => {
  return(
    <div class="callout secondary cell small-6">
    <li>{props.rating} - {props.body}</li>
  </div>
  )
}

export default ReviewTile