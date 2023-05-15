import {
	NEW_INVOICE_REQUEST,
	NEW_INVOICE_SUCCESS,
	NEW_INVOICE_FAILURE,
	ALL_INVOICES_REQUEST,
	ALL_INVOICES_SUCCESS,
	ALL_INVOICES_FAILURE,
	INVOICE_DETAILS_REQUEST,
	INVOICE_DETAILS_SUCCESS,
	INVOICE_DETAILS_FAILURE,
	DELETE_INVOICE_REQUEST,
	DELETE_INVOICE_SUCCESS,
	DELETE_INVOICE_FAILURE,
	CLEAR_ERRORS,
} from "../constants/invoiceConstants.js";
import axios from "axios";

// ? New Invoice
export const newInvoice = (invoice) => async (dispatch, getState) => {
	try {
		dispatch({ type: NEW_INVOICE_REQUEST });
		const { userLogin: { manager } } = getState();
		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.post(
			`/invoiceapi/new-invoice`,
			invoice,
			config
		);
		dispatch({
			type: NEW_INVOICE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: NEW_INVOICE_FAILURE, payload: error.message });
	}
};

// ? All Invoices
export const getAllInvoices = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ALL_INVOICES_REQUEST });
		const { userLogin: { manager } } = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.get(`/invoiceapi/all-invoice`, config);
		dispatch({
			type: ALL_INVOICES_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ALL_INVOICES_FAILURE,
			payload: error.message
		});
	}
};

// ? Invoice Details
export const getInvoiceDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: INVOICE_DETAILS_REQUEST });
		const { userLogin: { manager } } = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.get(`/invoiceapi/invoice/${id}`, config);
		dispatch({
			type: INVOICE_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: INVOICE_DETAILS_FAILURE,
			payload: error.message
		});
	}
};

// ? Delete Invoice
export const deleteInvoice = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_INVOICE_REQUEST });
		const { userLogin: { manager } } = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.delete(`/invoiceapi/invoice/${id}`, config);
		dispatch({
			type: DELETE_INVOICE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: DELETE_INVOICE_FAILURE,
			payload: error.message
		});
	}
};

// ? Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
