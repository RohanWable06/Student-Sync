import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'react-bootstrap-icons'; // You need to install react-bootstrap-icons for these icons

const AddAdmin = () => {
  const baseApiURL = "http://localhost:8080";
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Adding Admin");

    try {
      const response = await axios.post(`${baseApiURL}/admin`, {
        email: data.email,
        password: data.password,
      });
      toast.dismiss();
      if (response.data) {
        toast.success("Admin added successfully");
        setData({
          email: "",
          password: "",
        });
      } else {
        toast.error("Failed to add admin");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="email">Email Address</Form.Label>
              <Form.Control
                type="email"
                id="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                placeholder="Enter email address"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="password">Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required
                  placeholder="Enter password"
                />
                <InputGroup.Text
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="primary">
              Add New Admin
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAdmin;
