// We need to pass a state and an action, state is an empty list of products.
// Importing Constants 
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../constants/productConstants';


export const allProductsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.data.products,
                productsCount: action.payload.data.productCount
            }
        
        case ALL_PRODUCT_FAILURE:
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
            return state;
    }
}

export const productReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }

        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.data.product,
            }
        
        case PRODUCT_FAILURE:
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
            return state;
    }
}