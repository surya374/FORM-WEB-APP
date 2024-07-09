import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./list.css";

export default function View() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        "http://127.0.0.1:5000/employeesdetails/" + id
      );
      console.log(result.data);
      setEmployees(result.data[0]);
    } catch (err) {
      console.log("something wrong");
    }
  };

  const clickToBackHandler = () => {
    navigate("/");
  };

  return (
    <div className="container-view">
      <div>
        <div className="heading-5">
          <h5>FULL DETAILS OF EMPLOYEE</h5>
        </div>
        {employees && (
          <table className="table">
            <thead className="table-head">
              <tr>
                <th>Employee Id</th>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>DATE OF BIRTH</th>
                <th>PHONE NUMBER</th>
                <th>ADDRESS</th>
                <th>CITY</th>
                <th>PINCODE</th>
                <th>QUALIFICATION</th>
                <th>YEAR OF PASSING</th>
                <th>JOINING DATE</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr>
                <td>{employees.id}</td>
                <td>{employees.firstName}</td>
                <td>{employees.lastName}</td>
                <td>{employees.dateOfBirth}</td>
                <td>{employees.phoneNumber}</td>
                <td>{employees.address}</td>
                <td>{employees.city}</td>
                <td>{employees.pincode}</td>
                <td>{employees.finalQualification}</td>
                <td>{employees.yearOfPassing}</td>
                <td>{employees.joiningDate}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <div>
        <button className="button-back" onClick={clickToBackHandler}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
