import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const Branch = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    title: "",
    about: "",
    credits: ""
  });
  const [selected, setSelected] = useState("add");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getCoursesHandler();
  }, []);

  const getCoursesHandler = () => {
    axios
      .get(`${baseApiURL}/courses`)
      .then((response) => {
        console.log("Response Data:", response.data); // Check response structure
        if (Array.isArray(response.data)) {
          setCourses(response.data); // Set the courses array
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch((error) => {
        console.log("Error:", error.response || error); // Log detailed error
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const addCourseHandler = () => {
    toast.loading("Adding Course");

    axios
      .post(`${baseApiURL}/courses`, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        console.log("Add Course Response Data:", response.data); // Log response data for debugging

        if (response.status === 201) { // Check for HTTP 201 Created status
          // Assuming response.data is the saved CourseDTO object
          toast.success("Course added successfully");
          setData({ title: "", about: "", credits: "" });
          getCoursesHandler(); // Refresh course list
        } else {
          toast.error("Unexpected response status");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log("Add Course Error:", error.response || error); // Log detailed error
        const errorMessage = error.response?.data || "An error occurred";
        toast.error(errorMessage);
      });
  };


  const deleteCourseHandler = (id) => {
    toast.loading("Deleting Course");
    axios
      .delete(`${baseApiURL}/courses/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        // Expect a plain text response
        const message = response.data;
        toast.success(message);
        getCoursesHandler(); // Refresh course list
      })
      .catch((error) => {
        toast.dismiss();
        console.log("Delete Course Error:", error.response || error); // Log detailed error
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn ${selected === "add" ? "btn-primary" : "btn-outline-primary"} mr-2`}
          onClick={() => setSelected("add")}
        >
          Add Course
        </button>
        <button
          className={`btn ${selected === "view" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelected("view")}
        >
          View Courses
        </button>
      </div>

      {selected === "add" && (
        <div className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="title">Course Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="about">About</label>
            <textarea
              id="about"
              className="form-control"
              value={data.about}
              onChange={(e) => setData({ ...data, about: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="credits">Credits</label>
            <input
              type="number"
              id="credits"
              className="form-control"
              value={data.credits}
              onChange={(e) => setData({ ...data, credits: e.target.value })}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={addCourseHandler}
          >
            Add Course
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-4">
          <ul className="list-group">
            {courses.length > 0 ? (
              courses.map((course) => (
                <li
                  key={course.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>{course.title}</h5>
                    <p>{course.about}</p>
                    <small>Credits: {course.credits}</small>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteCourseHandler(course.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No courses available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Branch;
