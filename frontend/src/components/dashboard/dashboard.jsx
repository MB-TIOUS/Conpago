import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "../navBar";

// dashboard for top user albums
const Dashboard = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const user = JSON.parse(localStorage.getItem("user"));
        const country = user.country ? user.country : "US";
        const response = await axios.get(
          `http://localhost:5000/api/top-artists/${country}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setArtists(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching artists."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const handleAlertDismiss = () => setError(null);

  const handleArtistClick = (artist_id) => {
    navigate(`/albums/${artist_id}`); // Navigate to Albums component with artistId in the URL
  };

  return (
    <>
      <NavbarComponent />
      <Container className="mt-4">
        <h1 className="text-center mb-4">Top Artists</h1>

        {error && (
          <Alert variant="danger" onClose={handleAlertDismiss} dismissible>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {artists.map((artist) => (
              <Col key={artist.artist_id}>
                <Card
                  className="h-100 shadow-sm"
                  onClick={() => handleArtistClick(artist.artist_id)} // Trigger navigation with artistId
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title>{artist.artist_name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default Dashboard;
