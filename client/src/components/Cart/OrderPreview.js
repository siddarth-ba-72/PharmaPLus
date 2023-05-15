import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, newInvoice } from '../../actions/invoiceActions';
import { CART_RESET } from '../../constants/cartConstants';
import Loader from "../Utils/Loader/Loader";
import Title from "../Utils/Meta/Title";
import Order from "../../images/Order-preview.png";
import "./OrderPreview.css";

const OrderPreview = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, cartItems, customerInfo } = useSelector(
    (state) => state.cart
  );
  const [invNum, setInvNum] = useState();

  const invoice = {
    invoiceNumber: invNum,
    customerDetails: {
      name: customerInfo.customerName,
      mobileNumber: customerInfo.customerMobileNumber,
    },
    purchasedMedicines: cartItems,
  };

  const invoiceHandler = (e) => {
    if (!invNum) {
      alert.error('Please enter invoice number');
      return;
    }
    e.preventDefault();
    dispatch(newInvoice(invoice));
    dispatch({ type: CART_RESET });
    localStorage.removeItem('cartItems');
    localStorage.removeItem('customerDetails');
    navigate('/home');
    alert.success('Invoice created successfully');
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Order Preview" />
          <section id="login">
            <div className="container">
              {/* <!-- Order Page --> */}
              <div className="order__wrapper">
                {/* <!--  Order Left Side --> */}
                <div className="order__right" data-aos="fade-left">
                  <div className="order__imgWrapper">
                    <img src={Order} />
                  </div>
                </div>

                {/* <!-- Order Right Side --> */}
                <div className="addNew__left" data-aos="fade-right">
                  <div className="addNew__left__wrapper">
                    <div className="addNew-box">
                      <h2 className="order_heading">Order Preview</h2>
                      <div>
                        <p className="order_para">
                          Name: {customerInfo.customerName}
                        </p>
                        <p className="order_para">
                          Mobile Number: {customerInfo.customerMobileNumber}
                        </p>
                      </div>
                      <div>
                        <p className="order_para">
                          Total Items: {cartItems.length}
                        </p>
                        {cartItems.map((item) => (
                          <div key={item.id}>
                            <p className="order_para_name">{item.name}</p>
                            <p className="order_para">Ouantity:- {item.qty}</p>
                            <p className="order_para">
                              Price:- {item.price * item.qty}
                            </p>
                            <br></br>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="order_amount">
                          Total Amount:
                          {cartItems.reduce(
                            (acc, item) => acc + item.price * item.qty,
                            0
                          )}
                        </p>
                      </div>
                      <div className="order-box">
                        <input
                          type="number"
                          value={invNum}
                          onChange={(e) => setInvNum(e.target.value)}
                        />
                        <label>Invoice Id</label>
                      </div>
                      <div className="cart_proceed_head">
                        <button
                          className="cart_proceed"
                          onClick={invoiceHandler}
                        >
                          Confirm Purchase
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderPreview;
