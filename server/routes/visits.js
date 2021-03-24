const express = require("express");
const StreetArtModel = require("../models/StreetArt");
const VisitModel = require("../models/Visit");
const isLoggedIn = require("../middlewares/isLoggedIn");
const router = express.Router();

// Route to get a user's visits
router.get("/my-visits", isLoggedIn, async (req, res, next) => {
  try {
    const visits = await VisitModel.find({
      _user: req.session.currentUser._id,
    }).populate("_streetArt");
    res.status(200).json(visits);
  } catch (err) {
    next(err);
  }
});

// Route to add a street art to user
//* Post: create a new visit
router.post("/visits", isLoggedIn, async (req, res, next) => {
  const newVisit = { ...req.body };
  newVisit._user = req.session.currentUser._id;
  try {
    const createdVisit = await VisitModel.create(newVisit);
    res.status(201).json(createdVisit);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Route to delete a visit
//* Delete a visit
router.delete("/visits/:id", async (req, res) => {
  const visitToDelete = await VisitModel.findById(req.params.id).populate(
    "_user"
  );
  const userOwnerId = visitToDelete._user._id;

  if (userOwnerId.toString() === req.session.currentUser._id.toString()) {
    try {
      const deletedVisit = await VisitModel.findByIdAndDelete(req.params.id);
      res.status(202).json(deletedVisit);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).json("Bad credentials");
  }
});

module.exports = router;
