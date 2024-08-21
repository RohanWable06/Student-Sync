import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Timetable from "./Timetable";
import { Toaster } from "react-hot-toast";
import Material from "./Material";
import Marks from "./Marks";
import Student from "./Student";
import Lognavbar from "../../Components/Lognavbar";
import NoticeView from "../Student/NoticeView";

const Home = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (router.state === null) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const getButtonClass = (menu) => {
    return `btn ${selectedMenu === menu
      ? "btn-outline-primary text-primary"
      : "btn-light text-dark"} w-100`;
  };

  return (
    <div className="container my-5">
      {load && (
        <>
          <Lognavbar />
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3">
              <div className="list-group mb-4">
                <button
                  className={`list-group-item list-group-item-action ${getButtonClass("My Profile")}`}
                  onClick={() => setSelectedMenu("My Profile")}
                >
                  My Profile
                </button>
                <button
                  className={`list-group-item list-group-item-action ${getButtonClass("Student Info")}`}
                  onClick={() => setSelectedMenu("Student Info")}
                >
                  Student Info
                </button>
                <button
                  className={`list-group-item list-group-item-action ${getButtonClass("Upload Marks")}`}
                  onClick={() => setSelectedMenu("Upload Marks")}
                >
                  Upload Marks
                </button>

                <button
                  className={`list-group-item list-group-item-action ${getButtonClass("Notice")}`}
                  onClick={() => setSelectedMenu("Notice")}
                >
                  Notice
                </button>
                <button
                  className={`list-group-item list-group-item-action ${getButtonClass("Material")}`}
                  onClick={() => setSelectedMenu("Material")}
                >
                  Material
                </button>
              </div>
            </div>
            {/* Main Content */}
            <div className="col-md-9">
              <div className="p-4 bg-light rounded-3 shadow-sm">
                {selectedMenu === "Timetable" && <Timetable />}
                {selectedMenu === "Upload Marks" && <Marks />}
                {selectedMenu === "Material" && <Material />}
                {selectedMenu === "Notice" && <NoticeView />}
                {selectedMenu === "My Profile" && <Profile />}
                {selectedMenu === "Student Info" && <Student />}
              </div>
            </div>
          </div>
          <Toaster position="bottom-center" />
        </>
      )}
    </div>
  );
};

export default Home;
