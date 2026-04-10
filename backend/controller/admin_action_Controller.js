//  1. Profiles API Logics

const { set } = require("mongoose")
const profileModel = require("../model/profile.model");
const resumeModel = require("../model/resume.model");
const skillsModel = require("../model/skills.model");
const internshipModel = require("../model/internship.model");
const projectModel = require("../model/project.model");
const certificateModel = require("../model/certificate.model");
const cloudinary = require("../config/cloudinary");
let addProfile = async (req, res) => {
    try {
        let obj = { ...req.body };

        if (req.file && req.file.path) {
            obj.profileImg = req.file.path;
        }

        let Resobj = await profileModel.create(obj);

        res.send({
            status: true,
            message: "Profile successfully added...",
            Resobj
        });

    } catch (err) {
        res.send({
            status: false,
            message: "error found",
            error: err.message
        });
    }
};


let viewProfile = async (req, res) => {

    let data = await profileModel.find()

    res.send({
        status: true,
        message: "Profile data fetched...",
        path: process.env.profilepath,
        data
    })
}


let editProfile = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await profileModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not exist" });
        }

        if (req.file && req.file.path) {

            // 🔥 delete old image
            if (data.profileImg) {
                let publicId = data.profileImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`profile/${publicId}`);
            }

            obj.profileImg = req.file.path;
        }

        await profileModel.updateOne({ _id: id }, { $set: obj });

        res.send({
            status: true,
            message: "Profile updated successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};



let deleteProfile = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await profileModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        // 🔥 delete image from cloudinary
        if (data.profileImg) {
            let publicId = data.profileImg.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`profile/${publicId}`);
        }

        await profileModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Profile deleted successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

// -----------------------------------------------------------------------------

// Resume API  logics

let addResume = async (req, res) => {
    try {
        let obj = { ...req.body };

        // 🔥 Cloudinary URL
        if (req.file && req.file.path) {
            obj.resumeLetter = req.file.path;
        }

        let Resobj = await resumeModel.create(obj);

        res.send({
            status: true,
            message: "Resume successfully added...",
            Resobj
        });

    } catch (err) {
        res.send({
            status: false,
            message: "error found",
            error: err.message
        });
    }
};


let editResume = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await resumeModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        let obj = { ...req.body };

        if (req.file && req.file.path) {

            // 🔥 delete old resume
            if (data.resumeLetter) {
                let publicId = data.resumeLetter.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`resume/${publicId}`);
            }

            obj.resumeLetter = req.file.path;
        }

        await resumeModel.findByIdAndUpdate(id, obj);

        res.send({
            status: true,
            message: "Resume updated successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

let viewResume = async (req, res) => {

    let data = await resumeModel.find()

    res.send({
        status: true,
        message: "Resume data fetched...",
        path: process.env.resumepath,
        data
    })
}

 
let deleteResume = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await resumeModel.findById(id);

        if (!data) {
            return res.send({
                status: false,
                message: "Id not found"
            });
        }

        // 🔥 delete resume from cloudinary
        if (data.resumeLetter) {
            let publicId = data.resumeLetter.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`resume/${publicId}`);
        }

        // 🔥 delete from DB
        await resumeModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Resume deleted successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

// Skill API Logics...........

let addskill = async (req, res) => {

    let obj = req.body

    let data = await skillsModel.create(obj)

    res.send({
        status: true,
        message: 'skill added now..',
        data
    })
}

let viewSkills = async (req, res) => {

    let data = await skillsModel.find()

    res.send({
        status: true,
        message: "skills data founds...",
        data
    })
}

let editSkills = async (req, res) => {

    let { id } = req.params
    let obj = req.body
    let found = await skillsModel.findById({ _id: id })


    if (found) {

        let Resobj = await skillsModel.updateOne({ _id: id },
            { $set: obj }
        )

        res.send({
            status: true,
            message: "skill updated successfully...",
            Resobj
        })
    }
    else {
        res.send({
            status: false,
            message: 'Id does not valid...'
        })
    }
}

let deleteSkills = async (req, res) => {

    let { id } = req.params
    let found = await skillsModel.findById({ _id: id })


    if (found) {

        let Resobj = await skillsModel.deleteOne({ _id: id })

        res.send({
            status: true,
            message: "skill deleted successfully...",
            Resobj
        })
    }
    else {
        res.send({
            status: false,
            message: 'Id does not valid...'
        })
    }
}

// Internship API Logics...........


let addIntern = async (req, res) => {

    let obj = { ...req.body };

    if (req.file && req.file.path) {
        obj.internImg = req.file.path;
    }

    let data = await internshipModel.create(obj);

    res.send({
        status: true,
        message: 'Internship details added now..',
        data
    });
};

let viewIntern = async (req, res) => {

    let data = await internshipModel.find()

    res.send({
        status: true,
        path: process.env.internpath,
        data
    })
}

let editIntern = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await internshipModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not exist" });
        }

        if (req.file && req.file.path) {

            if (data.internImg) {
                let publicId = data.internImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`internship/${publicId}`);
            }

            obj.internImg = req.file.path;
        }

        await internshipModel.updateOne({ _id: id }, { $set: obj });

        res.send({
            status: true,
            message: "Intern updated successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

let deleteIntern = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await internshipModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.internImg) {
            let publicId = data.internImg.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`internship/${publicId}`);
        }

        await internshipModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Intern deleted successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};


