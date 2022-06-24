// We need to pass a state and an action, state is an empty list of products.
// Importing Constants 
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS } from '../constants/productConstants';


export const productReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                product: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload.data.products,
                productCount: action.payload.data.productCount
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