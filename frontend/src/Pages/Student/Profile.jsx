import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import Footer from "../../Components/Footer";

const Profile = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const loginId = location.state?.loginid || {}; // Get login ID from location state

  useEffect(() => {
    if (!loginId) {
      setError("No login ID provided.");
      setLoading(false);
      return;
    }

    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/students/${loginId}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [loginId]);

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" variant="primary" />
    </Container>
  );
  if (error) return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Alert variant="danger">{error}</Alert>
    </Container>
  );

  return (
    <Container fluid className="p-4" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <div className="profile-container" style={{ maxWidth: "800px", margin: "auto" }}>
        <h1 className="text-center mb-4">Welcome, {student.firstName}!</h1>
        <Card>
          <Card.Body>
            <Row className="mb-3">
              <Col md={4}><strong>ID:</strong></Col>
              <Col md={8}>{student.id}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Roll Number:</strong></Col>
              <Col md={8}>{student.rollNo}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>First Name:</strong></Col>
              <Col md={8}>{student.firstName}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Last Name:</strong></Col>
              <Col md={8}>{student.lastName}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Email:</strong></Col>
              <Col md={8}>{student.email}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Gender:</strong></Col>
              <Col md={8}>{student.gender}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Birthdate:</strong></Col>
              <Col md={8}>{new Date(student.birthdate).toLocaleDateString()}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Mobile Number:</strong></Col>
              <Col md={8}>{student.mobileNo}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Admission Year:</strong></Col>
              <Col md={8}>{student.addmissionYear}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Course Name:</strong></Col>
              <Col md={8}>{student.courseName || "N/A"}</Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}><strong>Role:</strong></Col>
              <Col md={8}>{student.role}</Col>
            </Row>
          </Card.Body>
        </Card>
      </div>

    </Container>
  );
};

export default Profile;
