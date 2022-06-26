import axios from 'axios';
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../constants/productConstants';

export const getAllProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        });
        const data = await axios.get("/api/products");

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
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