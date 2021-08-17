const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user

// -> /:id -> /api/user/user-id
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    //if user updates his password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.password);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    //update user here
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body, // will set all inside the db
      });

      res.status(200).json("account updated");
    } catch (err) {}
  } else {
    return res.status(403).json("you can only update your account");
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("account deleted");
    } catch (err) {}
  } else {
    return res.status(403).json("you can only delete your account");
  }
});

// get user info

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow/friend request user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      res.status(200).json("account deleted");
    } catch (err) {}
  } else {
    return res.status(403).json("you can only delete your account");
  }
});

// un follow/unfriend request user

module.exports = router;
