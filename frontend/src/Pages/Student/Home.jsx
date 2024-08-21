import React, { useEffect, useState } from "react";
import Navbar from "../../Components/Navbar";
import Profile from "./Profile";
import Marks from "./Marks";
import Material from "./Material";
import { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Lognavbar from "../../Components/Lognavbar";
import Footer from "../../Components/Footer";
import NoticeView from "./NoticeView";
// import Notice from "../../components/Notice"; // Uncomment if Notice component exists

const Home = () => {
  const [selectedMenu, setSelectedMenu] = useState("My Profile");
  const router = useLocation();
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const location = useLocation();
  const loginId = location.state?.loginid;

  useEffect(() => {
    if (!router.state) {
      navigate("/");
    }
    setLoad(true);
  }, [navigate, router.state]);

  const getButtonClass = (menu) => {
    return `d-block text-center rounded-md px-4 py-2 cursor-pointer transition-all ${selectedMenu === menu
      ? "bg-primary text-white border border-primary"
      : "bg-light text-primary hover:bg-secondary border border-primary"
      }`;
  };

  return (
    <section>
      {load && (
        <>
          <Lognavbar />

          <div className="container-fluid">
            <div className="row">
              {/* Sidebar */}
              <div
                className="col-md-3 p-3 bg-light"
                style={{
                  minHeight: "100vh",
                  maxHeight: "100vh",
                  overflowY: "auto",
                  position: "fixed", // Fixed position for scrolling effect
                  width: "250px", // Set width of the sidebar
                }}
              >
                <ul className="nav flex-column">
                  <li
                    className={getButtonClass("My Profile")}
                    onClick={() => setSelectedMenu("My Profile")}
                  >
                    My Profile
                  </li>
                  <li
                    className={getButtonClass("Marks")}
                    onClick={() => setSelectedMenu("Marks")}
                  >
                    Marks
                  </li>
                  <li
                    className={getButtonClass("Material")}
                    onClick={() => setSelectedMenu("Material")}
                  >
                    Material
                  </li>
                  <li
                    className={getButtonClass("Notice")}
                    onClick={() => setSelectedMenu("Notice")}
                  >
                    Notice
                  </li>
                </ul>
              </div>

              {/* Main content */}
              <div
                className="col-md-9 offset-md-3 p-4"
                style={{ minHeight: "100vh" }}
              >
                <div className="bg-white p-4 rounded-lg shadow-lg" style={{ opacity: 0.9 }}>
                  {selectedMenu === "Marks" && <Marks />}
                  {selectedMenu === "My Profile" && <Profile />}

                  {selectedMenu === "Material" && <Material />}
                  {selectedMenu === "Notice" && <NoticeView />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Toaster position="bottom-center" />
      <Footer />
    </section>
  );
};

export default Home;
