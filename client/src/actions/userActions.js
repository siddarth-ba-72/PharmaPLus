import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOGOUT_USER,
	CLEAR_ERRORS
} from '../constants/userConstants.js';
import axios from 'axios';

// ? Login
export const loginUser = (username, password) => async dispatch => {
	try {
		dispatch({ type: LOGIN_REQUEST });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const { data } = await axios.post(
			`/authapi/login`,
			{ username, password },
			config
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data,
		});
		localStorage.setItem('datamanager', JSON.stringify(data));
	} catch (err) {
		dispatch({ type: LOGIN_FAIL, payload: err.response.data.message });
	}
};

// ? Register
export const registerUser = (username, password) => async dispatch => {
	try {
		dispatch({ type: REGISTER_USER_REQUEST });
		const config = { headers: { "Content-Type": "application/json" } };
		const { data } = await axios.post(
			`/authapi/create-data-manager`,
			{ username, password },
			config
		);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data
		});
		localStorage.setItem('datamanager', JSON.stringify(data));
	}
	catch (error) {
		dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.msg });
	}
};

// ? Logout
export const logoutUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOGOUT_USER });
		localStorage.removeItem('datamanager');
	} catch (error) {
		dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
	}
};

// ? Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};


