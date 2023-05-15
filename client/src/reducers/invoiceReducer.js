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

export const newInvoiceReducer = (state = {}, action) => {
	switch (action.type) {
		case NEW_INVOICE_REQUEST:
			return {
				...state,
				loading: true,
			};
		case NEW_INVOICE_SUCCESS:
			return {
				...state,
				loading: false,
				invoice: action.payload,
			};
		case NEW_INVOICE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const allInvoicesReducer = (state = { invoices: [] }, action) => {
	switch (action.type) {
		case ALL_INVOICES_REQUEST:
			return {
				...state,
				loading: true,
			};
		case ALL_INVOICES_SUCCESS:
			return {
				...state,
				loading: false,
				invoices: action.payload,
			};
		case ALL_INVOICES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export const invoiceDetailsReducer = (state = {}, action) => {
	switch (action.type) {
		case INVOICE_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};
		case INVOICE_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				invoice: action.paylaod,
			}
		case INVOICE_DETAILS_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state;
	}
};

export const deleteInvoiceReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_INVOICE_REQUEST:
			return {
				...state,
				loading: true,
			}
		case DELETE_INVOICE_SUCCESS:
			return {
				...state,
				loading: false,
				invoice: {},
			}
		case DELETE_INVOICE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload,
			}
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			}
		default:
			return state;
	}
};
