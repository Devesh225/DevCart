import axios from 'axios';
import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, CLEAR_ERRORS, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOAD_LOGGED_IN_USER_REQUEST, LOAD_LOGGED_IN_USER_SUCCESS, LOAD_LOGGED_IN_USER_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE, ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ADMIN_ALL_USER_FAILURE, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS, ADMIN_USER_FAILURE, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_SUCCESS, ADMIN_UPDATE_USER_FAILURE, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_SUCCESS, ADMIN_DELETE_USER_FAILURE} from '../constants/userConstants';

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

export const loadLoggedInUser = () => async(dispatch) => {
    try {
        dispatch({
            type: LOAD_LOGGED_IN_USER_REQUEST
        });

        const data = await axios.get(`/api/me`,);

        dispatch({
            type: LOAD_LOGGED_IN_USER_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: LOAD_LOGGED_IN_USER_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const logout = () => async(dispatch) => {
    try {

        await axios.get(`/api/logout`);

        dispatch({
            type: LOGOUT_SUCCESS
        })


    } catch (error) {
        dispatch({
            type: LOGOUT_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const updateProfile = (userFormData) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const data = await axios.put(
            `/api/me/update`,
            userFormData,
            config
        );

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const updatePassword = (passwordData) => async(dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.put(
            `/api/password/update`,
            passwordData,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const forgotPassword = (email) => async(dispatch) => {
    try {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.post(
            `/api/password/forgot`,
            email,
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const resetPassword = (token, passwordData) => async(dispatch) => {
    try {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const data = await axios.put(
            `/api/password/reset/${token}`,
            passwordData,
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const adminViewAllUsers = () => async(dispatch) => {
    try {
        dispatch({
            type: ADMIN_ALL_USER_REQUEST
        });

        const { data } = await axios.get(`/api/admin/users`,);

        dispatch({
            type: ADMIN_ALL_USER_SUCCESS,
            payload: data.users
        })


    } catch (error) {
        dispatch({
            type: ADMIN_ALL_USER_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const adminGetUserDetails= (id) => async(dispatch) => {
    try {
        dispatch({
            type: ADMIN_USER_REQUEST
        });

        const { data } = await axios.get(`/api/admin/user/${id}`);

        dispatch({
            type: ADMIN_USER_SUCCESS,
            payload: data.user
        })


    } catch (error) {
        dispatch({
            type: ADMIN_USER_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const updateUser = (id, userData) => async(dispatch) => {
    try {
        dispatch({
            type: ADMIN_UPDATE_USER_REQUEST
        });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.get(`/api/admin/user/${id}`, userData, config);

        dispatch({
            type: ADMIN_UPDATE_USER_SUCCESS,
            payload: data 
        })


    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_USER_FAILURE,
            payload: error.response.data.message
        });
    }
};

export const deleteUser = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ADMIN_DELETE_USER_REQUEST
        });

        const { data } = await axios.delete(`/api/admin/user/${id}`);

        dispatch({
            type: ADMIN_DELETE_USER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_USER_FAILURE,
            payload: error.response.data.message
        });
    }
};


export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};