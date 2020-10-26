import React from "react"

const MovieShow = (props) => {
  return(
    <div class="callout secondary cell small-6">
      <h2 class="field">{props.title}</h2>
      <h5>{props.year}</h5>
      <p>{props.summary}</p>
    </div>
  )
}
export default MovieShow