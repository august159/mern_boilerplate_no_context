const express = require("express");
const router = express.Router();
const StreetArtModel = require("./../models/StreetArt");
const fileUploader = require("./../configs/cloudinary");

router.get("/", async (req, res) => {
  try {
    const streetArts = await StreetArtModel.find();
    res.status(200).json({ streetArts });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const streetArtId = req.params.id;
  try {
    const searchedStreetArt = await StreetArtModel.findById(streetArtId);
    res.status(200).json({ searchedStreetArt });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", fileUploader.single("picture"), async (req, res, next) => {
  const { lat, lng } = req.body;
  const newStreetArt = { location: { coordinates: [lat, lng] } };
  if (req.file) {
    newStreetArt.pictureUrl = req.file.path;
  }
  try {
    const createdStreetArt = await StreetArtModel.create(newStreetArt);
    res.status(201).json(createdStreetArt);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
