let express=require('express')
const { profilesData, resumeData, skillData, internshipData, projectData, certificateData } = require('../controller/portfolioController')
let portfolioRoutes=express()


portfolioRoutes.get('/profile-data',profilesData)

portfolioRoutes.get('/resume-data',resumeData)

portfolioRoutes.get('/skill-data',skillData)

portfolioRoutes.get('/internship-data',internshipData)

portfolioRoutes.get('/project-data',projectData)

 
portfolioRoutes.get('/certificate-data',certificateData)






module.exports={portfolioRoutes}