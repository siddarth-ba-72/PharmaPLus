import {
	ALL_MEDICINE_REQUEST,
	ALL_MEDICINE_SUCCESS,
	ALL_MEDICINE_FAIL,
	MEDICINE_DETAILS_REQUEST,
	MEDICINE_DETAILS_SUCCESS,
	MEDICINE_DETAILS_FAIL,
	STOCK_DETAILS_REQUEST,
	STOCK_DETAILS_SUCCESS,
	STOCK_DETAILS_FAIL,
	MED_STOCK_REQUEST,
	MED_STOCK_SUCCESS,
	MED_STOCK_FAIL,
	CREATE_MEDICINE_REQUEST,
	CREATE_MEDICINE_SUCCESS,
	CREATE_MEDICINE_FAIL,
	CREATE_MEDICINE_RESET,
	ADD_MEDICINE_STOCK_REQUEST,
	ADD_MEDICINE_STOCK_SUCCESS,
	ADD_MEDICINE_STOCK_FAIL,
	ADD_MEDICINE_STOCK_RESET,
	UPDATE_MEDICINE_REQUEST,
	UPDATE_MEDICINE_SUCCESS,
	UPDATE_MEDICINE_FAIL,
	UPDATE_MEDICINE_RESET,
	DELETE_MEDICINE_REQUEST,
	DELETE_MEDICINE_SUCCESS,
	DELETE_MEDICINE_FAIL,
	UPDATE_MEDICINE_STOCK_REQUEST,
	UPDATE_MEDICINE_STOCK_SUCCESS,
	UPDATE_MEDICINE_STOCK_FAIL,
	DELETE_MEDICINE_STOCK_REQUEST,
	DELETE_MEDICINE_STOCK_SUCCESS,
	DELETE_MEDICINE_STOCK_FAIL,
	CLEAR_ERRORS
} from '../constants/medicineConstants.js';

export const medicinesReducer = (state = { medicines: [] }, action) => {
	switch (action.type) {
		case ALL_MEDICINE_REQUEST:
			return {
				loading: true,
				medicines: [],
			};
		case ALL_MEDICINE_SUCCESS:
			return {
				loading: false,
				medicines: action.payload.medicines,
				medCounts: action.payload.medCounts,
				resultPerPage: action.payload.resultPerPage,
				filteredMedicinesCount: action.payload.filteredMedicinesCount,
			};
		case ALL_MEDICINE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const medicineDetailsReducer = (state = { medicine: {} }, action) => {
	switch (action.type) {
		case MEDICINE_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case MEDICINE_DETAILS_SUCCESS:
			return {
				loading: false,
				medicine: action.payload,
			};
		case MEDICINE_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const stockDetailsReducer = (state = { stock: [] }, action) => {
	switch (action.type) {
		case STOCK_DETAILS_REQUEST:
			return {
				loading: true,
				...state,
			};
		case STOCK_DETAILS_SUCCESS:
			return {
				loading: false,
				stock: action.payload,
			};
		case STOCK_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const medStockDetailReducer = (state = { stock: {} }, action) => {
	switch (action.type) {
		case MED_STOCK_REQUEST:
			return {
				loading: true,
				...state,
			};
		case MED_STOCK_SUCCESS:
			return {
				loading: false,
				medStock: action.payload,
			};
		case MED_STOCK_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
}

export const newMedicineReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_MEDICINE_REQUEST:
			return {
				loading: true,
				...state,
			};
		case CREATE_MEDICINE_SUCCESS:
			return {
				loading: false,
				medicine: action.payload,
			};
		case CREATE_MEDICINE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case CREATE_MEDICINE_RESET:
			return {};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const newStockReducer = (state = {}, action) => {
	switch (action.type) {
		case ADD_MEDICINE_STOCK_REQUEST:
			return {
				loading: true,
				...state,
			};
		case ADD_MEDICINE_STOCK_SUCCESS:
			return {
				loading: false,
				stock: action.payload,
			};
		case ADD_MEDICINE_STOCK_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		case ADD_MEDICINE_STOCK_RESET:
			return {};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const medicineUpdateReducer = (state = { medicine: {} }, action) => {
	switch (action.type) {
		case UPDATE_MEDICINE_REQUEST:
			return {
				loading: true,
				isUpdated: false,
				...state,
			};
		case UPDATE_MEDICINE_SUCCESS:
			return {
				loading: false,
				isUpdated: true,
				medicine: action.payload.medicine,
			};
		case UPDATE_MEDICINE_FAIL:
			return {
				...state,
				loading: false,
				isUpdated: false,
				error: action.payload
			};
		case UPDATE_MEDICINE_RESET:
			return {};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null
			};
		default:
			return state;
	}
};

export const medicineDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_MEDICINE_REQUEST:
			return {
				loading: true,
				...state,
			};
		case DELETE_MEDICINE_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case DELETE_MEDICINE_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export const medicineStockUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_MEDICINE_STOCK_REQUEST:
			return {
				loading: true,
				...state,
			};
		case UPDATE_MEDICINE_STOCK_SUCCESS:
			return {
				loading: false,
				stock: action.payload,
			};
		case UPDATE_MEDICINE_STOCK_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};

export const medicineStockDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_MEDICINE_STOCK_REQUEST:
			return {
				loading: true,
				...state,
			};
		case DELETE_MEDICINE_STOCK_SUCCESS:
			return {
				loading: false,
				success: true,
			};
		case DELETE_MEDICINE_STOCK_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload
			};
		default:
			return state;
	}
};
