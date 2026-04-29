const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // ✅ THIS IS REQUIRED

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Server start
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port " + (process.env.PORT || 5000));
});