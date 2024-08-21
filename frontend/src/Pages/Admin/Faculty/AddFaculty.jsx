import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddFaculty = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    name: "",
    subject: "", // Assuming subject is an ID
    qualification: "",
    password: "",
    email: "", // Added email field
  });
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getSubjectsHandler();
  }, []);

  const getSubjectsHandler = () => {
    axios
      .get(`${baseApiURL}/subjects`)
      .then((response) => {
        if (response.data) {
          setSubjects(response.data);
        } else {
          toast.error("Failed to load subjects.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addFacultyHandler = () => {
    toast.loading("Adding Faculty");
    axios
      .post(`${baseApiURL}/teachers`, {
        name: data.name,
        subject_id: data.subject,
        qualification: data.qualification,
        password: data.password,
        email: data.email, // Include email in the request
      }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data) {
          toast.success("Faculty added successfully.");
          setData({
            name: "",
            subject: "",
            qualification: "",
            password: "",
            email: "", // Clear the email field
          });
        } else {
          toast.error("Failed to add faculty.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add Faculty</h2>
      <div className="mt-4">
        <div className="form-group mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="subject">Subject</label>
          <select
            id="subject"
            className="form-select"
            value={data.subject}
            onChange={(e) => setData({ ...data, subject: e.target.value })}
          >
            <option value="">-- Select Subject --</option>
            {subjects.map((subject) => (
              <option value={subject.id} key={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="qualification">Qualification</label>
          <input
            type="text"
            id="qualification"
            className="form-control"
            value={data.qualification}
            onChange={(e) => setData({ ...data, qualification: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <button
          className="btn btn-primary"
          onClick={addFacultyHandler}
        >
          Add Faculty
        </button>
      </div>
    </div>
  );
};

export default AddFaculty;
