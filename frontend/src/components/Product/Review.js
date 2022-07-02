import React from 'react'
import ReactStars from 'react-rating-stars-component'

const Review = ({ review }) => {

    const options = {
        edit: false, // CANNOT EDIT THE STARS
        color: "#393E46",
        activeColor: "#ffd700", 
        value: review.rating,
        isHalf: true, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
        size: window.innerWidth < 600 ? 15 : 20,
    }


  return (
    <div className='reviewCard'>
        <img src={review.profilePicture} alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
    </div>
  )
}

export default Review