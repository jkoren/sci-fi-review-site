import React from "react"
import ReviewFormContainer from "./ReviewForm"
const MovieShow = (props) => {

  return(
    <div>
      <h2>{props.title}</h2>
      <h5>{props.year}</h5>
      <p>{props.summary}</p>
    </div>
  )
}
export default MovieShow