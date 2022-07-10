import axios from 'axios';
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../constants/productConstants';

export const getAllProducts = (keyword="", currentPage=1, price=[0, 500000], category="", rating=0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        });

        let link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

        if(category) {
            link = link + `&category=${category}`
        }

        const data = await axios.get(link);

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const getProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_REQUEST,
        });
        const data = await axios.get(`/api/product/${id}`);

        dispatch({
            type: PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}