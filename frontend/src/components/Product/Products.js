import React, { Fragment, useEffect, useState } from 'react'
import './Products.css'
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../layout/Loading/Loading';
import { getAllProducts, clearErrors } from '../../actions/productAction';
import Product from '../Home/Product';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';


const Products = () => {

    const categories = [
        "Laptop",
        "Graphics Card",
        "RAM",
        "Cabinet",
        "Speaker",
        "Camera",
        "SmartPhone",
    ];

    const alert = useAlert();

    const dispatch = useDispatch();
    const { keyword } = useParams();
    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.allProducts);

    const [currentPage, setCurrentPage] = useState(1);
    

    const setCurrentPageNumber = (e) => {
      setCurrentPage(e);
    }

    const [price, setPrice] = useState([0, 500000]);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const priceHandler = (e, newPrice) => {
      setPrice(newPrice);
    };

    useEffect(() => {

      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      dispatch(getAllProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, keyword, currentPage, price, category, rating, error, alert])
    
  return (
    <Fragment>
        { loading ? (<Loading />) : (<Fragment>
            <MetaData title="Products" />
            <h2 className='productsHeader'>PRODUCTS</h2>
            <div className="products">
                {products && products.map((product, index) => {
                    return <Product key={index} product={product} />
                })}
            </div>
            <div className="filterBox">
              <div className="priceFilterBox">
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

              <div className="categoryFilterBox">
                <Typography>Categories</Typography>
                <ul className="categoryBox">
                  {categories.map((category, index) => (
                    <li
                      className="category-link"
                      key={index}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={rating}
                  onChange={(e, newRating) => {
                    setRating(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
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