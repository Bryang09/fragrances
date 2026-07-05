require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

const fragranceRoutes = require("./routes/fragranceRoutes");
const fragranceHouseRoutes = require("./routes/fragranceHouseRoutes");
const noteRoutes = require("./routes/notesRoutes");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/fragrances", fragranceRoutes);
app.use("/api/fragrance_house", fragranceHouseRoutes);
app.use("/api/notes", noteRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listenting on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
