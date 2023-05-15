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
	ADD_MEDICINE_STOCK_REQUEST,
	ADD_MEDICINE_STOCK_SUCCESS,
	ADD_MEDICINE_STOCK_FAIL,
	UPDATE_MEDICINE_REQUEST,
	UPDATE_MEDICINE_SUCCESS,
	UPDATE_MEDICINE_FAIL,
	DELETE_MEDICINE_REQUEST,
	DELETE_MEDICINE_SUCCESS,
	DELETE_MEDICINE_FAIL,
	UPDATE_MEDICINE_STOCK_REQUEST,
	UPDATE_MEDICINE_STOCK_SUCCESS,
	UPDATE_MEDICINE_STOCK_FAIL,
	DELETE_MEDICINE_STOCK_REQUEST,
	DELETE_MEDICINE_STOCK_SUCCESS,
	DELETE_MEDICINE_STOCK_FAIL,
	CLEAR_ERRORS,
} from "../constants/medicineConstants.js";
import axios from "axios";

// ? All medicines
export const allMedicines =
	(keyword = "", currentPage = 1, brand, health,) =>
		async (dispatch, getState) => {
			try {
				dispatch({ type: ALL_MEDICINE_REQUEST });
				let link = `/medapi/medicines?page=${currentPage}&keyword=${keyword}`;
				if (brand) {
					link = `/medapi/medicines?page=${currentPage}&keyword=${keyword}&brand=${brand}`;
				}
				if (health) {
					link = `/medapi/medicines?page=${currentPage}&keyword=${keyword}&health=${health}`;
				}
				const {
					userLogin: { manager },
				} = getState();
				const config = {
					headers: {
						Authorization: `${manager.token}`,
					},
				};
				const { data } = await axios.get(link, config);
				dispatch({
					type: ALL_MEDICINE_SUCCESS,
					payload: data,
				});
			} catch (error) {
				dispatch({ type: ALL_MEDICINE_FAIL, payload: error.message });
			}
		};

// ? Medicine details
export const getMedicineDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: MEDICINE_DETAILS_REQUEST });
		const {
			userLogin: { manager },
		} = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.get(`/medapi/medicine/${id}`, config);
		dispatch({
			type: MEDICINE_DETAILS_SUCCESS,
			payload: data.medicine,
		});
	} catch (error) {
		dispatch({ type: MEDICINE_DETAILS_FAIL, payload: error.message });
	}
};

// ? Medicine stock details
export const getMedicineStockDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: STOCK_DETAILS_REQUEST });
		const {
			userLogin: { manager },
		} = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.get(`/medapi/medicine/${id}`, config);
		dispatch({
			type: STOCK_DETAILS_SUCCESS,
			payload: data.medicine.stockDetails,
		});
	} catch (error) {
		dispatch({ type: STOCK_DETAILS_FAIL, payload: error.message });
	}
};

// ? Medicine stock details by ID
export const medicineStockDetail = (stockId) => async (dispatch, getState) => {
	try {
		dispatch({ type: MED_STOCK_REQUEST });
		const {
			userLogin: { manager },
		} = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
			queryParams: {
				stockId,
			},
		};
		const { data } = await axios.get(
			`/medapi/medicinestock/${stockId}`,
			config
		);
		dispatch({
			type: MED_STOCK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: MED_STOCK_FAIL, payload: error.message });
	}
};

// ? Create new Medicine
export const createMedicine =
	(med_id, name, composition, categoryOne, categoryTwo) =>
		async (dispatch, getState) => {
			try {
				dispatch({ type: CREATE_MEDICINE_REQUEST });
				const {
					userLogin: { manager },
				} = getState();
				const config = {
					headers: {
						Authorization: `${manager.token}`,
					},
				};
				const { data } = await axios.post(
					`/medapi/addmedicine`,
					{ med_id, name, composition, categoryOne, categoryTwo },
					config
				);
				dispatch({
					type: CREATE_MEDICINE_SUCCESS,
					payload: data,
				});
			} catch (error) {
				dispatch({ type: CREATE_MEDICINE_FAIL, payload: error.message });
			}
		};

// ? Add medicine stock details
export const addMedicineStock =
	(id, price, inStock) => async (dispatch, getState) => {
		try {
			dispatch({ type: ADD_MEDICINE_STOCK_REQUEST });
			const {
				userLogin: { manager },
			} = getState();
			const config = {
				headers: {
					Authorization: `${manager.token}`,
				},
			};
			const { data } = await axios.post(
				`/medapi/addstockdetails/${id}`,
				{ price, inStock },
				config
			);
			dispatch({
				type: ADD_MEDICINE_STOCK_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({ type: ADD_MEDICINE_STOCK_FAIL, payload: error.message });
		}
	};

// ? Update Medicine
export const updateMedicine =
	(mId, name, composition, categoryOne, categoryTwo) => async (dispatch, getState) => {
		try {
			dispatch({ type: UPDATE_MEDICINE_REQUEST });
			const {
				userLogin: { manager },
			} = getState();
			const config = {
				headers: {
					Authorization: `${manager.token}`,
				},
			};
			const { data } = await axios.put(
				`/medapi/medicine/${mId}`,
				{ mId, name, composition, categoryOne, categoryTwo },
				config
			);
			dispatch({
				type: UPDATE_MEDICINE_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({ type: UPDATE_MEDICINE_FAIL, payload: error.message });
		}
	};

// ? Delete medicine
export const deleteMedicine = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_MEDICINE_REQUEST });
		const {
			userLogin: { manager },
		} = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.delete(`/medapi/medicine/${id}`, config);
		dispatch({
			type: DELETE_MEDICINE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: DELETE_MEDICINE_FAIL, payload: error.message });
	}
};

// ? Update Medicine Stock Details
export const updateMedicineStock =
	(id, price, inStock) => async (dispatch, getState) => {
		try {
			dispatch({ type: UPDATE_MEDICINE_STOCK_REQUEST });
			const {
				userLogin: { manager },
			} = getState();
			const config = {
				headers: {
					Authorization: `${manager.token}`,
				},
			};
			const { data } = await axios.put(
				`/medapi/medicinestockdetails/${id}`,
				{ price, inStock },
				config
			);
			dispatch({
				type: UPDATE_MEDICINE_STOCK_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({ type: UPDATE_MEDICINE_STOCK_FAIL, payload: error.message });
		}
	};

// ? Delete Medicine Stock Details
export const deleteMedicineStock = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: DELETE_MEDICINE_STOCK_REQUEST });
		const {
			userLogin: { manager },
		} = getState();
		const config = {
			headers: {
				Authorization: `${manager.token}`,
			},
		};
		const { data } = await axios.delete(`/medapi/stock/${id}`, config);
		dispatch({
			type: DELETE_MEDICINE_STOCK_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({ type: DELETE_MEDICINE_STOCK_FAIL, payload: error.message });
	}
};

// ? Clearing Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
