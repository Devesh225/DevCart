import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData';
import { CgMouse } from  'react-icons/cg';
import Product from './Product.js'
import './Home.css'

// SAMPLE PRODUCT USED FOR TESTING BEFORE REDUX IMPLEMENTATION
const product = {
  _id: "P001",
  name: "Apple iPhone X",
  price: 150000,
  images: [{
    url: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpriceinsouthafrica.com%2Fwp-content%2Fuploads%2F2020%2F03%2FApple-iPhone-X-1536x1536.jpg&f=1&nofb=1"
  }]
};

const Home = () => {
  return (
    <Fragment>

      <MetaData title="DevCart" />

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
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
          <Product product={product} />
        </div>
    </Fragment>
  )
}

export default Home