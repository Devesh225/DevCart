import { ADMIN_ALL_ORDER_FAILURE, ADMIN_ALL_ORDER_REQUEST, ADMIN_ALL_ORDER_SUCCESS, ADMIN_DELETE_ORDER_FAILURE, ADMIN_DELETE_ORDER_REQUEST, ADMIN_DELETE_ORDER_RESET, ADMIN_DELETE_ORDER_SUCCESS, ADMIN_UPDATE_ORDER_FAILURE, ADMIN_UPDATE_ORDER_REQUEST, ADMIN_UPDATE_ORDER_RESET, ADMIN_UPDATE_ORDER_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, VIEW_MY_ORDERS_FAILURE, VIEW_MY_ORDERS_REQUEST, VIEW_MY_ORDERS_SUCCESS } from "../constants/orderConstants";


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
                loading: false,
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
                loading: false,
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
                loading: false,
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

export const adminAllOrdersReducer = (state = {orders: []}, action) => {
    switch(action.type) {
        case ADMIN_ALL_ORDER_REQUEST:
            return {
                loading: true
            }

        case ADMIN_ALL_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }   
        
        case ADMIN_ALL_ORDER_FAILURE:
            return {
                loading: false,
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

export const adminOrderReducer = (state = {}, action) => {
    switch(action.type) {
        case ADMIN_DELETE_ORDER_REQUEST:
        case ADMIN_UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ADMIN_DELETE_ORDER_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }  
        
        case ADMIN_UPDATE_ORDER_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }   
        
        case ADMIN_DELETE_ORDER_FAILURE:
        case ADMIN_UPDATE_ORDER_FAILURE:
            return {
                loading: false,
                error: action.payload
            }
        
        case ADMIN_DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false
            }   
        
        case ADMIN_UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false
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