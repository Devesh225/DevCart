import { CLEAR_ERRORS, LOAD_LOGGED_IN_USER_FAILURE, LOAD_LOGGED_IN_USER_REQUEST, LOAD_LOGGED_IN_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/userConstants";

export const userReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_LOGGED_IN_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            };
        case LOGIN_SUCCESS: 
        case REGISTER_SUCCESS:
        case LOAD_LOGGED_IN_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.data.user
            }
        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGIN_FAILURE: 
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOAD_LOGGED_IN_USER_FAILURE:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }
        case LOGOUT_FAILURE:
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