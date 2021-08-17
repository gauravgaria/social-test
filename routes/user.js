const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

// update user

// -> /:id -> /api/user/user-id
router.put("/:id", async (req, res) => {
  console.log(req.body.userId);
  console.log(req.params.id);
  if (req.body.userId === req.params.id || req.user.isAdmin) {
    //if user updates his password
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    //update user here
    try {
      console.log(req.body);
      console.log(req.params.id);
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body, // will set all inside the db
      });
      console.log("reached here");
      res.status(200).json("account updated");
    } catch (err) {}
  } else {
    return res.status(403).json("you can only update your account");
  }
});
// delete user
// get user info
// follow/friend request user
// un follow/unfriend request user

module.exports = router;
