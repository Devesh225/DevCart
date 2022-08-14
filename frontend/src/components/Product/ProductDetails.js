import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import { useDispatch, useSelector } from 'react-redux';
import { addNewReview, clearErrors, getProduct } from '../../actions/productAction';
import Loading from '../layout/Loading/Loading';
import Review from './Review';
import { useAlert } from "react-alert"
import MetaData from '../layout/MetaData';
import { addItemsToCart } from '../../actions/cartAction';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@mui/material";
import { NEW_REVIEW_RESET } from '../../constants/productConstants';


const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const { product, loading, error } = useSelector(state => state.product);
    const { success, error: reviewError } = useSelector(
        (state) => state.newReview
    );

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const increaseQuantity = () => {
        if(product.stock <= quantity) 
            return;
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if(quantity <= 1) 
            return;
        setQuantity(quantity - 1);
    }

    const addItemsToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    }
     
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if(success) {
            alert.success("Review Submitted Successfully");
            dispatch({type: NEW_REVIEW_RESET});
        }
        dispatch(getProduct(id));

    }, [dispatch, id, alert, error, reviewError, success]);

    const options = {
        readOnly: true, // CANNOT EDIT THE STARS
        value: product.rating,
        precision: 0.5, // IF IT IS NOT GIVEN, RATINGS WILL BE SHOWN IN INTEGER VALUES, SO 3.5 WOULD BE SHOWN AS 3
        size: "medium",
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", id);
        dispatch(addNewReview(myForm));
        setOpen(false);
      };    
    

    return (
        <Fragment>
        { loading ? (
            <Loading />
            ) : (
                <Fragment>
                    <MetaData title={product.name} />
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
                                <Rating {...options} />
                                <span className="detailsBlock_2_span"> ({product.numberOfReviews} Reviews) </span>
                            </div>
                            <div className="detailsBlock_3">
                                <h1>{`₹${product.price}`}</h1>
                                <div className="detailsBlock_3_1">
                                    <div className="detailsBlock_3_1_1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input readOnly type="number" value={quantity}/>
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button
                                        disabled={product.stock < 1 ? true : false}
                                        onClick={addItemsToCartHandler}
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

                            <button onClick={submitReviewToggle} className="submitReview">
                                Submit Review
                            </button>
                        </div>
                    </div>

                    <h3 className='reviewsHeading'>REVIEWS</h3>

                    <Dialog aria-labelledby='simple-dialog-title' open={open} onClose={submitReviewToggle} >
                        <DialogTitle className='submitDialogTitle'>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                        <Rating className="submitDialogRating" onChange={(e) => setRating(e.target.value)} value={rating} size="large" />
                        <textarea className="submitDialogTextArea" cols="30" rows="5" value={comment} onChange={(e) => setComment(e.target.value)} />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {product.reviews ? (
                        <div className="reviews">
                            {product.reviews.map((review, index) => {
                                return <Review key={index} review={review} />
                            })}
                        </div>
                    ) : (
                        <p className='noReviews'>No Reviews Yet</p>
                    )}
                </Fragment>
            )
        }
        </Fragment>
    )
}

export default ProductDetails