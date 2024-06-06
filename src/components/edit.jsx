import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import DateInput from "./date";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/");
  };

  const [employeeField, setEmployeeField] = useState([]);

  const fetchUser = async () => {
    try {
      const result = await axios.get(
        `http://127.0.0.1:5000/employeesdetails/${id}`
      );
      setEmployeeField(result.data[0]);
      console.log(employeeField);
    } catch (err) {
      console.log("something went wrg");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleEmployeeFieldChange = (e) => {
    setEmployeeField({
      ...employeeField,
      [e.target.name]: e.target.value,
    });
    console.log(employeeField);
  };

  const onSubmitChange = async (e) => {
    e.preventDefault();
    toast.success("successfully updated");
    try {
      await axios.put(`http://127.0.0.1:5000/empupdate/${id}`, employeeField);
    } catch (err) {
      console.log("something went wr");
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <div className="heading-1">
        <h1>EDIT YOUR DETAILS</h1>
      </div>
      <div>
        <form className="form-group">
          <div className="inner-wrap">
            <label>emp ID</label>
            <input id="id" name="id" value={id} disabled />
          </div>
          <div className="inner-wrap">
            <label>First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter Your First Name"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.firstName}
            />
          </div>
          <div className="inner-wrap">
            <label>LAST NAME</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter Your Last Name"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.lastName}
            />
          </div>
          <div className="inner-wrap">
            <label>DATE OF BIRTH</label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Enter Your Date of Birth"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.dateOfBirth}
            />
          </div>
          <div className="inner-wrap">
            <label>PHONE NUMBER</label>
            <input
              type="number"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter Your Phone Number"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.phoneNumber}
            />
          </div>
          <div className="inner-wrap">
            <label>ADDRESS</label>
            <input
              id="address"
              type="text"
              name="address"
              placeholder="Enter Your Address"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.address}
            />
          </div>
          <div className="inner-wrap">
            <label>CITY</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="Enter Your City"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.city}
            />
          </div>
          <div className="inner-wrap">
            <label>PINCODE</label>
            <input
              type="number"
              id="pincode"
              name="pincode"
              placeholder="Enter Your Pincode"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.pincode}
            />
          </div>
          <div className="inner-wrap">
            <label>FINAL QUALIFICATION</label>
            <input
              type="text"
              id="finalQualification"
              name="finalQualification"
              placeholder="Enter Your Final Qualification"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.finalQualification}
            />
          </div>
          <div className="inner-wrap">
            <label>YEAR OF PASSING</label>
            <input
              type="number"
              name="yearOfPassing"
              id="yearOfPassing"
              placeholder="Enter Your Year Of Passing"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.yearOfPassing}
            />
          </div>
          <div className="inner-wrap">
            <label>JOINING DATE</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              placeholder="Enter Your Joining Date"
              onChange={(e) => handleEmployeeFieldChange(e)}
              value={employeeField.joiningDate}
            />
          </div>
          <button onClick={(e) => onSubmitChange(e)}>Submit</button>
        </form>
        <div>
          <button className="button" onClick={clickToBackHandler}>
            Back To Home
          </button>
        </div>
      </div>
    </div>
  );
}
