import React, { Fragment } from 'react'
import { CgMouse } from  'react-icons/cg';
import './Home.css'

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

            <h2 className="homeHeading">Featured Products</h2>
        </div>
    </Fragment>
  )
}

export default Home