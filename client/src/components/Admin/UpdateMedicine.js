import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../Utils/Loader/Loader.js";
import Title from "../Utils/Meta/Title.js";
import {
  updateMedicine,
  getMedicineDetails,
  clearErrors,
} from "../../actions/medicineActions";
import { UPDATE_MEDICINE_RESET } from "../../constants/medicineConstants";
import "./UpdateMedicine.css";
import Update_Stock from "../../images/Update_Med.png";

const UpdateMedicine = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();

  const medId = params.id;

  const [mId, setMId] = useState("");
  const [name, setName] = useState("");
  const [composition, setComposition] = useState("");
  const [categoryOne, setCategoryOne] = useState("");
  const [categoryTwo, setCategoryTwo] = useState("");

  const { medicine, loading, error } = useSelector(
    (state) => state.medicineDetails
  );

  const {
    loading: medUpdateLoading,
    error: medUpdateError,
    medicine: medUpdate,
    isUpdated,
  } = useSelector((state) => state.medicineUpdate);

  useEffect(() => {
    if (medicine && medicine._id !== medId) {
      dispatch(getMedicineDetails(medId));
    } else {
      setMId(medicine.med_id);
      setName(medicine.name);
      setComposition(medicine.composition);
      setCategoryOne(medicine.categoryOne);
      setCategoryTwo(medicine.categoryTwo);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (medUpdateError) {
      alert.error(medUpdateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Medicine updated successfully");
      // navigate(`/medicine/${medId}`);
      dispatch({ type: UPDATE_MEDICINE_RESET });
    }
  }, [
    dispatch,
    medId,
    medicine,
    error,
    medUpdateError,
    isUpdated,
    navigate,
    alert,
  ]);

  const updateSubmitHandler = (e) => {
    e.preventDefault();
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(updateMedicine(mId, name, composition, categoryOne, categoryTwo));
    alert.success("Medicine updated successfully");
    navigate(`/medicine/${medId}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Title title="Update Medicine" />
          <section id="login">
            <div className="container">
              {/* <!-- Update Stock Page --> */}
              <div className="addNew__wrapper">
                {/* <!--  Update Stock Left Side --> */}

                <div className="addNew__right" data-aos="fade-left">
                  <div className="addNew__imgWrapper">
                    <img src={Update_Stock} />
                  </div>
                </div>

                {/* <!-- Update Stock Right Side --> */}
                <div className="addNew__left" data-aos="fade-right">
                  <div className="addNew__left__wrapper">
                    <div className="addNew-box">
                      <h1 className="update_brand">Update Medicine</h1>
                      <form onSubmit={updateSubmitHandler}>
                        <div class="user-box">
                          <input
                            type="text"
                            placeholder="ID"
                            value={mId}
                            onChange={(e) => setMId(e.target.value)}
                          />
                        </div>{" "}
                        <div class="user-box">
                          <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div class="user-box">
                          <input
                            type="text"
                            placeholder="Composition"
                            value={composition}
                            onChange={(e) => setComposition(e.target.value)}
                          />
                        </div>
                        <div class="user-box">
                          <input
                            type="text"
                            placeholder="Brand"
                            value={categoryOne}
                            onChange={(e) => setCategoryOne(e.target.value)}
                          />
                        </div>
                        <div class="user-box">
                          <input
                            type="text"
                            placeholder="Health Issue"
                            value={categoryTwo}
                            onChange={(e) => setCategoryTwo(e.target.value)}
                          />
                        </div>
                        <a href="/">
                          <br></br>
                          <input
                            type="submit"
                            value="Update"
                            className="update_btn"
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
    </>
  );
};

export default UpdateMedicine;
