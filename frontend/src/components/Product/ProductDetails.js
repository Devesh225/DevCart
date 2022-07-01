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

    const options = {
        edit: false, // CANNOT EDIT THE STARS
        color: "#393E46",
        activeColor: "#ffd700", 
        value: product.rating,
        isHalf: true, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
        size: window.innerWidth < 600 ? 15 : 20,
        onChange: product.rating
    }
    

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
                    <div className="detailsBlock_1">
                        <h2>{product.name}</h2>
                    </div>
                    <div className="detailsBlock_2">
                        <ReactStars {...options} />
                        <span className="detailsBlock_2_span"> ({product.numberOfReviews} Reviews) </span>
                    </div>
                    <div className="detailsBlock_3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock_3_1">
                            <div className="detailsBlock_3_1_1">
                                <button>-</button>
                                <input readOnly type="number" />
                                <button>+</button>
                            </div>
                            <button
                                disabled={product.stock < 1 ? true : false}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p>
                            Status:
                            &nbsp;
                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                            {product.stock < 1 ? "Currently Out Of Stock" : "Currently Available"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock_4">
                        Description <p>{product.description}</p>
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