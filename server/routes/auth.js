const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const isLoggedIn = require("./../middlewares/isLoggedIn");

router.post("/signup", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password required" });
    return;
  }
  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const newUser = { email, password: hashedPassword };
    const createdUser = await User.create(newUser);
    res.status(201).json({ message: "User account created" });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      res.status(400).json({ message: "Bad credentials" });
      return;
    }

    const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    if (!isSamePassword) {
      res.status(400).json({ message: "Bad credentials" });
      return;
    }

    req.session.currentUser = {
      _id: foundUser._id,
      //   role: foundUser.role
    };

    res.redirect("/api/current-user");
  } catch (error) {
    next(error);
  }
});

router.get("/current-user", isLoggedIn, async (req, res, next) => {
  try {
    const activeUser = await User.findById(req.session.currentUser._id).select(
      "-password"
    );
    res.status(200).json(activeUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/logout", (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json({ message: "Successfuly logged out" });
  });
});

module.exports = router;
