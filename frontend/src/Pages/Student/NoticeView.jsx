import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';

const NoticeView = () => {
  const baseApiURL = "http://localhost:8080";
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

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Notices</h2>
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
              </li>
            ))
          ) : (
            <li className="list-group-item">No notices available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoticeView;
