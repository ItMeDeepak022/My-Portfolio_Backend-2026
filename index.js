let express = require('express')
let mongoose = require('mongoose')
const { adminRoute } = require('./backend/routers/adminRoute')
const { portfolioRoutes } = require('./backend/routers/portfolioRoute')
let cors = require('cors')

let App = express()

require('dotenv').config()

App.use(express.json())
App.use(cors())

// DB connect
mongoose.connect(process.env.DbUrl)
    .then(() => {
        App.listen(process.env.PORT, () => {

            console.log("MongoDB connected to Atlas..", process.env.PORT);
        });

    })
    .catch((err) => {
        console.log('connection failed..', err);
    })

// Routes
App.use('/admin', adminRoute)
App.use("/portfolio-API", portfolioRoutes)

// Static files (Render friendly)
App.use('/uploads/profile', express.static('uploads/profile'))
App.use('/uploads/resume', express.static('uploads/resume'))
App.use('/uploads/internship', express.static('uploads/internship'))
App.use('/uploads/project', express.static('uploads/project'))
App.use('/uploads/certificate', express.static('uploads/certificate'))

// Home
App.get('/', (req, res) => {
    res.send({ status: true, message: "Backend is working now...." })
})


