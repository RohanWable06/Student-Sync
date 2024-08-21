import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const Subjects = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    name: "",
    course: "", // Assuming course ID is a string or number
  });
  const [selected, setSelected] = useState("add");
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getSubjectsHandler();
    getCoursesHandler();
  }, []);

  const getCoursesHandler = () => {
    axios
      .get(`${baseApiURL}/courses`)
      .then((response) => {
        if (response.data) {
          setCourses(response.data);
        } else {
          toast.error("Failed to load courses.");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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

  const addSubjectHandler = () => {
    toast.loading("Adding Subject");
    axios
      .post(`${baseApiURL}/subjects`, {
        name: data.name,
        course_id: data.course // Ensure backend expects `course_id`
      }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data) {
          toast.success("Subject added successfully.");
          setData({ name: "", course: "" });
          getSubjectsHandler();
        } else {
          toast.error("Failed to add subject.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Subject");
    axios
      .delete(`${baseApiURL}/subjects/${id}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.data) {
          toast.success("Subject deleted successfully.");
          getSubjectsHandler();
        } else {
          toast.error("Failed to delete subject.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || error.message);
      });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-between mb-3">
        <button
          className={`btn ${selected === "add" ? "btn-primary" : "btn-outline-primary"} mr-2`}
          onClick={() => setSelected("add")}
        >
          Add Subject
        </button>
        <button
          className={`btn ${selected === "view" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelected("view")}
        >
          View Subjects
        </button>
      </div>

      {selected === "add" && (
        <div className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="name">Subject Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="course">Course</label>
            <select
              id="course"
              className="form-select"
              value={data.course}
              onChange={(e) => setData({ ...data, course: e.target.value })}
            >
              <option value="">-- Select Course --</option>
              {courses.map((course) => (
                <option value={course.id} key={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-4">
          <ul className="list-group">
            {subjects.map((subject) => (
              <li
                key={subject.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {subject.name} - {subject.course_id ? `Course Name: ${subject.courseName}` : "No Course"}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteSubjectHandler(subject.id)}
                >
                  <MdOutlineDelete />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Subjects;
