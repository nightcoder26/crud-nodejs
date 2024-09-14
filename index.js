const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Failed to connect to database");
  });

app.use("/api", userRoute);

app.get("/", (req, res) => {
  res.send("weeeeeeeeeee");
});
