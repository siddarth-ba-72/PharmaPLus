import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMedicineDetails,
  clearErrors,
  deleteMedicine,
} from "../../actions/medicineActions";
import { useAlert } from "react-alert";
import { useNavigate, useParams, Link } from "react-router-dom";
import { addMedToCart } from "../../actions/cartActions.js";
import Loader from "../Utils/Loader/Loader.js";
import AddMedicine from "../../images/Add-Medicine.png";
import Title from "../Utils/Meta/Title.js";
import "./Medicine.css";

const Medicine = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const params = useParams();

  const { medicine, loading, error } = useSelector(
    (state) => state.medicineDetails
  );
  const { manager } = useSelector((state) => state.userLogin);

  const [quantity, setQuantity] = useState(1);

  const medId = params.id;

  const increaseQuantity = () => {
    if (medicine.stockDetails[0].inStock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToListHandler = () => {
    dispatch(addMedToCart(medId, quantity));
    alert.success("Medicine added to cart");
    navigate("/cart");
  };

  const deleteMedHandler = (e) => {
    e.preventDefault();
    dispatch(deleteMedicine(medId));
    alert.success("Medicine deleted successfully");
    navigate("/medicines");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMedicineDetails(medId));
  }, [error, alert, dispatch, medId]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <section id="meds_page">
          <Title title={`${medicine.name}`} />
          <div className="container">
            {/* <!-- Meds Page --> */}
            <div className="meds__wrapper">
              {/* <!--  Meds Left Side --> */}

              <div className="meds__right" data-aos="fade-left">
                <div className="meds__imgWrapper">
                  <img src={AddMedicine} />
                </div>
              </div>
              {/* <!-- Meds Right Side --> */}

              <div className="meds__left" data-aos="fade-right">
                <div className="meds__left__wrapper">
                  <div className="meds-box">
                    <form>
                      <div className="user-box">
                        <h1 className="meds_brand">
                          Brand: {medicine.categoryOne}
                        </h1>
                        <h2 className="meds_h2">{medicine.name}</h2>
                        <p className="meds_p">{medicine.composition}</p>
                        <div>
                          <div className="signs_wrapper">
                            <button
                              className="minus"
                              onClick={decreaseQuantity}
                            >
                              -
                            </button>
                            <div className="num">
                              <input readOnly type="number" value={quantity} />
                            </div>
                            <button className="plus" onClick={increaseQuantity}>
                              +
                            </button>
                          </div>
                          <div className="AddToCart__wrapper">
                            <button
                              onClick={addToListHandler}
                              className="updBtn secBtn"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* {
									manager.role === 'admin' && (
										<div className="admin_stocks">
											<h2>Stocks</h2>
											<div className="admin_stocks__wrapper">
												{medicine?.stockDetails?.map((stock) => (
													<div className="det_wrap">
														<div className="st_instock">
															In Stock: {stock.inStock}
														</div>
														<div className="st_price">
															Price: {stock.price}
														</div>
													</div>
												))}
											</div>
										</div>
									)
								} */}
              </div>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default Medicine;
