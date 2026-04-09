let express = require('express')
const { login, registration } = require('../controller/authController')
const { addProfile, editProfile, deleteProfile, addResume, editResume, deleteResume, addskill, viewSkills, editSkills, deleteSkills, addIntern, viewIntern, editIntern, deleteIntern, addproject, editproject, viewproject, deleteproject, addCertificate, viewCertificate, deleteCertificate, editCertificate, viewProfile, viewResume } = require('../controller/admin_action_Controller')
const { fileupload } = require('../config/multerConfig')
const upload = require('../config/multerConfig')
let adminRoute = express()

// ADD PROFILE
adminRoute.post('/add', upload('profile').single('profileImg'), addProfile)
adminRoute.get('/view',viewProfile)
adminRoute.put('/edit/:id', upload('profile').single('profileImg'), editProfile)
adminRoute.delete('/delete/:id', deleteProfile)
// ----------------------------------------------


// Resume Section

adminRoute.post('/add-resume', upload('resume').single("resumeLetter"), addResume)
adminRoute.get('/view-resume',viewResume)
adminRoute.put('/edit-resume/:id', upload('resume').single('resumeLetter'), editResume)
adminRoute.delete('/delete-resume/:id', deleteResume)



// Skill Sections.......................

adminRoute.post('/add-skill', addskill)
adminRoute.put('/edit-skill/:id', editSkills)
adminRoute.get('/view-skills', viewSkills)
adminRoute.delete('/delete-skill/:id', deleteSkills)


// Internship Sections.......................

adminRoute.post('/add-intern', upload('internship').single('internImg'), addIntern)
adminRoute.put('/edit-intern/:id', upload('internship').single('internImg'), editIntern)
adminRoute.get('/view-intern', viewIntern)
adminRoute.delete('/delete-intern/:id', deleteIntern)


// Internship Sections.......................

adminRoute.post('/add-project', upload('project').single('projectImg'), addproject)
adminRoute.put('/edit-project/:id', upload('project').single('projectImg'), editproject)
adminRoute.get('/view-project', viewproject)
adminRoute.delete('/delete-project/:id', deleteproject)


// certificate Sections.......................

adminRoute.post('/add-certificate', upload('certificate')
    .fields([
        { name: "certificateImg", maxCount: 1 },
        { name: "certificatePdf", maxCount: 1 }
    ]), addCertificate)

adminRoute.put('/edit-certificate/:id', upload('certificate')
    .fields([
        { name: "certificateImg", maxCount: 1 },
        { name: "certificatePdf", maxCount: 1 }
    ])
    , editCertificate)

adminRoute.get('/view-certificate', viewCertificate)
adminRoute.delete('/delete-certificate/:id', deleteCertificate)





// Authentication Roters

adminRoute.post('/login', login)
adminRoute.post('/registration', registration)

// -----------------------------------------------------

module.exports = { adminRoute }