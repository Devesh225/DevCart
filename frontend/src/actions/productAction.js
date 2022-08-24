import axios from 'axios';
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAILURE, ADMIN_ALL_PRODUCT_REQUEST, ADMIN_ALL_PRODUCT_SUCCESS, ADMIN_ALL_PRODUCT_FAILURE, ADMIN_NEW_PRODUCT_REQUEST, ADMIN_NEW_PRODUCT_SUCCESS, ADMIN_NEW_PRODUCT_FAILURE, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_FAILURE, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_FAILURE } from '../constants/productConstants';

export const getAllProducts = (keyword="", currentPage=1, price=[0, 500000], category="", rating=0) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST,
        });

        let link = `/api/products?page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${rating}`;

        if(keyword) {
            link = link + `&keyword=${keyword}`
        }

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

export const addNewReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const data = await axios.put('/api/review', reviewData, config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const getAllProductsAdmin = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_ALL_PRODUCT_REQUEST,
        });
        
        const { data } = await axios.get(`/api/admin/products`);

        dispatch({
            type: ADMIN_ALL_PRODUCT_SUCCESS,
            payload: data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_ALL_PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const createNewProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_NEW_PRODUCT_REQUEST,
        });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        
        const { data } = await axios.post('/api/admin/product/new', productData, config);

        dispatch({
            type: ADMIN_NEW_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_NEW_PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_REQUEST,
        });
        
        const { data } = await axios.delete(`/api/admin/product/${id}`);

        dispatch({
            type: ADMIN_DELETE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_REQUEST,
        });
        
        const data = await axios.put(`/api/admin/product/${id}`);

        dispatch({
            type: ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_FAILURE,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}