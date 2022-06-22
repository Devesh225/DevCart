import React, { Fragment } from 'react'
import { CgMouse } from  'react-icons/cg';
import Product from './Product.js'
import './Home.css'

// SAMPLE PRODUCT USED FOR TESTING BEFORE REDUX IMPLEMENTATION
const product = {
  _id: "jwavavapgvpava",
  name: "Apple iPhone X",
  price: 150000,
  images: [{
    url: "sample URL"
  }]
};

const Home = () => {
  return (
    <Fragment>
        <div className="banner">
            <h1>DevCart</h1>
            <p>A SHOPPING CART FOR DEVELOPERS</p>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
        </div>
        <h2 className="homeHeading">FEATURED PRODUCTS</h2>

        <div className="container" id="container">
          <Product product={product} />
        </div>
    </Fragment>
  )
}

export default Home