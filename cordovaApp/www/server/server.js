const express = require("express");
const app = express();
const cors = require("cors");
const questionnaireRoutes = require('./routes/questionnaires');
const authRoutes = require('./routes/AuthRoutes');
const answersRouter = require('./routes/answers');
const RewardRoutes = require('./routes/RewardRoutes');
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Database connection and associations
const sequelize = require('./db/conn');
const { applyAssociations } = require('./associate');

// Apply associations
applyAssociations();
console.log('Associations applied');

// Sync the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables synced!');
  })
  .catch(err => {
    console.error('Failed to sync database and tables', err);
  });

app.use(cors());
app.use(express.json());
app.use('/', questionnaireRoutes);
app.use('/', authRoutes);
app.use('/', answersRouter);
app.use('/', RewardRoutes);

app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'");
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  next();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;
