import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  allMedicines,
  clearErrors,
  deleteMedicine,
} from "../../actions/medicineActions.js";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title";
import "./dashboard.css";

const DashBoard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();

  const {
    error,
    loading,
    medicines,
    medCounts,
    resultPerPage,
    filteredMedicinesCount,
  } = useSelector((state) => state.medicines);

  const [currentPage, setCurrentPage] = useState(1);

  const keyword = params.keyword || "";

  const setCurrentPageNum = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(allMedicines(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(allMedicines(keyword, currentPage));
  }, [dispatch, error, alert, keyword, currentPage]);

  return (
    <Fragment>
      {
        loading ? (
          <Loader />
        )
          :
          (
            <Fragment>
              <Title title="Dashboard" />
              <div className="dashboard">
                <div className="dashboard-card-group">
                  {medicines?.map((medicine) => (
                    <div className="dashboard-card">
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
                          className="dashboard-name"
                        >
                          {medicine.name}
                        </Link>
                      </div>
                      <div className="dasboard__wrapper">
                        <button>
                          <Link to={`/updatemed/${medicine._id}`}>Update Medicine</Link>
                        </button>
                      </div>
                      <div className="dasboard__wrapper">
                        <button>
                          <Link to={`/newstock/${medicine._id}`}>Add Stock</Link>
                        </button>
                      </div>
                      <div className="dasboard__wrapper">
                        <button
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you wish to delete this item?"
                              )
                            ) {
                              dispatch(deleteMedicine(medicine._id));
                              navigate("/dashboard");
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Pagination */}

                  <div id="app" className="pagination-hurray">
                    <ul className="page">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={medCounts}
                        onChange={setCurrentPageNum}
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </Fragment>
          )
      }
    </Fragment>
  );
};

export default DashBoard;
