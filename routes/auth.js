const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register

router.post("/register", async (req, res) => {
  try {
    //generate hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    //save user
    const user = await newUser.save();
    res.status(200).send(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("No user found"); // inline condition if !user && -> (do) this this, here && == do this

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    ); // compare two cases get pass == user.pass (db pass)
    !validPassword && res.status(404).json("wrong password");

    //else condition working here
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
