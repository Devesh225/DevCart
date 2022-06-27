import React, { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom'
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
            </div>
        </Fragment>
    )
}

export default ProductDetails