const axios = require("axios");
const AppError = require("../utils/appError");
require("dotenv").config();

//musixmatch api calls from here
const MUSIXMATCH_API_KEY = process.env.MUSIXMATCH_API_KEY;

//get all top artists of the given country
exports.getArtists = async (req, res, next) => {
  const { country } = req.params;
  try {
    const response = await axios.get(
      `https://api.musixmatch.com/ws/1.1/chart.artists.get`,
      {
        params: {
          apikey: MUSIXMATCH_API_KEY,
          country,
        },
      }
    );

    // transform rowdata into easy to read and useful info.
    let rawData = response.data.message.body.artist_list;
    let artist_list = rawData.map((item) => ({
      artist_id: item.artist.artist_id,
      artist_name: item.artist.artist_name,
    }));
    res.status(200).json({
      status: "success",
      message: "artist list",
      data: artist_list,
    });
  } catch (err) {
    next(err);
  }
};

// Get last 3 albums for an artist
exports.getAlbums = async (req, res, next) => {
  const { artist_id } = req.params;
  try {
    const response = await axios.get(
      `https://api.musixmatch.com/ws/1.1/artist.albums.get`,
      {
        params: {
          apikey: MUSIXMATCH_API_KEY,
          artist_id,
          page_size: 3,
          s_release_date: "desc",
          g_album_name: 1,
        },
      }
    );

    // transform the data received from api
    let rawData = response.data.message.body.album_list;
    let album_list = rawData.map((item) => ({
      album_id: item.album.album_id,
      album_name: item.album.album_name,
      artist_name: item.album.artist_name,
    }));

    res.status(200).json({
      status: "success",
      message: "album list",
      data: album_list,
    });
  } catch (err) {
    next(err);
  }
};

// Get lyrics for a song
exports.getLyrics = async (req, res, next) => {
  const { album_id } = req.params;

  try {
    //  Get all tracks in the album
    const tracksResponse = await axios.get(
      "https://api.musixmatch.com/ws/1.1/album.tracks.get",
      {
        params: {
          apikey: MUSIXMATCH_API_KEY,
          album_id,
        },
      }
    );

    const tracks = await tracksResponse.data.message.body.track_list;

    // Fetch lyrics for each track
    const lyricsPromises = tracks.map(async (track) => {
      const trackId = track.track.track_id;

      const lyricsResponse = await axios.get(
        "https://api.musixmatch.com/ws/1.1/track.lyrics.get",
        {
          params: {
            apikey: MUSIXMATCH_API_KEY,
            track_id: trackId,
          },
        }
      );

      const lyrics = await lyricsResponse.data.message.body.lyrics.lyrics_body;
      return {
        track_name: track.track.track_name,
        lyrics,
      };
    });

    const lyricsData = await Promise.all(lyricsPromises);
    res.status(200).json({
      status: "success",
      message: "lyrics list",
      data: lyricsData,
    });
  } catch (err) {
    next(err);
  }
};
