const certificateModel = require("../model/certificate.model")
const internshipModel = require("../model/internship.model")
const profileModel = require("../model/profile.model")
const projectModel = require("../model/project.model")
const resumeModel = require("../model/resume.model")
const skillsModel = require("../model/skills.model")

let profilesData = async (req, res) => {

    let data = await profileModel.find()

    res.send({
        status: true,
        message: 'profiles data fecthed...',
        path: process.env.profilepath,
        data

    })
}

let resumeData = async (req, res) => {

    let data = await resumeModel.find()

    res.send({
        status: true,
        message: 'resume data fecthed...',
        path: process.env.resumepath,
        data

    })
}

let skillData = async (req, res) => {

    let data = await skillsModel.find()

    res.send({
        status: true,
        message: ' skill data fecthed...',
        data

    })
}

let internshipData = async (req, res) => {

    let data = await internshipModel.find()

    res.send({
        status: true,
        message: 'internship data fecthed...',
        path: process.env.internpath,
        data

    })
}

let projectData = async (req, res) => {

    let data = await projectModel.find()

    res.send({
        status: true,
        message: ' project data fecthed...',
        path: process.env.projectpath,
        data

    })
}


let certificateData = async (req, res) => {

    let data = await certificateModel.find()

    res.send({
        status: true,
        message: 'certificate data fecthed...',
        path:process.env.certificatepath,
        data

    })
}


module.exports = {
    profilesData, resumeData, 
    skillData, internshipData, projectData,certificateData
}