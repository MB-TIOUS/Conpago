import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// navigation bar
const NavbarComponent = () => {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the user's email from localStorage after login
    const user = JSON.parse(localStorage.getItem("user"));
    let email = user.email;
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    // Clear localStorage and redirect to login page
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        {/* App Title */}
        <Navbar.Brand href="/">MusixMatch</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Conditionally Show User Email */}
            {userEmail ? (
              <>
                <Navbar.Text className="me-3 text-white">
                  {userEmail}
                </Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Navbar.Text className="text-white">Not logged in</Navbar.Text>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
