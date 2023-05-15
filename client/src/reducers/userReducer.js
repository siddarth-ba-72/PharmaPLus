import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOGOUT_USER,
	CLEAR_ERRORS,
} from '../constants/userConstants.js';

export const managerLoginReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				loading: true,
			};
		case LOGIN_SUCCESS:
			return {
				loading: false,
				manager: action.payload,
			};
		case LOGIN_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LOGOUT_USER:
			return {
				manager: null,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
}

export const managerRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER_REQUEST:
			return {
				loading: true,
			};
		case REGISTER_USER_SUCCESS:
			return {
				loading: false,
				manager: action.payload,
			};
		case REGISTER_USER_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		case LOGOUT_USER:
			return {};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
}
