//  1. Profiles API Logics

const { set } = require("mongoose")
const fs = require("fs");

const path = require("path");
const profileModel = require("../model/profile.model");
const resumeModel = require("../model/resume.model");
const skillsModel = require("../model/skills.model");
const internshipModel = require("../model/internship.model");
const projectModel = require("../model/project.model");
const certificateModel = require("../model/certificate.model");

let addProfile = async (req, res) => {

    try {
        let obj = { ...req.body }



        if (req.file) {
            if (req.file.filename != "" && req.file.filename != null && req.file.filename != undefined) {
                obj['profileImg'] = req.file.filename
            }
        }

        let Resobj = await profileModel.create(obj)


        res.send({
            status: true,
            message: "Profile successfully added...",
            path: process.env.profilepath,
            Resobj
        })
    }
    catch (err) {
        res.send(
            {
                status: false,
                message: "error found",
                error: err
            }
        )
    }
}

let editProfile = async (req, res) => {

    let { id } = req.params;
    let obj = { ...req.body }

    let data = await profileModel.findOne({ _id: id });

    if (!data) {
        return res.send({
            status: false,
            message: "Id does not exist..."
        });
    }

   

    // ✅ NEW IMAGE AAYI TO OLD DELETE KARO
    if (req.file && req.file.filename) {

        if (data.profileImg) {
            const filePath = `/tmp/uploads/profile/${data.profileImg}`;

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }

        obj.profileImg = req.file.filename;
    }

    let ResObj = await profileModel.updateOne(
        { _id: id },
        { $set: obj }
    );

    res.send({
        status: true,
        message: "profile updated successfully...",
        ResObj
    });
}

let viewProfile = async (req, res) => {

    let data = await profileModel.find()

    res.send({
        status: true,
        message: "Profile data fetched...",
        path: process.env.profilepath,
        data
    })
}

let deleteProfile = async (req, res) => {
    try {


        let { id } = req.params;

        let data = await profileModel.findById(id);



        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.profileImg) {
            let filePath = path.join(
                process.cwd(),
                "uploads",
                "profile",
                data.profileImg
            );



            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("✅ Image deleted");
            } else {
                console.log("❌ File not found");
            }
        }

        await profileModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Profile deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            error: error.message
        });
    }
};

// -----------------------------------------------------------------------------

// Resume API  logics

let addResume = async (req, res) => {

    try {
        let obj = { ...req.body }

        console.log(req.file); // ✅ single file
        console.log(req.body);

        // ✅ correct handling
        if (req.file && req.file.filename) {
            obj['resumeLetter'] = req.file.filename;
        }

        let Resobj = await resumeModel.create(obj)

        res.send({
            status: true,
            message: "Resume successfully added...",
            path: process.env.resumepath,
            Resobj
        })

    } catch (err) {
        res.send({
            status: false,
            message: "error found",
            err
        })
    }
}


let editResume = async (req, res) => {

    try {
        let { id } = req.params;

        let data = await resumeModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        let obj = { ...req.body };

        // ✅ agar new file aayi
        if (req.file && req.file.filename) {

            // 🔥 old file delete
            if (data.resumeLetter) {
                let oldPath = path.join(
                    process.cwd(),
                    "uploads",
                    "resume",
                    data.resumeLetter
                );

                if (fs.existsSync(oldPath)) {
                    fs.unlinkSync(oldPath);
                    console.log("Old resume deleted ✅");
                } else {
                    console.log("Old file not found ❌");
                }
            }

            // ✅ new file set
            obj.resumeLetter = req.file.filename;
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
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.resumeLetter) {
            let filePath = path.join(
                process.cwd(),
                "uploads",
                "resume",
                data.resumeLetter
            );



            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("✅ Image deleted");
            } else {
                console.log("❌ File not found");
            }
        }

        await resumeModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Resume deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            error: error.message
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

    let obj = { ...req.body }

    if (req.file && req.file.filename) {
        obj['internImg'] = req.file.filename;
    }

    let data = await internshipModel.create(obj)

    res.send({
        status: true,
        message: 'Internship details added now..',
        path: process.env.internpath,
        data
    })
}

let viewIntern = async (req, res) => {

    let data = await internshipModel.find()

    res.send({
        status: true,
        path: process.env.internpath,
        data
    })
}

let editIntern = async (req, res) => {
    let { id } = req.params;
    let obj = { ...req.body }

    let data = await internshipModel.findOne({ _id: id });

    if (!data) {
        return res.send({
            status: false,
            message: "Id does not exist..."
        });
    }

    // ✅ NEW IMAGE AAYI TO OLD DELETE KARO
    if (req.file && req.file.filename) {

        // old image delete
        if (data.internImg) {
            fs.unlinkSync(`uploads/internship/${data.internImg}`);
        }

        // new image set
        obj['internImg'] = req.file.filename;
    }

    let ResObj = await internshipModel.updateOne(
        { _id: id },
        { $set: obj }
    );

    res.send({
        status: true,
        message: "intern updated successfully...",
        ResObj
    });

}

