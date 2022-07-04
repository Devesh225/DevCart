import React, { Fragment, useEffect } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import { getAllProducts } from '../../actions/productAction';
import Product from '../Home/Product';


const Products = () => {
    const dispatch = useDispatch();

    const { loading, error, products, productsCount } = useSelector(state => state.allProducts);

    useEffect(() => {
      dispatch(getAllProducts());
    }, [dispatch])
    
  return (
    <Fragment>
        { loading ? (<Loading />) : (<Fragment>
            <h2 className='productsHeader'>PRODUCTS</h2>
            <div className="products">
                {products && products.map((product, index) => {
                    return <Product key={index} product={product} />
                })}
            </div>
        </Fragment>) }
    </Fragment>
  );
}

export default Products