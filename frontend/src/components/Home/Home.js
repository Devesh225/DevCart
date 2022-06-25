import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData';
import Product from './Product';
import { CgMouse } from  'react-icons/cg';
import { getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import './Home.css'

const Home = () => {

  // IMPLEMENTING REDUX
  const dispatch = useDispatch();
  const { loading, products, productCount, error } = useSelector(state=>state.products);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (<Loading />) : (
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
          {/* INSTEAD OF HARDCODED PRODUCTS FOR TESTING, WE MAP THROUGH THE products FETCHED THROUGH STATE FROM REDUX AND DISPLAY */}
          {products && products.map((product, index) => (
            <Product key={index} product={product} />
          ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Home