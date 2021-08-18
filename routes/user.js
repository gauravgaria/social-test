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
    const { password, updatedAt, ...other } = user._doc; // saves pass & updAt from user._doc(all user data) and rest is stored in other var
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow/friend request user

router.put("/:id/follow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.friends.includes(req.body.userId)) {
        await user.updateOne({ $push: { friends: req.body.userId } });
        res.status(200).json("user followed");
      } else {
        res.send(403).json("already your friend");
      }
    } catch (err) {}
  } else {
    return res.status(403).json("some error");
  }
});

// un follow/unfriend request user

router.put("/:id/unfollow", async (req, res) => {
  if (req.body.userId !== req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.friends.includes(req.body.userId)) {
        await user.updateOne({ $pull: { friends: req.body.userId } });
        res.status(200).json("user unfollowed");
      } else {
        res.send(403).json("already your friend");
      }
    } catch (err) {}
  } else {
    return res.status(403).json("some error");
  }
});

module.exports = router;
