// We need to pass a state and an action, state is an empty list of products.
// Importing Constants 
import { ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAILURE, CLEAR_ERRORS, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAILURE, NEW_REVIEW_RESET, ADMIN_ALL_PRODUCT_REQUEST, ADMIN_ALL_PRODUCT_FAILURE, ADMIN_ALL_PRODUCT_SUCCESS, ADMIN_NEW_PRODUCT_REQUEST, ADMIN_NEW_PRODUCT_SUCCESS, ADMIN_NEW_PRODUCT_RESET, ADMIN_NEW_PRODUCT_FAILURE, ADMIN_DELETE_PRODUCT_REQUEST, ADMIN_DELETE_PRODUCT_SUCCESS, ADMIN_DELETE_PRODUCT_RESET, ADMIN_DELETE_PRODUCT_FAILURE, ADMIN_UPDATE_PRODUCT_REQUEST, ADMIN_UPDATE_PRODUCT_FAILURE, ADMIN_UPDATE_PRODUCT_SUCCESS, ADMIN_UPDATE_PRODUCT_RESET, ADMIN_ALL_REVIEW_REQUEST, ADMIN_ALL_REVIEW_SUCCESS, ADMIN_ALL_REVIEW_FAILURE, ADMIN_DELETE_REVIEW_REQUEST, ADMIN_DELETE_REVIEW_SUCCESS, ADMIN_DELETE_REVIEW_RESET, ADMIN_DELETE_REVIEW_FAILURE } from '../constants/productConstants';


export const allProductsReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_ALL_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }

        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.data.products,
                productsCount: action.payload.data.productCount,
                resultPerPage: action.payload.data.resultPerPage,
                filteredProductsCount: action.payload.data.filteredProductsCount
            }
        
        case ADMIN_ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload
            }

        case ALL_PRODUCT_FAILURE:
        case ADMIN_ALL_PRODUCT_FAILURE:
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            }

        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }

        case NEW_REVIEW_RESET:
            return {
                ...state,
                success: false,
            }
        
        case NEW_REVIEW_FAILURE:
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

export const newProductAdminReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case ADMIN_NEW_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }

        case ADMIN_NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                product: action.payload.product
            }

        case ADMIN_NEW_PRODUCT_RESET:
            return {
                ...state,
                success: false,
            }
        
        case ADMIN_NEW_PRODUCT_FAILURE:
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

export const productAdminReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_PRODUCT_REQUEST:
        case ADMIN_UPDATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }

        case ADMIN_DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case ADMIN_UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case ADMIN_DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            }

        case ADMIN_UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        
        case ADMIN_DELETE_PRODUCT_FAILURE:
        case ADMIN_UPDATE_PRODUCT_FAILURE:
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

export const productReviewsAdminReducer = (state = {reviews: []}, action) => {
    switch (action.type) {
        case ADMIN_ALL_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            }

        case ADMIN_ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload
            }
        
        case ADMIN_ALL_REVIEW_FAILURE:
            return {
                ...state,
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

export const deleteReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            }

        case ADMIN_DELETE_REVIEW_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }

        case ADMIN_DELETE_REVIEW_RESET:
            return {
                ...state,
                isDeleted: false,
            }
        
        case ADMIN_DELETE_REVIEW_FAILURE:
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