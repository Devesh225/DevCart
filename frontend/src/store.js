// NECESSARY IMPORTS
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allProductsReducer, productReducer } from './reducers/productReducer';
import { userReducer, updateProfileReducer, forgotPasswordReducer } from './reducers/userReducer';

const reducers = combineReducers({
    allProducts: allProductsReducer,
    product: productReducer,
    user: userReducer,
    profile: updateProfileReducer,
    forgotPassword: forgotPasswordReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;