import {
	ADD_TO_CART,
	REMOVE_CART_ITEM,
	SAVE_CUSTOMER_INFO,
	CART_RESET,
} from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [], customerInfo: {} }, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const item = action.payload;
			const isItemExist = state.cartItems.find(
				(i) => i.medicine === item.medicine
			);
			if (isItemExist) {
				return {
					...state,
					cartItems: state.cartItems.map((i) =>
						i.medicine === isItemExist.medicine ? item : i
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case REMOVE_CART_ITEM:
			return {
				...state,
				cartItems: state.cartItems.filter((x) => x.medicine !== action.payload)
			};
		case SAVE_CUSTOMER_INFO:
			return {
				...state,
				customerInfo: action.payload,
			};
		case CART_RESET:
			return {
				...state,
				cartItems: [],
				customerInfo: {},
			}
		default:
			return state;
	}
};
