// NECESSARY IMPORTS
import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allProductsReducer, productReducer } from './reducers/productReducer';

const reducers = combineReducers({
    products: allProductsReducer,
    product: productReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;