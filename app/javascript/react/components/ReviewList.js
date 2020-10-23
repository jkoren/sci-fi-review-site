import React from "react"
import ReviewTile from  "./ReviewTile"

const ReviewList = (props) => {
  let reviewTiles 
  if(props.movieReviews){
    reviewTiles = props.movieReviews.map ((review) => {
      return ( <ReviewTile
        key={review.id}
        id={review.id}
        rating={review.rating}
        body={review.body}
      />
      )
    })
  }
  
  return (
    <ul>
      {reviewTiles}
    </ul>
  )
}
  export default ReviewList