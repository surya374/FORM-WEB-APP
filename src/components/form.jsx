import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { isDate, parse } from "date-fns";

export default function Form() {
  const [employeeField, setemployeeField] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    finalQualification: "",
    yearOfPassing: "",
    joiningDate: "",
  });

  const navigate = useNavigate();
  const clickToBackHandler = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    e.preventDefault();
    const newInput = (data) => ({
      ...data,
      [e.target.name]: e.target.value,
    });
    setemployeeField(newInput);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("details has been added");
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/submit_form",
        employeeField
      );

      console.log(res);
    } catch (error) {
      console.log("something wrong");
    }
  };

  return (
    <div className="container">
      <div>
        <ToastContainer />
        <div className="heading">
          <h1>EMPLOYEE DETAILS FORM</h1>
        </div>
        <div className="heading">
          <h4>ADD YOUR DETAILS</h4>
        </div>

        <form className="form-group" onSubmit={(e) => handleSubmit(e)}>
          <div className="inner-wrap">
            <label>FIRST NAME: </label>
            <input
              placeholder="Enter Your First Name"
              type="text"
              onChange={(e) => handleChange(e)}
              value={employeeField.firstName}
              id="firstName"
              name="firstName"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>LAST NAME: </label>
            <input
              placeholder="Enter Your Last  Name"
              type="text"
              onChange={handleChange}
              value={employeeField.lastName}
              id="lastName"
              name="lastName"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>DATE OF BIRTH: </label>
            <input
              placeholder="DOB"
              type="date"
              onChange={handleChange}
              value={employeeField.dateOfBirth}
              id="dateOfBirth"
              name="dateOfBirth"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>PHONE NUMBER: </label>
            <input
              placeholder="Number"
              type="number"
              onChange={handleChange}
              value={employeeField.phoneNumber}
              id="phoneNumber"
              name="phoneNumber"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>ADDRESS: </label>
            <input
              placeholder="Address"
              type="text"
              onChange={handleChange}
              value={employeeField.address}
              id="address"
              name="address"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>CITY: </label>
            <input
              placeholder="City"
              type="text"
              onChange={handleChange}
              value={employeeField.city}
              id="city"
              name="city"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>PINCODE: </label>
            <input
              placeholder="Pincode"
              type="number"
              onChange={handleChange}
              value={employeeField.pincode}
              id="pincode"
              name="pincode"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>QUALIFICATION: </label>
            <input
              placeholder="Enter highest qualification"
              type="text"
              onChange={handleChange}
              value={employeeField.finalQualification}
              id="finalQualification"
              name="finalQualification"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>YEAR OF PASSING: </label>
            <input
              placeholder="Enter highest qualification"
              type="number"
              onChange={handleChange}
              value={employeeField.yearOfPassing}
              id="yearOfPassing"
              name="yearOfPassing"
              required
            />
          </div>

          <div className="inner-wrap">
            <label>JOINING DATE: </label>
            <input
              placeholder="Enter highest qualification"
              type="date"
              onChange={handleChange}
              value={employeeField.joiningDate}
              id="joiningDate"
              name="joiningDate"
              required
            />
          </div>
          <div>
            <button className="button">Submit</button>
          </div>
        </form>
        <div>
          <button onClick={clickToBackHandler}>Back To Home</button>
        </div>
      </div>
    </div>
  );
}