let deleteIntern = async (req, res) => {

    try {


        let { id } = req.params;

        let data = await internshipModel.findById(id);



        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.internImg) {
            let filePath = path.join(
                process.cwd(),
                "uploads",
                "internship",
                data.internImg
            );



            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("✅ Image deleted");
            } else {
                console.log("❌ File not found");
            }
        }

        await internshipModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Intern details deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            error: error.message
        });
    }
}


// Internship API Logics...........


let addproject = async (req, res) => {

    let obj = { ...req.body }

    if (req.file && req.file.filename) {
        obj['projectImg'] = req.file.filename;
    }

    let data = await projectModel.create(obj)

    res.send({
        status: true,
        message: 'Project details added now..',
        path: process.env.projectpath,
        data
    })
}

let viewproject = async (req, res) => {

    let data = await projectModel.find()

    res.send({
        status: true,
        path: process.env.projectpath,
        data
    })
}

let editproject = async (req, res) => {
    let { id } = req.params;
    let obj = { ...req.body }

    let data = await projectModel.findOne({ _id: id });

    if (!data) {
        return res.send({
            status: false,
            message: "Id does not exist..."
        });
    }

    // ✅ NEW IMAGE AAYI TO OLD DELETE KARO
    if (req.file && req.file.filename) {

        // old image delete
        if (data.projectImg) {
            fs.unlinkSync(`uploads/project/${data.projectImg}`);
        }

        // new image set
        obj['projectImg'] = req.file.filename;
    }

    let ResObj = await projectModel.updateOne(
        { _id: id },
        { $set: obj }
    );

    res.send({
        status: true,
        message: "intern updated successfully...",
        ResObj
    });

}

let deleteproject = async (req, res) => {

    try {


        let { id } = req.params;

        let data = await projectModel.findById(id);



        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.projectImg) {
            let filePath = path.join(
                process.cwd(),
                "uploads",
                "project",
                data.projectImg
            );



            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("✅ Image deleted");
            } else {
                console.log("❌ File not found");
            }
        }

        await projectModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Intern details deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.send({
            status: false,
            error: error.message
        });
    }
}


// Certificate API Logics...........


let addCertificate = async (req, res) => {
    try {

        let obj = { ...req.body };

        // ✅ image
        if (req.files?.certificateImg) {
            obj.certificateImg = req.files.certificateImg[0].filename;
        }

        // ✅ pdf
        if (req.files?.certificatePdf) {
            obj.certificatePdf = req.files.certificatePdf[0].filename;
        }

        let data = await certificateModel.create(obj);

        res.send({
            status: true,
            message: "Certificate added successfully",
            path: process.env.certificatepath,
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

            // old delete
            if (data.certificateImg) {
                let oldImgPath = path.join(
                    process.cwd(),
                    "uploads",
                    "certificate",
                    data.certificateImg
                );

                if (fs.existsSync(oldImgPath)) {
                    fs.unlinkSync(oldImgPath);
                }
            }

            // new set
            obj.certificateImg = req.files.certificateImg[0].filename;
        }

        // 🔥 PDF UPDATE
        if (req.files?.certificatePdf) {

            // old delete
            if (data.certificatePdf) {
                let oldPdfPath = path.join(
                    process.cwd(),
                    "uploads",
                    "certificate",
                    data.certificatePdf
                );

                if (fs.existsSync(oldPdfPath)) {
                    fs.unlinkSync(oldPdfPath);
                }
            }

            // new set
            obj.certificatePdf = req.files.certificatePdf[0].filename;
        }

        // ✅ update DB
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
            return res.send({
                status: false,
                message: "Id not found"
            });
        }

        // 🔥 DELETE IMAGE
        if (data.certificateImg) {
            let imgPath = path.join(
                process.cwd(),
                "uploads",
                "certificate",
                data.certificateImg
            );

            if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
                // console.log("✅ Image deleted");
            }
        }

        // 🔥 DELETE PDF
        if (data.certificatePdf) {
            let pdfPath = path.join(
                process.cwd(),
                "uploads",
                "certificate",
                data.certificatePdf
            );

            if (fs.existsSync(pdfPath)) {
                fs.unlinkSync(pdfPath);
                // console.log("✅ PDF deleted");
            }
        }

        // ✅ DELETE FROM DB
        await certificateModel.deleteOne({ _id: id });

        res.send({
            status: true,
            message: "Certificate deleted successfully"
        });

    } catch (err) {
        console.log(err);
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