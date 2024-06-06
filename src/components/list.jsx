import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./list.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function List() {
  const [employeesData, setEmployeesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios("http://127.0.0.1:5000/employees");
      setEmployeesData(result.data);
      console.log(result.data);
    } catch (err) {
      console.log("somethimg wrong");
    }
  };

  const handleDelete = async (id) => {
    toast.error("removed successfully");
    console.log(id);
    await axios.delete("http://127.0.0.1:5000/empdelete/" + id);
    const newEmployeeData = employeesData.filter((item) => item.id !== id);
    setEmployeesData(newEmployeeData);
    console.log(newEmployeeData);
  };

  const clickToBackHandler = () => {
    navigate("/form");
  };
  return (
    <div className="container-list">
      <ToastContainer />
      <div className="heading-4">
        <h4>USER DETAILS</h4>
      </div>
      <table className="table">
        <thead className="table-head">
          <tr>
            <th>Employee Id</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {employeesData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>
                <Link to={`/view/${employee.id}`} className="button-view">
                  <FontAwesomeIcon icon={faEye} />
                  View
                </Link>
                <Link to={`/edit/${employee.id}`} className="button-edit">
                  <FontAwesomeIcon icon={faEdit} />
                  Edit
                </Link>
                <button
                  className="button-delete"
                  onClick={() => handleDelete(employee.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button className="button-back" onClick={clickToBackHandler}>
          Add User
        </button>
      </div>
    </div>
  );
}
