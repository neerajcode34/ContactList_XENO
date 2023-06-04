const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");

const auth = require("./middleware/auth");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

app.get("/", (req, res) => {
  res.send("Welcome");
});

//routes
app.get("/protected", auth, (req, res) => {
  return res.status(200).json({ ...req.user._doc });
});
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/contact"));

// Connect to MongoDB Atlas using environment variable
const uri = process.env.DB_URL;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Start the server after successful database connection
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server listening on port: ${PORT}`);
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });
