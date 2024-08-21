import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Student from "./Student";
import Faculty from "./Faculty";
import Lognavbar from "../../Components/Lognavbar";
import Branch from "./Branch";
import Subjects from "./Subject";
import Admin from "./Admin";
import Profile from "./Profile";
import Notice from "./Notice";

const Home = () => {
  const baseApiURL = "http://localhost:8080";
  const [selectedMenu, setSelectedMenu] = useState("Profile");
  const [load, setLoad] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    studentCount: "",
    facultyCount: "",
  });

  useEffect(() => {
    if (!load) {
      setLoad(true);
    }
    fetchStudentCount();
    fetchFacultyCount();
  }, [load]);

  const fetchStudentCount = async () => {
    try {
      const response = await axios.get(`${baseApiURL}/student/details/count`);
      if (response.data.success) {
        setDashboardData((prevData) => ({
          ...prevData,
          studentCount: response.data.user,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFacultyCount = async () => {
    try {
      const response = await axios.get(`${baseApiURL}/faculty/details/count`);
      if (response.data.success) {
        setDashboardData((prevData) => ({
          ...prevData,
          facultyCount: response.data.user,
        }));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {load && (
        <>
          <Lognavbar />
          <div className="container mt-4">
            <ul className="nav nav-pills justify-content-center mb-4">
              {["Profile", "Student", "Faculty", "Branch", "Notice", "Subjects", "Admin"].map((menu) => (
                <li className="nav-item" key={menu}>
                  <button
                    className={`nav-link ${selectedMenu === menu ? "active" : ""}`}
                    onClick={() => setSelectedMenu(menu)}
                  >
                    {menu}
                  </button>
                </li>
              ))}
            </ul>

            <div className="content">
              {selectedMenu === "Branch" && <Branch />}
              {selectedMenu === "Notice" && <Notice />}
              {selectedMenu === "Student" && <Student />}
              {selectedMenu === "Faculty" && <Faculty />}
              {selectedMenu === "Subjects" && <Subjects />}
              {selectedMenu === "Admin" && <Admin />}
              {selectedMenu === "Profile" && <Profile />}
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
    </>
  );
};

export default Home;
