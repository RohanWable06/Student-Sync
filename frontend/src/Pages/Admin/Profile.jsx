import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

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
      .get(`${baseApiURL}/admin/${loginId}`, { headers })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        toast.error("Failed to load profile data");
        console.error(error);
      });
  }, [loginId]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL}/admin/${loginId}`,
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
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL}/admin/auth/update/${id}`,
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
        toast.error(error.response?.data?.message || "An error occurred");
        console.error(error);
      });
  };

  return (
    <Container className="my-5">
      {data && (
        <Row className="justify-content-center">
          {/* Profile Info Section */}
          <Col md={8} className="bg-light p-4 rounded shadow-sm">
            <h2 className="fw-bold text-primary">
              Admin Profile
            </h2>
            <div className="mt-3">
              <p className="mb-2"><strong>ID:</strong> {data.id}</p>
              <p className="mb-2"><strong>Email:</strong> {data.email}</p>
            </div>
            <Button
              variant={showPass ? "danger" : "primary"}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </Button>
            {showPass && (
              <Form className="mt-4 pt-3 border-top border-primary" onSubmit={checkPasswordHandler}>
                <Form.Group controlId="currentPassword">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password.current}
                    onChange={(e) => setPassword({ ...password, current: e.target.value })}
                    placeholder="Enter current password"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password.new}
                    onChange={(e) => setPassword({ ...password, new: e.target.value })}
                    placeholder="Enter new password"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Change Password
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
