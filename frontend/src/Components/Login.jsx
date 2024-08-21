import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState("Students");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const url = `http://localhost:8080/login`;
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const { token } = response.data; // Adjust according to your response structure
        localStorage.setItem('authToken', token); // Store token in localStorage
        navigate(`/${selected.toLowerCase()}`, {
          state: { loginid: response.data },
        });
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again.");
    }
  };

  return (
    <>
      <div className="navbar navbar-expand-md bg-dark navbar-dark fixed-top justify-content-between">
        <div>
          <NavLink to="/" className="navbar-brand">StudentSync</NavLink>
          <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="navbar-toggler-icon"></span>
          </button>
          <button
            className={`btn btn-link text-white mr-3 ${selected === "Students" && "border-bottom border-success"}`}
            onClick={() => setSelected("Students")}
          >
            Student
          </button>
          <button
            className={`btn btn-link text-white mr-3 ${selected === "Faculty" && "border-bottom border-success"}`}
            onClick={() => setSelected("Faculty")}
          >
            Faculty
          </button>
          <button
            className={`btn btn-link text-white mr-3 ${selected === "Admin" && "border-bottom border-success"}`}
            onClick={() => setSelected("Admin")}
          >
            Admin
          </button>
        </div>
        <div className="navbar-nav">
          <Link to="/aboutus" className="nav-item nav-link">About Us</Link>
          <Link to="/contactus" className="nav-item nav-link">Contact Us</Link>
        </div>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center vh-100 position-relative"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="d-flex justify-content-center align-items-center w-100 h-100">
          <div className="bg-dark text-white p-5 rounded-lg" style={{ opacity: 0.85, maxWidth: "400px", width: "100%" }}>
            <p className="h3 font-weight-bold pb-2 border-bottom border-success">
              {selected} Login
            </p>
            <form
              className="d-flex flex-column w-100 mt-3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group w-100">
                <label className="mb-1" htmlFor="email">
                  {selected} Login ID
                </label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>
              <div className="form-group w-100 mt-3">
                <label className="mb-1" htmlFor="password">
                  Password
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-control"
                    {...register("password", { required: "Password is required" })}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>
              <button className="btn btn-primary mt-4 d-flex align-items-center">
                Login
                <span className="ml-2">
                  <FiLogIn />
                </span>
              </button>
            </form>
          </div>
        </div>
        <Toaster position="bottom-center" />
        <Footer />
      </div>
    </>
  );
};

export default Login;
