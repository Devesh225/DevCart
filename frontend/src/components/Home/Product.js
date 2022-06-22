import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import './Product.css';

const options = {
    edit: false, // CANNOT EDIT THE STARS
    color: "#393E46",
    activeColor: "#00ADB5",
    value: 3.5,
    isHalf: true, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
    size: window.innerWidth < 600 ? "15vmax" : "20vmax"
}

const Product = ({ product }) => {
  return (
    <Link className="productCard" to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options} /> <span>(28 Reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product