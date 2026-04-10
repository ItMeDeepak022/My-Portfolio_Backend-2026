let express = require('express')
let mongoose = require('mongoose')
const { adminRoute } = require('./backend/routers/adminRoute')
const { portfolioRoutes } = require('./backend/routers/portfolioRoute')
let cors = require('cors')
let fs = require('fs');
let App = express()

require('dotenv').config()

App.use(express.json())
App.use(cors())


const ensureDir = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// create all folders in /tmp
ensureDir("/tmp/uploads/profile");
ensureDir("/tmp/uploads/resume");
ensureDir("/tmp/uploads/internship");
ensureDir("/tmp/uploads/project");
ensureDir("/tmp/uploads/certificate");


// DB connection with caching
let isConnected = false
const connectDB = async () => {
    if (isConnected) return
    const db = await mongoose.connect(process.env.DbUrl)
    isConnected = db.connections[0].readyState
    console.log('DB connected to ATLAS..')
}

// Connect before every request
App.use(async (req, res, next) => {
    try {
        await connectDB()
        next()
    } catch (error) {
        res.status(500).json({ status: false, message: 'DB connection failed' })
    }
})

App.use('/admin', adminRoute)
App.use("/portfolio-API", portfolioRoutes)

App.use('/uploads/profile', express.static('/tmp/uploads/profile'))
App.use('/uploads/resume', express.static('/tmp/uploads/resume'))
App.use('/uploads/internship', express.static('/tmp/uploads/internship'))
App.use('/uploads/project', express.static('/tmp/uploads/project'))
App.use('/uploads/certificate', express.static('/tmp/uploads/certificate'))

App.get('/', (req, res) => {
    res.send({ status: true, message: "Backend is working now...." })
})

module.exports = App