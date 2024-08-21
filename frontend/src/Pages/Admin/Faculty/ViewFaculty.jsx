import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewFaculty = () => {
  const baseApiURL = "http://localhost:8080";
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const fetchFacultyList = () => {
    axios
      .get(`${baseApiURL}/teachers`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFacultyList(response.data);
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const deleteFacultyHandler = (id) => {
    const confirm = window.prompt("Are you sure? Type CONFIRM to continue");
    if (confirm === "CONFIRM") {
      toast.loading("Deleting Faculty");
      axios
        .delete(`${baseApiURL}/teachers/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          toast.dismiss();
          toast.success("Faculty deleted successfully");
          fetchFacultyList(); // Refresh faculty list
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
        {facultyList.length > 0 ? (
          facultyList.map((faculty) => (
            <li
              key={faculty.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{faculty.name}</h5>
                <p>{faculty.qualification}</p>
                <p>{faculty.subjectName}</p>
                <small>Email: {faculty.email}</small>
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteFacultyHandler(faculty.id)}
              >
                <MdOutlineDelete />
              </button>
            </li>
          ))
        ) : (
          <li className="list-group-item">No faculty available</li>
        )}
      </ul>
    </div>
  );
};

export default ViewFaculty;
