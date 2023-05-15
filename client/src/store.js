import {
	createStore,
	applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './root-reducers';

const managerInfoFromStorage = localStorage.getItem('datamanager')
	? JSON.parse(localStorage.getItem('datamanager'))
	: null

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const customerInfoFromStorage = localStorage.getItem('customerDetails')
	? JSON.parse(localStorage.getItem('customerDetails'))
	: {}

const initialState = {
	userLogin: {
		manager: managerInfoFromStorage,
	},
	cart: {
		cartItems: cartItemsFromStorage,
		customerInfo: customerInfoFromStorage,
	},
};

const middleware = [thunk];

export const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware)),
);
