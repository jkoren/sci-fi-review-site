import React from "react"
import _ from "lodash"

const ReviewErrorList = props => { 

  const errantFields = Object.keys(props.errors)
  if (errantFields.length > 0) {
    let index = 0
    const listItems = errantFields.map(field => {
      index++
      return (
        <div>
        <li key={index}>
          {_.capitalize(field)} {props.errors[field]}
        </li>
        </div>
      )
   })
    return (
      <div className="callout alert">
        <ul>{listItems}</ul>
      </div>
    )
  }else if(props.error){
    return (
    <div className="callout alert">
      <ul>
        <li>{props.error}</li>
      </ul>
    </div>
    )
  }else {
    return ""
  }
}

export default ReviewErrorList
