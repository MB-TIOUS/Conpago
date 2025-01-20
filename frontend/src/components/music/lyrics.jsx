import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Alert, Spinner, Card } from "react-bootstrap";
import NavbarComponent from "../navBar";
import axios from "axios";

//get lyrics of the given album songs
const Lyrics = () => {
  const { album_id } = useParams(); // Get albumId from URL
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLyrics = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `http://127.0.0.1:5000/api/lyrics/${album_id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTracks(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching lyrics."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLyrics();
  }, [album_id]);

  const handleAlertDismiss = () => setError(null);

  return (
    <>
      <NavbarComponent />
      <h1 className=" justify-content-center text-center mb-4">Lyrics</h1>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center mt-4"
        style={{ minHeight: "100vh" }}
      >
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
          <div>
            {tracks.map((track, index) => (
              <Card className="mb-3 shadow-sm" key={index}>
                <Card.Body>
                  <Card.Title>
                    <h3>{track.track_name}</h3>
                  </Card.Title>
                  <Card.Text style={{ whiteSpace: "pre-line" }}>
                    {track.lyrics}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </>
  );
};

export default Lyrics;
