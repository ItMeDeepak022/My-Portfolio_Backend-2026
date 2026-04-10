let express = require('express')
let mongoose = require('mongoose')
const { adminRoute } = require('./backend/routers/adminRoute')
const { portfolioRoutes } = require('./backend/routers/portfolioRoute')
let App = express()

// To access the .env variables
require('dotenv').config()

//To allow the data from fronted to backend
App.use(express.json())


// To manages the diffrents ports like fronted port in backend 
let cors = require('cors')
App.use(cors())


App.use('/admin', adminRoute)
App.use("/portfolio-API", portfolioRoutes)


// To Allow to show img url to access any where..

// App.use('/uploads/profile', express.static('uploads/profile'))
// App.use('/uploads/resume', express.static('uploads/resume'))
// App.use('/uploads/internship', express.static('uploads/internship'))
// App.use('/uploads/project', express.static('uploads/project'))
// App.use('/uploads/certificate', express.static('uploads/certificate'))

// Also use it for view photo as live after hosted your backend

App.use('/uploads/profile', express.static('/tmp/uploads/profile'))
App.use('/uploads/resume', express.static('/tmp/uploads/resume'))
App.use('/uploads/internship', express.static('/tmp/uploads/internship'))
App.use('/uploads/project', express.static('/tmp/uploads/project'))
App.use('/uploads/certificate', express.static('/tmp/uploads/certificate'))

//https://localhost:9000
App.get('/', (req, res) => {
    res.send({
        status: true,
        message: "Backend is working now...."
    })
})


await mongoose.connect(process.env.DbUrl)
    .then(() => {
        console.log('DB connected to ATLAS..');
    })
    .catch((error) => {
        console.log(error);
    })

module.exports = App