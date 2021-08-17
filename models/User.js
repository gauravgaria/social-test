const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
    },
    profile_img: {
      type: String,
      default: "",
    },
    cover_img: {
      type: String,
      default: "",
    },
    //Array(friends) -> store friend's ids in array
    friends: {
      type: Array,
      default: [],
    },
    // when user created -> it will be false
    isAdmin: {
      type: Boolean,
      default: false,
    },
    desc: {
      type: String,
      max: 150,
    },
    current_city: {
      type: String,
      max: 50,
    },
  },
  { timestamps: true } //auto generate createdAt and updatedAt fields
);

module.exports = mongoose.model("User", UserSchema);
