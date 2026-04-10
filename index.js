let express = require('express');
let mongoose = require('mongoose');
const { adminRoute } = require('./backend/routers/adminRoute');
const { portfolioRoutes } = require('./backend/routers/portfolioRoute');
let cors = require('cors');

let App = express();

require('dotenv').config();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.use(cors());

// DB connect
mongoose.connect(process.env.DbUrl)
    .then(() => console.log("DB connected to ATLAS.."))
    .catch(err => console.log("DB Error:", err));

// Routes
App.use('/admin', adminRoute);
App.use("/portfolio-API", portfolioRoutes);

// Home
App.get('/', (req, res) => {
    res.send({ status: true, message: "Backend is working now...." });
});

// Global Error Handler
App.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ status: false, message: err.message || "Internal Server Error" });
});

module.exports = App;
