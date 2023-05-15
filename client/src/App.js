import React, { Fragment, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
	Outlet,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { clearErrors } from "./actions/medicineActions";
import Header from "./components/Header";
import LoginPage from "./components/Auth/LoginPage";
import RegisterPage from "./components/Auth/RegisterPage.js";
import HomePage from "./components/Home/HomePage.js";
import MedicinesPage from "./components/Medicines/MedicinesPage.js";
import Medicine from "./components/Medicines/Medicine.js";
import AddMedicine from "./components/Medicines/AddMedicine.js";
import NewStock from "./components/Admin/NewStock.js";
import Cart from "./components/Cart/Cart.js";
import CustomerInfo from "./components/Cart/CustomerInfo.js";
import OrderPreview from "./components/Cart/OrderPreview.js";
import DashBoard from "./components/Admin/DashBoard";
import UpdateMedicine from "./components/Admin/UpdateMedicine";
import UpdateStock from "./components/Admin/UpdateStock";
import InvoiceList from "./components/Admin/InvoiceList";
import InvoiceDetails from "./components/Admin/InvoiceDetails";
import FilterByHealth from "./components/Medicines/FilterByHealth";
import FilterByBrand from "./components/Medicines/FilterByBrand";
import NotFound from "./components/Utils/NotFound/NotFound";

function App() {

	const userLogin = useSelector((state) => state.userLogin);
	const { error, manager } = userLogin;

	const dispatch = useDispatch();
	const alert = useAlert();

	function RequiredAuth() {
		if (!manager) {
			alert.error("Please Login");
			return <Navigate to="/" />;
		}
		return (
			<>
				<Header />
				<Outlet />
			</>
		);
	};

	function AdminRequired() {
		if (!manager) {
			alert.error("Please Login");
			return <Navigate to="/" />;
		}
		if (manager.role !== "admin") {
			alert.error("You are not authorized to view this page");
			return <Navigate to="/home" />;
		}
		return (
			<>
				<Outlet />
			</>
		);
	}

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [error, alert, dispatch]);

	return (
		<Router>
			<Fragment>
				<Routes>
					<Route exact path="/" element={<LoginPage />} />
					<Route exact path="/register" element={<RegisterPage />} />
					<Route element={<RequiredAuth />}>
						<Route exact path="/home" element={<HomePage />} />
						<Route exact path="/medicines" element={<MedicinesPage />} />
						<Route exact path="/medicines/:keyword" element={<MedicinesPage />} />
						<Route path="/medicine/:id" element={<Medicine />} />
						<Route path="/newmed" element={<AddMedicine />} />
						<Route path="/cart" element={<Cart />} />
						<Route path="/custinfo" element={<CustomerInfo />} />
						<Route path="/orderpreview" element={<OrderPreview />} />
						<Route path="/fbh/:health" element={<FilterByHealth />} />
						<Route path="/fbb/:brand" element={<FilterByBrand />} />
						<Route element={<AdminRequired />}>
							<Route path="/dashboard" element={<DashBoard />} />
							<Route path="/newstock/:id" element={<NewStock />} />
							<Route path="/updatemed/:id" element={<UpdateMedicine />} />
							<Route path="/stockupdate/:id" element={<UpdateStock />} />
							<Route path="/invoices" element={<InvoiceList />} />
							<Route path="/invoice/:id" element={<InvoiceDetails />} />
						</Route>
					</Route>
					<Route exact path="*" element={<NotFound />} />
				</Routes>
			</Fragment>
		</Router>
	);
}

export default App;

// git add .
// git commit - m "hmm"
// git push origin master
