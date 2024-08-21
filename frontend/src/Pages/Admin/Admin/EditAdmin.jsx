import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { FiSearch, FiX } from "react-icons/fi";

const EditAdmin = () => {
  const baseApiURL = "http://localhost:8080";
  const [searchActive, setSearchActive] = useState(false);
  const [data, setData] = useState({
    email: "",
  });
  const [id, setId] = useState(null);
  const [search, setSearch] = useState("");

  const updateAdminProfile = async (e) => {
    e.preventDefault();
    toast.loading("Updating Admin");

    try {
      const response = await axios.put(
        `${baseApiURL}/admin/${id}`,
        {
          email: data.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.dismiss();
      if (response.data) {
        toast.success("Admin profile updated successfully");
        clearSearchHandler();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const searchAdminHandler = async (e) => {
    e.preventDefault();
    setSearchActive(true);
    toast.loading("Fetching Admin");

    try {
      const response = await axios.get(
        `${baseApiURL}/admin/${search}`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.dismiss();
      if (response.data) {
        setId(response.data.id);
        setData({
          email: response.data.email,
        });
        toast.success("Admin found");
      } else {
        toast.error("No Admin Found With ID");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
      console.error(error);
    }
  };

  const clearSearchHandler = () => {
    setSearchActive(false);
    setSearch("");
    setId(null);
    setData({
      email: "",
    });
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center mb-4">
        <Col md={8}>
          <Form onSubmit={searchAdminHandler} className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter Admin ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {!searchActive ? (
              <Button variant="primary" type="submit" className="ms-2">
                <FiSearch />
              </Button>
            ) : (
              <Button variant="secondary" type="button" className="ms-2" onClick={clearSearchHandler}>
                <FiX />
              </Button>
            )}
          </Form>
        </Col>
      </Row>

      {search && id && (
        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={updateAdminProfile} className="d-flex flex-column">
              <Form.Group className="mb-3">
                <Form.Label>Enter Email Address</Form.Label>
                <Form.Control
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="Enter email address"
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                Update Admin
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EditAdmin;
