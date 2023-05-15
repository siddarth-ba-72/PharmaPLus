import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllInvoices, deleteInvoice } from '../../actions/invoiceActions';
import Loader from "../Utils/Loader/Loader";
import Title from '../Utils/Meta/Title';

const InvoiceList = () => {

	const dispatch = useDispatch();
	const alert = useAlert();

	const { loading, error, invoices } = useSelector((state) => state.allInvoices);

	const all_Invoices = invoices.invoices;

	useEffect(() => {
		if (error) {
			alert.error(error);
		}
		dispatch(getAllInvoices());
	}, [error, alert, dispatch]);

	return (
		<Fragment>
			{
				loading ?
					(<Loader />)
					:
					(
						<Fragment>
							<Title title="Invoices" />
							<h1>All Invoices</h1>
							<div className="event-card-group">
								{
									all_Invoices && all_Invoices.map((invoice) => (
										<div className="event-card">
											<div key={invoice._id} className="content-right">
												<Link to={`/invoice/${invoice._id}`} className="event-name">
													Invoice ID: {invoice._id}
												</Link>
											</div>
											<div className="AddToCart__wrapper" style={{ marginLeft: "10px" }}>
												<button
													onClick={() => dispatch(deleteInvoice(invoice._id))}
												>
													Delete
												</button>
											</div>
										</div>
									))
								}
							</div>
						</Fragment>
					)
			}
		</Fragment>
	);
};

export default InvoiceList;