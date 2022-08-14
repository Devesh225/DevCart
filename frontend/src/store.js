// NECESSARY IMPORTS
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allProductsReducer, newReviewReducer, productReducer } from './reducers/productReducer';
import { userReducer, updateProfileReducer, forgotPasswordReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { createNewOrderReducer, orderDetailsReducer, viewMyOrdersReducer } from './reducers/orderReducer';

const reducers = combineReducers({
    allProducts: allProductsReducer,
    product: productReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: createNewOrderReducer,
    myOrders: viewMyOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : []
    }
};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;