import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddStudent = () => {
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
    password: "" // Added password field
  });

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axios.get(`${baseApiURL}/courses`);
        // Assuming the response contains the courses list directly
        setCourses(response.data);
      } catch (error) {
        toast.error("Failed to load course data.");
      }
    };

    getCourses();
  }, []);

  const addStudentProfile = async (e) => {
    e.preventDefault();

    const studentDTO = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobileNo: data.mobileNo,
      course: data.course, // This should be the course ID
      addmissionYear: parseInt(data.addmissionYear, 10),
      gender: data.gender,
      birth: data.birthDate, // Ensure this matches the field in the backend
      password: data.password // Added password field
    };

    try {
      const response = await axios.post(`${baseApiURL}/students/`, studentDTO, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data) {
        toast.success("Student added successfully.");
        resetForm();
      } else {
        toast.error("Error Check the input again");
      }
    } catch (error) {
      toast.error("Error Check the input again");
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
      birthDate: "", // Reset birthDate
      password: "" // Reset password field
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={addStudentProfile} className="row g-3">
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
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>
        <div className="col-12">
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Student
          </button>
        </div>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default AddStudent;
