import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';

const ProductDetails = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const { product } = useSelector(state => state.product);
     
    useEffect(() => {

        dispatch(getProduct(id));

    }, [dispatch, id]);
    

    return (
        <Fragment>
            <div className="productDetails">
                <div>
                    <Carousel>
                        { product.images && product.images.map((image, index) => (
                            <img className="carouselImage" key={index} src={image.url} alt={`Slide ${index+1}`} />
                        ))}
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars />
                        <span className="detailsBlock-2-span"> ({product.numOfReviews} Reviews) </span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input readOnly type="number" />
                                <button>+</button>
                            </div>
                            <button
                                disabled={product.Stock < 1 ? true : false}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p>
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                            {product.Stock < 1 ? "Currently Out Of Stock" : "Currently Available"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                    <button className="submitReview">
                        Submit Review
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductDetails