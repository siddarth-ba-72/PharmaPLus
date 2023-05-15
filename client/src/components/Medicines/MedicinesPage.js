import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { allMedicines, clearErrors } from "../../actions/medicineActions.js";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title.js";
import MedPage_1 from "../../images/Medicine Page-1.svg";
import MedPage_2 from "../../images/Medicine Page-2.png";
import "../../styles/main.js";
import "./MedicinePage.css";

const MedicinesPage = () => {
	const dispatch = useDispatch();
	const alert = useAlert();
	const params = useParams();

	const {
		error,
		loading,
		medicines,
		medCounts,
		resultPerPage,
		filteredMedicinesCount,
	} = useSelector((state) => state.medicines);

	const { manager } = useSelector((state) => state.userLogin);

	const [currentPage, setCurrentPage] = useState(1);

	const keyword = params.keyword || "";
	const health = params.health || "";
	const brand = params.brand || "";

	const setCurrentPageNum = (e) => {
		setCurrentPage(e);
	};

	useEffect(() => {
		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
		dispatch(allMedicines(keyword, currentPage, brand, health));
	}, [dispatch, error, alert, keyword, currentPage, brand, health]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<Title title="Medicines" />
					<section className="event">
						<div className="event-left" data-aos="fade-right">
							<div className="event-banner">
								<img
									src={MedPage_1}
									alt="event banner"
									className="banner-img"
								/>
								<img
									src={MedPage_2}
									alt="event banner"
									className="banner-img"
								/>
							</div>
						</div>

						<div className="event-right" data-aos="fade-left">
							{manager.role === "admin" && (
								<button className="button button-primary">
									<p className="button-text">
										<Link className="button-text-link" to="/newmed">
											Add New +
										</Link>
									</p>
									<span className="square"></span>
								</button>
							)}
							<div className="event-card-group">
								{medicines?.map((medicine) => (
									<div className="event-card">
										<div className="content-left">
											<p className="stock">
												{medicine.stockDetails.length === 0
													? 0
													: medicine.stockDetails[0].inStock}
											</p>
										</div>

										<div className="content-right">
											<Link
												to={`/medicine/${medicine._id}`}
												className="event-name"
											>
												{medicine.name}
											</Link>
										</div>
									</div>
								))}
							</div>
						</div>
					</section>

					{/* Pagination */}

					<div id="app" className="pagination-hurray">
						<ul className="page">
							<Pagination
								activePage={currentPage}
								itemsCountPerPage={resultPerPage}
								totalItemsCount={medCounts}
								onChange={setCurrentPageNum}
								// nextPageText="Next"
								// prevPageText="Prev"
								// firstPageText="1st"
								// lastPageText="Last"
								itemClass="page-item"
								linkClass="page-link"
								activeClass="pageItemActive"
								activeLinkClass="pageLinkActive"
							/>
						</ul>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default MedicinesPage;
