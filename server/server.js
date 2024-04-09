const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const questionnaireRoutes = require('./routes/questionnaires');
const authRoutes = require('./routes/AuthRoutes');
const answersRouter = require('./routes/answers');

app.use('/', questionnaireRoutes);
app.use('/', authRoutes);
app.use('/', answersRouter);

require("./db/conn");

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

