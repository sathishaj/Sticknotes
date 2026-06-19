const express = require("express");
const mongoose = require("mongoose");
const notesRoutes = require("./Routes/notesRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();


app.use(cors())

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("hello world");
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MANGO_URI)
  .then(() => {
    app.listen(process.env.PORT , () => {
      console.log("MongoDB server is running on port", process.env.PORT );
    });
  })
  .catch((error) => {
    console.error("Connection error:", error);
  });

// API routes
app.use("/api/notes", notesRoutes);
