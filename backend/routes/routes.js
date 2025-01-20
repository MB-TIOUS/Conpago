const express = require("express");
const router = express.Router();
const AuthController = require("./../controllers/AuthController");
const MusixController = require("./../controllers/MusixController");

router.post("/auth/login", AuthController.login);
router.post("/auth/signup", AuthController.signup);

// Protect all routes after this middleware
router.use(AuthController.protect);

router.get("/top-artists/:country", MusixController.getArtists);
router.get("/albums/:artist_id", MusixController.getAlbums);
router.get("/lyrics/:album_id", MusixController.getLyrics);

module.exports = router;
