const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const questionnaireRoutes = require('./routes/questionnaires');
const authRoutes = require('./routes/AuthRoutes');

app.use('/', questionnaireRoutes);
app.use('/', authRoutes);

require("./db/conn");

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

