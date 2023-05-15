import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import {
  addMedicineStock,
  clearErrors,
} from "../../actions/medicineActions.js";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title.js";
import Add_Stock from "../../images/Add_Stock.png";

const NewStock = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { error, loading, stock } = useSelector((state) => state.newStock);

  const [price, setPrice] = useState(0);
  const [inStock, setInStock] = useState(1);

  const medId = params.id;

  const newStockSubmit = (e) => {
    e.preventDefault();
    dispatch(addMedicineStock(medId, price, inStock));
    navigate(`/medicine/${medId}`);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <div>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <Title title="Add Med+" />
            <section id="login">
              <div className="container">
                {/* <!-- Add Stock Page --> */}
                <div className="addNew__wrapper">
                  {/* <!--  Add Stock  Left Side --> */}

                  <div className="addNew__right" data-aos="fade-left">
                    <div className="addNew__imgWrapper">
                      <img src={Add_Stock} />
                    </div>
                  </div>

                  {/* <!-- Add Stock Right Side --> */}
                  <div className="addNew__left" data-aos="fade-right">
                    <div className="addNew__left__wrapper">
                      <div className="addNew-box">
                        <form onSubmit={newStockSubmit}>
                          <div class="user-box">
                            <input
                              type="number"
                              required
                              name="username"
                              value={price}
                              onChange={(e) => setPrice(e.target.value)}
                            />
                            <label>Price</label>
                          </div>
                          <div class="user-box">
                            <input
                              type="Number"
                              required
                              name="username"
                              value={inStock}
                              onChange={(e) => setInStock(e.target.value)}
                            />
                            <label>Stock</label>
                          </div>{" "}
                          <br></br>
                          <input
                            type="submit"
                            value="Add"
                            className="update_btn"
                          />
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default NewStock;
