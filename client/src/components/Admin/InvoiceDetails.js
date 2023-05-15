import React, { useEffect, Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getInvoiceDetails } from '../../actions/invoiceActions';
import Loader from '../Utils/Loader/Loader';

const InvoiceDetails = () => {

	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();

	const { error, loading, invoice } = useSelector((state) => state.invoiceDetails);

	const invId = params.id;

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		dispatch(getInvoiceDetails(invId));
	}, [error, alert, dispatch, invId]);

	return (
		<Fragment>
			{
				loading ?
					(<Loader />)
					:
					(
						<Fragment>
							<h1>Invoice Details</h1>
							<h2>{invoice?._id}</h2>
						</Fragment>
					)
			}
		</Fragment>
	)
};

export default InvoiceDetails;
