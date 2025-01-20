import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

//login page
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tokenLocal = localStorage.getItem("authToken");
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (tokenLocal && userLocal) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const validateInputs = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
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

    try {
      //login request to server
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        const user = {
          email: response.data.user.email,
          country: response.data.user.country,
        };

        // Store token in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect to dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data || "Login failed. Please try again."
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
          <h2 className="text-center mb-4">Login</h2>
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
                size="md"
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                size="md"
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Submit Button */}
            <Button variant="primary" type="submit" className="w-100" size="md">
              Login
            </Button>
          </Form>

          {/* Registration Link */}
          <div className="text-center mt-3">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
