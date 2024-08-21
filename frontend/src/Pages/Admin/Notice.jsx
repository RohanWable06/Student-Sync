import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';

const Notice = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    description: ""
  });
  const [selected, setSelected] = useState("add");
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    getNoticesHandler();
  }, []);

  const getNoticesHandler = () => {
    axios
      .get(`${baseApiURL}/notices`)
      .then((response) => {
        console.log("Response Data:", response.data); // Check response structure
        if (Array.isArray(response.data)) {
          // Sort notices by id in descending order
          const sortedNotices = response.data.sort((a, b) => b.id - a.id);
          // Get the top 5 notices
          const topNotices = sortedNotices.slice(0, 5);
          setNotices(topNotices); // Set the notices array
        } else {
          toast.error("Unexpected response format");
        }
      })
      .catch((error) => {
        console.log("Error:", error.response || error); // Log detailed error
        toast.error(error.response?.data?.message || error.message);
      });
  };

  const addNoticeHandler = () => {
    if (!data.description) {
      toast.error("Description is required.");
      return;
    }

    toast.loading("Adding Notice");
    axios
      .post(`${baseApiURL}/notices`, {
        description: data.description
      }, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        toast.dismiss();
        if (response.status === 201) {
          toast.success("Notice added successfully.");
          setData({ description: "" });
          getNoticesHandler(); // Refresh notices list
        } else {
          toast.error("Failed to add notice. Please try again.");
        }
      })
      .catch((error) => {
        toast.dismiss();
        console.log("Add Notice Error:", error.response || error); // Log detailed error
        toast.error(error.response?.data?.message || error.message || "An error occurred while adding the notice.");
      });
  };

  const deleteNoticeHandler = (id) => {
    const confirm = window.prompt("Are you sure? Type CONFIRM to continue");
    if (confirm === "CONFIRM") {
      toast.loading("Deleting Notice");
      axios
        .delete(`${baseApiURL}/notices/${id}`, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          toast.dismiss();
          if (response.status === 200) {
            toast.success("Notice deleted successfully.");
            getNoticesHandler(); // Refresh notices list
          } else {
            toast.error("Failed to delete notice. Please try again.");
          }
        })
        .catch((error) => {
          toast.dismiss();
          console.log("Delete Notice Error:", error.response || error); // Log detailed error
          toast.error(error.response?.data?.message || error.message || "An error occurred while deleting the notice.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-3">
        <button
          className={`btn ${selected === "add" ? "btn-primary" : "btn-outline-primary"} mr-2`}
          onClick={() => setSelected("add")}
        >
          Add Notice
        </button>
        <button
          className={`btn ${selected === "view" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelected("view")}
        >
          View Notices
        </button>
      </div>

      {selected === "add" && (
        <div className="mt-4">
          <div className="form-group mb-3">
            <label htmlFor="description">Notice Description</label>
            <textarea
              id="description"
              className="form-control"
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={addNoticeHandler}
          >
            Add Notice
          </button>
        </div>
      )}

      {selected === "view" && (
        <div className="mt-4">
          <ul className="list-group">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <li
                  key={notice.id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <h5>Notice</h5>
                    <p>{notice.description}</p>
                    <small>Date: {new Date(notice.noticeDate).toLocaleDateString()}</small>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteNoticeHandler(notice.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))
            ) : (
              <li className="list-group-item">No notices available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notice;
