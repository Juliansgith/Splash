const mongoose = require("mongoose");

mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.error("Connection failed:", err);
  });
