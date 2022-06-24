import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Product.css';

const Product = ({ product }) => {

  const options = {
    edit: false, // CANNOT EDIT THE STARS
    color: "#393E46",
    activeColor: "#00ADB5",
    value: product.rating,
    isHalf: true, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
    size: window.innerWidth < 600 ? 15 : 20
  }

  return (
    <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> <span>({product.numberOfReviews} Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product