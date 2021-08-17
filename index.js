const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("passport");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

const app = express();

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL_TEST,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to mongo test server");
  }
);

//Middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);

app.use("/api/auth", authRoute);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
