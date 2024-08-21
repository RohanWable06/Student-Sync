import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditFaculty = () => {
  const baseApiURL = "http://localhost:8080";
  const [facultyId, setFacultyId] = useState("");
  const [data, setData] = useState({
    id: "",
    name: "",
    subject: "",
    qualification: "",
    email: "",
    password: "", // Password should be initially empty
  });
  const [subjects, setSubjects] = useState([]);
  const [facultyLoaded, setFacultyLoaded] = useState(false);

  useEffect(() => {
    if (facultyLoaded) {
      getSubjectsHandler();
    }
  }, [facultyLoaded]);

  // Fetch subjects
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

  // Fetch faculty details by ID
  const getFacultyDetails = (id) => {
    axios
      .get(`${baseApiURL}/teachers/${id}`)
      .then((response) => {
        if (response.data) {
          setData({
            id: response.data.id,
            name: response.data.name,
            subject: response.data.subject ? response.data.subject.id : "",
            qualification: response.data.qualification,
            email: response.data.email,
            password: response.data.password || "", // Set the password field
          });
          setFacultyLoaded(true);
        } else {
          toast.error("Failed to load faculty details.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Handle faculty ID submission
  const handleFacultyIdSubmit = (e) => {
    e.preventDefault();
    getFacultyDetails(facultyId);
  };

  // Update faculty details
  const updateFacultyHandler = () => {
    toast.loading("Updating Faculty");
    axios
      .put(`${baseApiURL}/teachers/${data.id}`, {
        name: data.name,
        subject_id: data.subject,
        qualification: data.qualification,
        email: data.email,
        password: data.password || undefined, // Send password only if it's not empty
      }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data) {
          toast.success("Faculty updated successfully.");
        } else {
          toast.error("Failed to update faculty.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="container mt-5">
      {!facultyLoaded ? (
        <div>
          <h2>Enter Faculty ID</h2>
          <form onSubmit={handleFacultyIdSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="facultyId">Faculty ID</label>
              <input
                type="text"
                id="facultyId"
                className="form-control"
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Load Faculty
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h2>Edit Faculty</h2>
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
                type="text"
                id="password"
                className="form-control"
                value={data.password}
                readOnly
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={updateFacultyHandler}
            >
              Update Faculty
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditFaculty;
