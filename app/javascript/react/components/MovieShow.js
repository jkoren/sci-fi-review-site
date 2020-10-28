import React from "react"

const MovieShow = (props) => {
  return(
    <div className="callout secondary cell small-6">
      <h2 className="field">{props.title}</h2>
      <h5>{props.year}</h5>
      <p>{props.summary}</p>
    </div>
  )
}
export default MovieShow