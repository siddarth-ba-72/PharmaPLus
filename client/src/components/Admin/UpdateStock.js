import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom'
import {
	updateMedicine,
	getMedicineDetails,
	clearErrors
} from '../../actions/medicineActions';
import { useAlert } from "react-alert";
import Loader from "../Utils/Loader/Loader";
import Title from "../Utils/Meta/Title";

const UpdateStock = () => {

	const dispatch = useDispatch();
	const alert = useAlert();
	const navigate = useNavigate();
	const params = useParams();

	const { loading, error, medicine } = useSelector((state) => state.medicineDetails);

	const medId = params.id;

	return (
		<Fragment>
			{
				loading ? (
					<Loader />
				) : (
					<Fragment>
						<Title title="Update Stock" />
						<h2>Update Stock</h2>
					</Fragment>
				)
			}
		</Fragment>
	)
}

export default UpdateStock
