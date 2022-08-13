import axios from 'axios';
import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERRORS, VIEW_MY_ORDERS_FAILURE, VIEW_MY_ORDERS_REQUEST, VIEW_MY_ORDERS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE } from '../constants/orderConstants';

export const createNewOrder = (order) => async(dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        });

        const config = {
            headers: {
                "Content-Type" : "application/json"
            }
        }

        const { data } = await axios.post("/api/order/new", order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response.data.message 
        })
    }
}

export const viewMyOrders = () => async(dispatch) => {
    try {
        dispatch({
            type: VIEW_MY_ORDERS_REQUEST
        });

        const { data } = await axios.get("/api/orders/me");

        dispatch({
            type: VIEW_MY_ORDERS_SUCCESS,
            payload: data.orders
        })


    } catch (error) {
        dispatch({
            type: VIEW_MY_ORDERS_FAILURE,
            payload: error.response.data.message 
        })
    }
}

export const getOrderDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        });

        const { data } = await axios.get(`/api/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })


    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response.data.message 
        })
    }
}


export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}