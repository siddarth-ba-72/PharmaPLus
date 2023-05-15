import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { createMedicine, clearErrors } from "../../actions/medicineActions.js";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title.js";
import AddNew from "../../images/Add-New.svg";
import "./AddMedicine.css";

const AddMedicine = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, medicine } = useSelector(
    (state) => state.newMedicine
  );

  const [med_id, setMedId] = useState("");
  const [name, setName] = useState("");
  const [composition, setComposition] = useState("");
  const [categoryOne, setCategoryOne] = useState("");
  const [categoryTwo, setCategoryTwo] = useState("");

  const newMedSubmit = (e) => {
    e.preventDefault();
    if (!categoryOne || !categoryTwo || !name) {
      alert.error("Please fill in all fields");
    }
    dispatch(
      createMedicine(med_id, name, composition, categoryOne, categoryTwo)
    );
    navigate("/medicines");
  };

  useEffect(() => {
    if (medicine) {
      navigate("/medicines");
    } else if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, navigate, medicine, error, alert]);

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
                {/* <!-- AddNew Page --> */}
                <div className="addNew__wrapper">
                  {/* <!--  AddNew Left Side --> */}

                  <div className="addNew__right" data-aos="fade-left">
                    <div className="addNew__imgWrapper">
                      <img src={AddNew} />
                    </div>
                  </div>

                  {/* <!-- Add New Right Side --> */}

                  <div className="addNew__left" data-aos="fade-right">
                    <div className="addNew__left__wrapper">
                      <div className="addNew-box">
                        <form onSubmit={newMedSubmit}>
                          <div class="user-box">
                            <input
                              type="text"
                              required
                              value={med_id}
                              onChange={(e) => setMedId(e.target.value)}
                            />
                            <label>Med Id</label>
                          </div>
                          <div class="user-box">
                            <input
                              type="text"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                            <label>Name</label>
                          </div>
                          <div class="user-box">
                            <input
                              type="text"
                              required
                              value={composition}
                              onChange={(e) => setComposition(e.target.value)}
                            />
                            <label>Composition</label>
                          </div>
                          <div class="user-box">
                            <input
                              type="text"
                              required
                              value={categoryOne}
                              onChange={(e) => setCategoryOne(e.target.value)}
                            />
                            <label>Brand</label>
                          </div>
                          <div class="user-box">
                            <input
                              type="text"
                              required
                              value={categoryTwo}
                              onChange={(e) => setCategoryTwo(e.target.value)}
                            />
                            <label>Health Category</label>
                          </div>
                          <a href="/">
                            <br></br>
                            <input
                              type="submit"
                              value="Add"
                              className="update_btn "
                            />
                          </a>
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

export default AddMedicine;
