import axios from 'axios';
import { ADD_TO_CART } from '../constants/cartConstants';

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`);
  
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity,
        },
    });
    // SAVING CART DETAILS IN LOCAL STORAGE
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
