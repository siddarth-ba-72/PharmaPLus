import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import ItemCard from "./ItemCard.js";
import {
  addMedToCart,
  removeMedFromCart,
  clearErrors,
} from "../../actions/cartActions";
import Loader from "../Utils/Loader/Loader";
import Title from "../Utils/Meta/Title";
import Cart_1 from "../../images/Cart.png";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addMedToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addMedToCart(id, newQty));
  };

  const deleteItemFromList = (id) => {
    dispatch(removeMedFromCart(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Cart" />
          <section id="login">
            <div className="container">
              {/* <!-- Cart Page --> */}
              <div className="cart__wrapper">
                {/* <!--  Cart Left Side --> */}

                <div className="cart__right" data-aos="fade-left">
                  <div className="cart__imgWrapper">
                    <img src={Cart_1} />
                  </div>
                </div>

                {/* <!-- Cart Right Side --> */}
                <div className="addNew__left" data-aos="fade-right">
                  <div className="addNew__left__wrapper">
                    <div className="addNew-box">
                      <h1 className="cart_heading">Cart</h1>
                      {cartItems.length === 0 ? (
                        <div>Cart is empty</div>
                      ) : (
                        <div>
                          <p className="cart_items">
                            Total Items: {cartItems.length}
                          </p>
                          {cartItems &&
                            cartItems.map((item) => (
                              <div>
                                <ItemCard
                                  med={item}
                                  deleteMedFromCart={deleteItemFromList}
                                  className="cart_medicine"
                                />
                                <div className="carts_wrapper">
                                  <button
                                    className="cart_minus"
                                    onClick={() =>
                                      decreaseQuantity(item.medicine, item.qty)
                                    }
                                  >
                                    -
                                  </button>
                                  <div className="cart_num">
                                    <input
                                      readOnly
                                      type="number"
                                      value={item.qty}
                                    />
                                  </div>
                                  <button
                                    className="cart_plus"
                                    onClick={() =>
                                      increaseQuantity(
                                        item.medicine,
                                        item.qty,
                                        item.inStock
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            ))}
                          <p className="cart_med_price">
                            Total Price:-
                            {`      ₹${cartItems.reduce(
                              (acc, item) => acc + item.qty * item.price,
                              0
                            )}`}
                          </p>
                        </div>
                      )}
                      <div className="cart_proceed_head">
                        <Link className="cart_proceed" to={
                          cartItems.length === 0 ? "/medicines" : "/custinfo"
                        }>
                          Proceed
                        </Link>
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

export default Cart;
