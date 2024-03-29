import { ADMIN_ALL_USER_FAILURE, ADMIN_ALL_USER_REQUEST, ADMIN_ALL_USER_SUCCESS, ADMIN_DELETE_USER_FAILURE, ADMIN_DELETE_USER_REQUEST, ADMIN_DELETE_USER_RESET, ADMIN_DELETE_USER_SUCCESS, ADMIN_UPDATE_USER_FAILURE, ADMIN_UPDATE_USER_REQUEST, ADMIN_UPDATE_USER_RESET, ADMIN_UPDATE_USER_SUCCESS, ADMIN_USER_FAILURE, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS, CLEAR_ERRORS, FORGOT_PASSWORD_FAILURE, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_LOGGED_IN_USER_FAILURE, LOAD_LOGGED_IN_USER_REQUEST, LOAD_LOGGED_IN_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAILURE, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, RESET_PASSWORD_FAILURE, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS } from "../constants/userConstants";

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

export const updateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case ADMIN_UPDATE_USER_REQUEST:
        case ADMIN_DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_PROFILE_SUCCESS: 
        case UPDATE_PASSWORD_SUCCESS:
        case ADMIN_UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case ADMIN_DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload.success,
                message: action.payload.message
            }

        case UPDATE_PROFILE_FAILURE:
        case UPDATE_PASSWORD_FAILURE:
        case ADMIN_UPDATE_USER_FAILURE:
        case ADMIN_DELETE_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case ADMIN_UPDATE_USER_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case ADMIN_DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FORGOT_PASSWORD_SUCCESS: 
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case FORGOT_PASSWORD_FAILURE:
        case RESET_PASSWORD_FAILURE:
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

export const adminAllUsersReducer = (state = {users: []}, action) => {
    switch (action.type) {
        case ADMIN_ALL_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADMIN_ALL_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case ADMIN_ALL_USER_FAILURE:
            return {
                ...state,
                loading: false,
                success: action.payload
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

export const adminUserReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case ADMIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ADMIN_USER_SUCCESS: 
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case ADMIN_USER_FAILURE:
            return {
                ...state,
                loading: false,
                success: action.payload
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

