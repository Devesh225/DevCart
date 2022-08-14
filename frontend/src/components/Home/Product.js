import React from 'react'
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import './Product.css';

const Product = ({ product }) => {

  const options = {
    readOnly: true, // CANNOT EDIT THE STARS
    value: product.rating,
    precision: 0.5, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
    size: "medium",
}

  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <Rating {...options} /> <span className="review_span">({product.numberOfReviews} Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product