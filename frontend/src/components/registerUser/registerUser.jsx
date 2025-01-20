import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

//signup page
const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard
  useEffect(() => {
    const tokenLocal = localStorage.getItem("authToken");
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (tokenLocal && userLocal) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateInputs = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    const updatedErrors = validateInputs();
    setErrors(updatedErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setErrorMessage("");
    setSuccess("");

    try {
        //server call for signup/ registration
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/signup",
        {
          email: formData.email,
          password: formData.password,
          country: formData.country,
        }
      );

      if (response.status === 200) {
        setSuccess("Registration successful! You can now log in.");
        setTimeout(() => {
          navigate("/login"); // Redirect to the login page
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center mt-4"
      style={{ minHeight: "50vh" }}
    >
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={12}>
          <h2 className="text-center mb-4">Register</h2>
          {success && <Alert variant="success">{success}</Alert>}
          {errorMessage && (
            <Alert variant="danger" dismissible>
              {errorMessage}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Email */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                size="md"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                size="md"
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Country */}
            <Form.Group className="mb-3" controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                size="md"
              >
                <option value="US">United States</option>
                <option value="AU">Australia</option>
                <option value="IT">Italy</option>
                <option value="CA">Canada</option>
              </Form.Select>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100">
              Register
            </Button>
          </Form>

          <div className="text-center mt-3">
            Already have an account? <Link to="/login">Log in here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
