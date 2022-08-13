import { CLEAR_ERRORS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, VIEW_MY_ORDERS_FAILURE, VIEW_MY_ORDERS_REQUEST, VIEW_MY_ORDERS_SUCCESS } from "../constants/orderConstants";


export const createNewOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }   
        
        case CREATE_ORDER_FAILURE:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
           return state
    }
}

export const viewMyOrdersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case VIEW_MY_ORDERS_REQUEST:
            return {
                loading: true
            }

        case VIEW_MY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }   
        
        case VIEW_MY_ORDERS_FAILURE:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
           return state
    }
}

export const orderDetailsReducer = (state = {order: {}}, action) => {
    switch(action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }   
        
        case ORDER_DETAILS_FAILURE:
            return {
                loading: true,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
           return state
    }
}