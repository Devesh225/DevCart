import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData';
import { CgMouse } from  'react-icons/cg';
import { clearErrors, getAllProducts } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import { useAlert } from 'react-alert';
import './Home.css'
import Product from './Product';

const Home = () => {

  const alert = useAlert();

  // IMPLEMENTING REDUX
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector(state=>state.allProducts);

  useEffect(() => {
    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getAllProducts());
  }, [dispatch, error, alert]);

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