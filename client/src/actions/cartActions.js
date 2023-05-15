import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_CUSTOMER_INFO,
} from "../constants/cartConstants.js";
import axios from "axios";

// ? Add to cart
export const addMedToCart = (id, qty) => async (dispatch, getState) => {
	const { userLogin: { manager } } = getState();
	const config = {
		headers: {
			Authorization: `${manager.token}`,
		},
	};
	const { data } = await axios.get(`/medapi/medicine/${id}`, config);
	dispatch({
		type: ADD_TO_CART,
		payload: {
			medicine: data.medicine._id,
			name: data.medicine.name,
			price: data.medicine.stockDetails[0].price,
			inStock: data.medicine.stockDetails[0].inStock,
			qty,
		},
	});
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
};

// ? Remove cart item
export const removeMedFromCart = (id) => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM,
		payload: id,
	});
	localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// ? Save customer info
export const saveCustInfo = (data) => async (dispatch, getState) => {
	dispatch({
		type: SAVE_CUSTOMER_INFO,
		payload: data,
	});
	localStorage.setItem("customerDetails", JSON.stringify(getState().cart.customerInfo));
};

// ? Clear errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: "CLEAR_ERRORS",
	});
};
