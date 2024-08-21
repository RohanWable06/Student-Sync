import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
  const baseApiURL = "http://localhost:8080";
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();
  const loginId = location.state?.loginid || {};
  const [data, setData] = useState(null);
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .get(`${baseApiURL}/teachers/${loginId}`, { headers })
      .then((response) => {
        setData([response.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [loginId]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL}/teachers`,
        { loginid: loginId, password: password.current },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL}/faculty/${id}`,
        { loginid: loginId, password: password.new },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error(error);
      });
  };

  return (
    <div className="container my-5">
      {data && (
        <div className="row">
          {/* Profile Info Section */}
          <div className="col-md-8 bg-light p-4 rounded shadow-sm">
            <h2 className="fw-bold text-primary">
              Hello {data[0].name}{" "}
              <span role="img" aria-label="waving hand">👋</span>
            </h2>
            <div className="mt-3">
              <p className="mb-2"><strong>Faculty Id:</strong> {data[0].id}</p>
              <p className="mb-2"><strong>Post:</strong> {data[0].post}</p>
              <p className="mb-2"><strong>Email Id:</strong> {data[0].email}</p>
              <p className="mb-2"><strong>Phone Number:</strong> {data[0].phoneNumber}</p>
              <p className="mb-2"><strong>Subject Name:</strong> {data[0].subjectName}</p>
            </div>
            <button
              className={`btn ${showPass ? "btn-danger" : "btn-primary"} mt-4`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </button>
            {showPass && (
              <form
                className="mt-4 pt-3 border-top border-primary"
                onSubmit={checkPasswordHandler}
              >
                <div className="mb-3">
                  <input
                    type="password"
                    value={password.current}
                    onChange={(e) =>
                      setPassword({ ...password, current: e.target.value })
                    }
                    placeholder="Current Password"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    value={password.new}
                    onChange={(e) =>
                      setPassword({ ...password, new: e.target.value })
                    }
                    placeholder="New Password"
                    className="form-control"
                  />
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                >
                  Change Password
                </button>
              </form>
            )}
          </div>
          {/* Profile Image Section */}
          <div className="col-md-4 text-center">
            <img
              src={`${process.env.REACT_APP_MEDIA_LINK}/${data[0].profile}`}
              alt="faculty profile"
              className="img-fluid rounded-circle shadow"
              style={{ maxHeight: "200px", maxWidth: "200px" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
