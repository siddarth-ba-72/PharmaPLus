import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { saveCustInfo, clearErrors } from "../../actions/cartActions";
import Title from "../Utils/Meta/Title";
import Loader from "../Utils/Loader/Loader.js";
import "./CustInfo.css";

const CustomerInfo = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerMobileNumber, setCustomerMobileNumber] = useState();

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, customerInfo } = useSelector((state) => state.cart);

  const saveHandler = (e) => {
    if (customerMobileNumber.length !== 10) {
      alert.error("Please enter valid mobile number");
      return;
    }
    e.preventDefault();
    dispatch(saveCustInfo({ customerName, customerMobileNumber }));
    navigate("/orderpreview");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch, customerInfo, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Customer Info" />
          <section className="section-book">
            <div className="row">
              <div className="book">
                <div className="book__form">
                  <form onSubmit={saveHandler} className="form">
                    <h2 className="heading-secondary">Invoice Page</h2>

                    <div className="form__group">
                      <input
                        type="text"
                        className="form__input"
                        placeholder="Full name"
                        id="name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        // required
                      />
                      {/* <label for="name" className="form__label">
                        Full name
                      </label> */}
                    </div>

                    <div className="form__group">
                      <input
                        type="number"
                        className="form__input"
                        placeholder="Phone No"
                        id="email"
                        value={customerMobileNumber}
                        onChange={(e) =>
                          setCustomerMobileNumber(e.target.value)
                        }
                        // required
                      />
                      {/* <label for="number" className="form__label">
                        Phone No
                      </label> */}
                    </div>

                    <div className="event-right">
                      <button className="button button-primary">
                        <p className="button-text">
                          <span className="button-text-link_2">
                            Create Invoice
                          </span>
                        </p>
                        <span className="square"></span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CustomerInfo;

<section className="section-book">
  <div className="row">
    <div className="book">
      <div className="book__form">
        <form action="#" className="form">
          <div className="u-margin-bottom-medium">
            <h2 className="heading-secondary">Invoice Page</h2>
          </div>

          <div className="form__group">
            <input
              type="text"
              className="form__input"
              placeholder="Full name"
              id="name"
              required
            />
            <label for="name" className="form__label">
              Full name
            </label>
          </div>

          <div className="form__group">
            <input
              type="number"
              className="form__input"
              placeholder="Phone No"
              id="email"
              required
            />
            <label for="number" className="form__label">
              Phone No
            </label>
          </div>

          <div className="event-right">
            <button className="btn btn-primary">
              <p className="btn-text">Create Invoice</p>
              <span className="square"></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>;
