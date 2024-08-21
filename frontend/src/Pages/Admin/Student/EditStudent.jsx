import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditStudent = () => {
  const baseApiURL = "http://localhost:8080";
  const [courses, setCourses] = useState([]);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    course: "", // Course ID
    addmissionYear: "",
    gender: "",
    birthDate: "", // This should be `birth` to match backend
    password: "" // Added password field but not used for update
  });
  const [studentId, setStudentId] = useState(""); // The ID of the student being edited

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(`${baseApiURL}/courses`);
        setCourses(response.data);
      } catch (error) {
        toast.error("Failed to load course data.");
      }
    };

    getCourses();
  }, []);

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const fetchStudentData = async () => {
    if (studentId) {
      try {
        const response = await axios.get(`${baseApiURL}/students/${studentId}`);
        setData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          mobileNo: response.data.mobileNo,
          course: response.data.course, // Course ID
          addmissionYear: response.data.addmissionYear,
          gender: response.data.gender,
          birthDate: response.data.birthDate,
          password: response.data.password, // Do not pre-fill password
        });
      } catch (error) {
        toast.error("Failed to load student data.");
      }
    }
  };

  const updateStudentProfile = async (e) => {
    e.preventDefault();

    const studentDTO = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobileNo: data.mobileNo,
      course: data.course, // This should be the course ID
      addmissionYear: parseInt(data.addmissionYear, 10),
      gender: data.gender,
      birth: data.birthDate,
      password: data.password // Ensure this matches the field in the backend
      // Do not include password if not updating
    };

    try {
      const response = await axios.put(`${baseApiURL}/students/${studentId}`, studentDTO, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        toast.success("Student updated successfully.");
        resetForm();
      } else {
        toast.error("Error updating student. Check the input again.");
      }
    } catch (error) {
      toast.error("Error updating student. Check the input again.");
    }
  };

  const resetForm = () => {
    setData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      course: "",
      addmissionYear: "",
      gender: "",
      birthDate: "",
      password: "",
    });
    setStudentId("");
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h3>Enter Student ID to Edit</h3>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Student ID"
            value={studentId}
            onChange={handleStudentIdChange}
          />
          <button
            className="btn btn-primary"
            onClick={fetchStudentData}
          >
            Load Student
          </button>
        </div>
      </div>
      <form onSubmit={updateStudentProfile} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="firstName" className="form-label">First Name</label>
          <input
            type="text"
            id="firstName"
            className="form-control"
            value={data.firstName}
            onChange={(e) => setData({ ...data, firstName: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lastName" className="form-label">Last Name</label>
          <input
            type="text"
            id="lastName"
            className="form-control"
            value={data.lastName}
            onChange={(e) => setData({ ...data, lastName: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
          <input
            type="text"
            id="mobileNo"
            className="form-control"
            value={data.mobileNo}
            onChange={(e) => setData({ ...data, mobileNo: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="course" className="form-label">Select Course</label>
          <select
            id="course"
            className="form-select"
            value={data.course}
            onChange={(e) => setData({ ...data, course: e.target.value })}
          >
            <option value="">-- Select --</option>
            {courses.map((course) => (
              <option value={course.id} key={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="addmissionYear" className="form-label">Admission Year</label>
          <input
            type="number"
            id="addmissionYear"
            className="form-control"
            value={data.addmissionYear}
            onChange={(e) => setData({ ...data, addmissionYear: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            className="form-select"
            value={data.gender}
            onChange={(e) => setData({ ...data, gender: e.target.value })}
          >
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="birthDate" className="form-label">Birthdate</label>
          <input
            type="date"
            id="birthDate"
            className="form-control"
            value={data.birthDate}
            onChange={(e) => setData({ ...data, birthDate: e.target.value })}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label" readOnly>Password</label>
          <input
            type="text"
            id="password"
            className="form-control"
            value={data.password}
            readOnly // Prevent changes
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Update Student
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={resetForm}
          >
            Reset Form
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default EditStudent;