// Project API Logics...........


let addproject = async (req, res) => {

    let obj = { ...req.body };

    if (req.file && req.file.path) {
        obj.projectImg = req.file.path;
    }

    let data = await projectModel.create(obj);

    res.send({
        status: true,
        message: 'Project added..',
        data
    });
};

let viewproject = async (req, res) => {

    let data = await projectModel.find()

    res.send({
        status: true,
        path: process.env.projectpath,
        data
    })
}

let editproject = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await projectModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not exist" });
        }

        if (req.file && req.file.path) {

            if (data.projectImg) {
                let publicId = data.projectImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`project/${publicId}`);
            }

            obj.projectImg = req.file.path;
        }

        await projectModel.updateOne({ _id: id }, { $set: obj });

        res.send({
            status: true,
            message: "Project updated successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

let deleteproject = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await projectModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.projectImg) {
            let publicId = data.projectImg.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`project/${publicId}`);
        }

        await projectModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Project deleted successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};


// Certificate API Logics...........


let addCertificate = async (req, res) => {
    try {
        let obj = { ...req.body };

        // 🔥 IMAGE
        if (req.files?.certificateImg) {
            obj.certificateImg = req.files.certificateImg[0].path;
        }

        // 🔥 PDF
        if (req.files?.certificatePdf) {
            obj.certificatePdf = req.files.certificatePdf[0].path;
        }

        let data = await certificateModel.create(obj);

        res.send({
            status: true,
            message: "Certificate added successfully",
            data
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

let viewCertificate = async (req, res) => {

    let data = await certificateModel.find()

    res.send({
        status: true,
        path: process.env.certificatepath,
        data
    })
}

let editCertificate = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await certificateModel.findById(id);

        if (!data) {
            return res.send({
                status: false,
                message: "Id does not exist..."
            });
        }

        // 🔥 IMAGE UPDATE
        if (req.files?.certificateImg) {

            if (data.certificateImg) {
                let publicId = data.certificateImg.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`certificate/${publicId}`);
            }

            obj.certificateImg = req.files.certificateImg[0].path;
        }

        // 🔥 PDF UPDATE
        if (req.files?.certificatePdf) {

            if (data.certificatePdf) {
                let publicId = data.certificatePdf.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(`certificate/${publicId}`);
            }

            obj.certificatePdf = req.files.certificatePdf[0].path;
        }

        let ResObj = await certificateModel.updateOne(
            { _id: id },
            { $set: obj }
        );

        res.send({
            status: true,
            message: "Certificate updated successfully...",
            ResObj
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};


let deleteCertificate = async (req, res) => {
    try {
        let { id } = req.params;

        let data = await certificateModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        // 🔥 delete image
        if (data.certificateImg) {
            let publicId = data.certificateImg.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`certificate/${publicId}`);
        }

        // 🔥 delete pdf
        if (data.certificatePdf) {
            let publicId = data.certificatePdf.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(`certificate/${publicId}`);
        }

        await certificateModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Certificate deleted successfully"
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};



module.exports = {
    addProfile, editProfile, deleteProfile, viewProfile,
    addResume, viewResume, editResume, deleteResume,
    addskill, viewSkills, editSkills, deleteSkills,
    addIntern, viewIntern, editIntern, deleteIntern,
    addproject, viewproject, editproject, deleteproject,
    addCertificate, viewCertificate, editCertificate, deleteCertificate
}