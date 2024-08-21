import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewStudents = () => {
  const baseApiURL = "http://localhost:8080";
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${baseApiURL}/students`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const deleteStudentHandler = (id) => {
    const confirm = window.prompt("Are you sure? Type CONFIRM to continue");
    if (confirm === "CONFIRM") {
      toast.loading("Deleting Student");
      axios
        .delete(`${baseApiURL}/students/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Student deleted successfully");
          fetchStudents(); // Refresh student list
        })
        .catch((error) => {
          toast.dismiss();
          toast.error(error.response?.data?.message || error.message);
        });
    }
  };

  return (
    <div className="mt-4">
      <ul className="list-group">
        {students.length > 0 ? (
          students.map((student) => (
            <li
              key={student.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{student.firstName} {student.lastName}</h5>
                <p>{student.email}</p>
                <small>Enrolled in: {student.courseName}</small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteStudentHandler(student.id)}
              >
                <MdOutlineDelete />
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No students available</li>
        )}
      </ul>
    </div>
  );
};

export default ViewStudents;
