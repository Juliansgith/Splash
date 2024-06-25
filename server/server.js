const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const questionnaireRoutes = require("./routes/questionnaires");
const authRoutes = require("./routes/AuthRoutes");
const answersRouter = require("./routes/answers");
const RewardRoutes = require("./routes/RewardRoutes");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;

// Database connection and associations
const sequelize = require("./db/conn");
const { applyAssociations } = require("./associate");

// Apply associations
applyAssociations();
console.log("Associations applied");

// Read SSL certificate and key
const privateKey = fs.readFileSync('certs/key.pem', 'utf8');
const certificate = fs.readFileSync('certs/cert.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables synced!");
    // Start the HTTPS server
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(port, '0.0.0.0', () => {
      console.log(`Server running on https://0.0.0.0:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to sync database and tables", err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", questionnaireRoutes);
app.use("/", authRoutes);
app.use("/", answersRouter);
app.use("/", RewardRoutes);

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'"
  );
  res.setHeader(
    "Strict-Transport-Security",
    "max-age=31536000; includeSubDomains; preload"
  );
  next();
});
