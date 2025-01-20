import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import NavbarComponent from "../navBar";

//getting last 3 albums of the artist
const Albums = () => {
  const { artist_id } = useParams(); // Get artistId from URL
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://localhost:5000/api/albums/${artist_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAlbums(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching albums."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [artist_id]);

  const handleAlertDismiss = () => setError(null);

  return (
    <>
      <NavbarComponent />

      <Container className="mt-4">
        <h1 className="text-center mb-4">Albums</h1>

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
            {albums.map((album) => (
              <Col key={album.album_id}>
                <Card
                  className="h-100 shadow-sm"
                  onClick={() => navigate(`/lyrics/${album.album_id}`)} // Navigate to Lyrics Component
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title>{album.album_name}</Card.Title>
                    <Card.Text>By {album.artist_name}</Card.Text>
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

export default Albums;
