import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Marks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseApiURL = "http://localhost:8080";
  const location = useLocation();
  const loginId = location.state?.loginid;

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        const response = await axios.get(`${baseApiURL}/marks/`, { headers });
        console.log("API Response:", response.data);

        if (response.data.length !== 0) {
          // Assuming the data structure: { marks: [...] }
          const fetchedMarks = response.data || [];
          console.log("Fetched Marks:", fetchedMarks);

          // Filter marks based on studentId
          const filteredMarks = fetchedMarks.filter(mark => mark.studentId === loginId);
          console.log("Filtered Marks:", filteredMarks);

          setMarks(filteredMarks);
        } else {
          setMarks([]);
        }
      } catch (error) {
        setError("Failed to fetch marks. Please try again later.");
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMarks();
  }, [loginId]); // Add loginId as dependency

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5 mb-5">
      <h1>{`Student ID: ${loginId}`}</h1>
      <div className="row mt-4">
        {marks.map((mark) => (
          <div className="col-md-6">
            <div className="card shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body">
                <h5 className="card-title border-bottom border-danger pb-2 mb-3">
                  {mark.examName} Marks
                </h5>
                <ul className="list-group">

                  <li
                    key={mark.examId}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span> {mark.subjectName}</span>
                    <span>{mark.marks}</span>

                  </li>

                </ul>
              </div>
            </div>
          </div>
        ))}: (
        <div className="col-12 text-center">
          <p>No Marks Available At The Moment!</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default Marks;
