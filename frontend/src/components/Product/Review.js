import React from 'react'
import { Rating } from '@mui/material'
import './Review.css';

const Review = ({ review }) => {

  const options = {
    readOnly: true, // CANNOT EDIT THE STARS
    value: review.rating,
    precision: 0.5, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
    size: "medium",
  }


  return (
    <div className='reviewCard'>
        <img className="reviewImage" src={review.profilePicture} alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default Review