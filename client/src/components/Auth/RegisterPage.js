import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { registerUser, clearErrors } from "../../actions/userActions.js";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title.js";
import Register from "../../images/Register.svg";
import "./Register.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, manager } = userRegister;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert.error("Passwords do not match");
    } else {
      dispatch(registerUser(username, password));
      navigate("/home");
    }
  };

  useEffect(() => {
    if (manager) {
      navigate("/home");
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [manager, navigate, error, alert, dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Register" />

          <section id="login">
            <div className="container">
              {/* <!-- Login Page --> */}
              <div className="login__wrapper">
                {/* <!-- Login Left Side --> */}

                <div className="login__left" data-aos="fade-left">
                  <div className="login__left__wrapper">
                    <div className="login-box">
                      <h2>Hey 😀! Register</h2>
                      <form onSubmit={registerSubmit}>
                        <div className="user-box">
                          <input
                            type="text"
                            required
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          <label>Username</label>
                        </div>
                        <div className="user-box">
                          <input
                            type="password"
                            required
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label>Password</label>
                        </div>
                        <div className="user-box">
                          <input
                            type="password"
                            required
                            name="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <label>Confirm Password</label>
                        </div>

                        <a href="/register">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <input
                            type="submit"
                            value="Register"
                            className="login-button"
                          />
                        </a>
                        <a href="/">
                          Login
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </a>
                      </form>
                    </div>
                  </div>
                </div>
                {/* <!-- Login Right Side --> */}
                <div className="login__right" data-aos="fade-right">
                  <div className="login__imgWrapper">
                    <img src={Register} />
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

export default RegisterPage;
