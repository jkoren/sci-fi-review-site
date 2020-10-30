import React from "react"

const MovieShow = (props) => {
  let poster
  if(props.movie_poster){
    if(props.movie_poster.url !== null){
      poster = <img className="padded" src={props.movie_poster.url} alt="movie poster" />
    }
  }
  return(
   
    <div className="tile">
      <div className = "grid-x grid-margin-x">
        <div className = "small-6 columns">
          <h2 className="field">{props.title}</h2>
          <h5 className="field">{props.year} </h5>
          <p className="field">{props.summary} </p>
        </div>
        <div className="small-6 columns">
          {poster}
        </div> 
      </div>
    </div>
  )
}
export default MovieShow