let express = require('express');
let mongoose = require('mongoose');
const { adminRoute } = require('./backend/routers/adminRoute');
const { portfolioRoutes } = require('./backend/routers/portfolioRoute');
let cors = require('cors');

let App = express();

require('dotenv').config();

App.use(express.json());
App.use(cors());

// 🔥 DB connect once
mongoose.connect(process.env.DbUrl)
    .then(() => console.log("DB connected to ATLAS.."))
    .catch(err => console.log(err));

// Routes
App.use('/admin', adminRoute);
App.use("/portfolio-API", portfolioRoutes);

// Home
App.get('/', (req, res) => {
    res.send({ status: true, message: "Backend is working now...." });
});

module.exports = App;