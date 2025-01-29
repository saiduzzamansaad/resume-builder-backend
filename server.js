
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://myUser:myPassword123@mycluster.okkdt.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Schema and Model
const cvSchema = new mongoose.Schema({
  fullName: String,
  jobTitle: String,
  fullAddress: String,
  phoneNumber: String,
  emailAddress: String,
  skills: [String],
  hasLicense: Boolean,
  licenseType: String,
  selfIntro: String,
  experiences: [
    {
      jobTitle: String,
      companyName: String,
      location: String,
      startDate: Date,
      endDate: Date,
      isCurrentJob: Boolean,
      description: String,
    },
  ],
  educationData: [
    {
      degreeTitle: String,
      institutionName: String,
      startDate: Date,
      endDate: Date,
    },
  ],
});

const CV = mongoose.model("CV", cvSchema);

// Routes
app.post("/save-cv", async (req, res) => {
  try {
    const newCV = new CV(req.body);
    await newCV.save();
    res.status(201).json({ message: "CV saved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error saving CV" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on 44.226.145.213`);
});
