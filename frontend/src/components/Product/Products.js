import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import { getAllProducts } from '../../actions/productAction';
import Product from '../Home/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";


const Products = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { loading, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.allProducts);

    const [currentPage, setCurrentPage] = useState(1);
    

    const setCurrentPageNumber = (e) => {
      setCurrentPage(e);
    }

    const [price, setPrice] = useState([0, 500000]);

    const priceHandler = (event, newPrice) => {
      setPrice(newPrice);
    };

    useEffect(() => {
      dispatch(getAllProducts(keyword, currentPage, price));
    }, [dispatch, keyword, currentPage, price])
    
  return (
    <Fragment>
        { loading ? (<Loading />) : (<Fragment>
            <h2 className='productsHeader'>PRODUCTS</h2>
            <div className="products">
                {products && products.map((product, index) => {
                    return <Product key={index} product={product} />
                })}
            </div>

            <div className="filterBox">
              <Typography>Price Range</Typography>
              <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={500000}
              />
            </div>

            {/* ONLY SHOW PAGINATION WHEN RESULTS PER PAGE IS LESS THAN PRODUCTS COUNT. */}
            { resultPerPage < filteredProductsCount && 
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