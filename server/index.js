const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const router = express.Router();
const path = require("path");

const authRoute = require("./routes/auth");


dotenv.config();

// console.log(process.env.MONGO_URL);
async function connectToMongoDB() {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  }

  connectToMongoDB();

  app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploded successfully");
    } catch (error) {
      console.error(error);
    }
  });
  
  app.use("/api/auth", authRoute);

app.listen(5000, () => {
    console.log("Backend server is running!");
  });