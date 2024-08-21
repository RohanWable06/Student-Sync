import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FiSearch } from "react-icons/fi";

const Student = () => {
  const baseApiURL = "http://localhost:8080";
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    rollNo: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    birthdate: "",
    gender: "",
    courseName: "",
    addmissionYear: ""
  });
  const [id, setId] = useState("");

  const searchStudentHandler = (e) => {
    e.preventDefault();
    setId("");
    setData({
      rollNo: "",
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      birthdate: "",
      gender: "",
      courseName: "",
      addmissionYear: ""
    });

    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get(`${baseApiURL}/students/rollno/${search}`, { headers })
      .then((response) => {
        toast.success("Student data fetched successfully!");
        setData(response.data);
        setId(response.data.id);
      })
      .catch((error) => {
        toast.error("Failed to fetch student data.");
        console.error(error);
      });
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <form
            className="d-flex border border-primary rounded-3"
            onSubmit={searchStudentHandler}
          >
            <input
              type="text"
              className="form-control rounded-0"
              placeholder="Enrollment No."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-outline-primary rounded-0"
              type="submit"
            >
              <FiSearch className="fs-4" />
            </button>
          </form>
        </div>
      </div>

      {id && (
        <div className="row justify-content-center mt-4">
          <div className="col-md-8 bg-light p-4 rounded-3 shadow-sm">
            <div className="d-flex align-items-center mb-4">
              {/* Uncomment and adjust if you have a profile image */}
              {/* <img
                src={process.env.REACT_APP_MEDIA_LINK + "/" + data.profile}
                alt="student profile"
                className="img-fluid rounded-circle me-3"
                style={{ maxHeight: "150px", maxWidth: "150px" }}
              /> */}
              <div>
                <h2 className="fs-3 fw-bold">
                  {data.firstName} {data.lastName}
                </h2>
                <p className="mb-2">
                  <strong>Enrollment No:</strong> {data.rollNo}
                </p>
                <p className="mb-2">
                  <strong>Phone Number:</strong> +91 {data.mobileNo}
                </p>
                <p className="mb-2">
                  <strong>Email Address:</strong> {data.email}
                </p>
                <p className="mb-2">
                  <strong>Course Name:</strong> {data.courseName}
                </p>
                <p className="mb-2">
                  <strong>Birth Date:</strong> {data.birthdate}
                </p>
                <p className="mb-2">
                  <strong>Admission Year:</strong> {data.addmissionYear}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
