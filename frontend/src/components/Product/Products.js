import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import { getAllProducts } from '../../actions/productAction';
import Product from '../Home/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';


const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.allProducts);

    const [currentPage, setCurrentPage] = useState(1);

    const setCurrentPageNumber = (e) => {
      setCurrentPage(e);
    }

    useEffect(() => {
      dispatch(getAllProducts(keyword, currentPage));
    }, [dispatch, keyword, currentPage])
    
  return (
    <Fragment>
        { loading ? (<Loading />) : (<Fragment>
            <h2 className='productsHeader'>PRODUCTS</h2>
            <div className="products">
                {products && products.map((product, index) => {
                    return <Product key={index} product={product} />
                })}
            </div>

            {/* ONLY SHOW PAGINATION WHEN RESULTS PER PAGE IS LESS THAN PDOCUTS COUNT. */}
            { resultPerPage < productsCount && 
              <div className="paginationBox">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNumber}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="First"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                  pageRangeDisplayed="3"
                />
              </div>
            }
        </Fragment>) }
    </Fragment>
  );
}

export default Products