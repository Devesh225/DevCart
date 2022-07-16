import axios from 'axios';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE} from '../constants/userConstants';

export const login = (email, password) => async(dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.post(
            `/api/login`,
            {email, password},
            config
        );

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: LOGIN_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const register = (userFormData) => async(dispatch) => {
    try {
        dispatch({
            type: REGISTER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const data = await axios.post(
            `/api/register`,
            userFormData,
            config
        );

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: REGISTER_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}