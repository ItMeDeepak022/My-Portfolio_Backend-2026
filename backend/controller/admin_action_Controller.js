//  1. Profiles API Logics
const cloudinary = require("../config/cloudinary");
const { set } = require("mongoose")

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
            if (req.file.path) {
                obj['profileImg'] = req.file.path      // ✅ URL
                obj['public_id'] = req.file.filename   // ✅ for delete/update
            }
        }

        let Resobj = await profileModel.create(obj)

        res.send({
            status: true,
            message: "Profile successfully added...",
            data: Resobj
        })

    }
    catch (err) {
        res.send({
            status: false,
            message: "error found",
            error: err
        })
    }
}

let editProfile = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await profileModel.findById(id);

        if (!data) {
            return res.send({
                status: false,
                message: "Id does not exist..."
            });
        }

        // 🔥 NEW FILE AAYI TO OLD DELETE KARO
        if (req.file) {

            // ✅ Cloudinary se old delete
            if (data.public_id) {
                await cloudinary.uploader.destroy(data.public_id);
            }

            // ✅ new file set
            obj.profileImg = req.file.path;       // URL
            obj.public_id = req.file.filename;    // public_id
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

    } catch (err) {
        console.log("ERROR:", err);

        res.status(500).send({
            status: false,
            message: err.message
        });
    }
};


let viewProfile = async (req, res) => {

    let data = await profileModel.find()

    res.send({
        status: true,
        message: "Profile data fetched...",
        // path: process.env.profilepath,
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

        // 🔥 Cloudinary se delete
        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id);
        }

        // 🔥 DB se delete
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

// Resume API  logics for PDF files

let addResume = async (req, res) => {
    try {
        let obj = { ...req.body };

        if (req.file) {
            obj.resumeLetter = req.file.path;

            // 🔥 public_id fix
            obj.public_id = req.file.filename.split(".")[0];
        }

        let data = await resumeModel.create(obj);

        res.send({
            status: true,
            message: "Resume added successfully",
            data
        });

    } catch (err) {
        res.send({
            status: false,
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

        // ✅ agar new file aayi
        if (req.file) {

            // 🔥 old resume delete from Cloudinary
            if (data.public_id) {
                await cloudinary.uploader.destroy(data.public_id);
            }

            // ✅ new file set
            obj.resumeLetter = req.file.path;     // ✅ URL
            obj.public_id = req.file.filename;    // ✅ public_id
        }

        let updated = await resumeModel.findByIdAndUpdate(
            id,
            obj,
            { new: true }
        );

        res.send({
            status: true,
            message: "Resume updated successfully",
            data: updated
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
};

let deleteResume = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await resumeModel.findById(id);

        if (!data) {
            return res.send({ status: false, message: "Id not found" });
        }

        if (data.public_id) {
            // ✅ THIS IS THE FIX: 
            // Cloudinary treats PDFs as "image" type. 
            // "raw" is only for zip, txt, docx etc.
            const result = await cloudinary.uploader.destroy(data.public_id, {
                resource_type: "image"
            });

            console.log("Cloudinary Result:", result);
            // Result should now say { result: 'ok' }
        }

        await resumeModel.findByIdAndDelete(id);

        res.send({
            status: true,
            message: "Resume Deleted successfully"
        });

    } catch (error) {
        res.send({ status: false, error: error.message });
    }
};

let viewResume = async (req, res) => {

    let data = await resumeModel.find()

    res.send({
        status: true,
        message: "Resume data fetched...",
        data
    })
}



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
    try {
        let obj = { ...req.body };

        if (req.file) {
            obj.internImg = req.file.path;       // ✅ URL
            obj.public_id = req.file.filename;  // ✅ for delete/update
        }

        let data = await internshipModel.create(obj);

        res.send({
            status: true,
            message: 'Internship details added...',
            data
        });

    } catch (err) {
        res.send({
            status: false,
            error: err.message
        });
    }
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
            return res.send({
                status: false,
                message: "Id does not exist..."
            });
        }

        // ✅ new file aayi to old delete
        if (req.file) {

            if (data.public_id) {
                await cloudinary.uploader.destroy(data.public_id);
            }

            obj.internImg = req.file.path;      // ✅ URL
            obj.public_id = req.file.filename; // ✅ public_id
        }

        let updated = await internshipModel.updateOne({ _id: id },

            { $set: obj }
        );

        res.send({
            status: true,
            message: "Intern updated successfully...",
            updated
        });

    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
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

        // 🔥 Cloudinary delete
        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id);
        }

        await internshipModel.deleteOne(id);

        res.send({
            status: true,
            message: "Intern deleted successfully"
        });

    } catch (error) {
        res.send({
            status: false,
            error: error.message
        });
    }
};


// Internship API Logics...........


let addproject = async (req, res) => {

    let obj = { ...req.body }


    if (req.file) {
        obj.projectImg = req.file.path;       // ✅ URL
        obj.public_id = req.file.filename;  // ✅ for delete/update
    }

    let data = await projectModel.create(obj)

    res.send({
        status: true,
        message: 'Project details added now..',
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
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await projectModel.findOne({ _id: id });

        if (!data) {
            return res.send({
                status: false,
                message: "Id does not exist..."
            });
        }



        // ✅ new file aayi to old delete
        if (req.file) {

            if (data.public_id) {
                await cloudinary.uploader.destroy(data.public_id);
            }

            obj.projectImg = req.file.path;      // ✅ URL
            obj.public_id = req.file.filename; // ✅ public_id
        }


        let ResObj = await projectModel.updateOne(
            { _id: id },
            { $set: obj }
        );

        res.send({
            status: true,
            message: "project updated successfully...",
            ResObj
        });

    } catch (err) {
        console.log("ERROR:", err);

        res.status(500).send({
            status: false,
            message: err.message
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

        // 🔥 Cloudinary delete
        if (data.public_id) {
            await cloudinary.uploader.destroy(data.public_id);
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




        // ✅ Get Image URL from Cloudinary
        if (req.files?.certificateImg) {
            obj.certificateImg = req.files.certificateImg[0].path;

            // Also store public_id if you want to delete it later
            obj.publicImg_id = req.files.certificateImg[0].filename;
        }


        // ✅ Get PDF URL from Cloudinary
        if (req.files?.certificatePdf) {
            obj.certificatePdf = req.files.certificatePdf[0].path;

            // Also store public_id if you want to delete it later
            obj.publicPdf_id = req.files.certificatePdf[0].filename;
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
        message: "certificated data founds..",
        data
    })
}



let editCertificate = async (req, res) => {
    try {
        let { id } = req.params;
        let obj = { ...req.body };

        let data = await certificateModel.findOne({_id:id});
        if (!data) {
            return res.send({ status: false, message: "Id does not exist..." });
        }



        // 🔥 IMAGE UPDATE
        if (req.files?.certificateImg) {
            // Delete old image from Cloudinary
            if (data.publicImg_id) {
                await cloudinary.uploader.destroy(data.publicImg_id);
            }
            // Set new Cloudinary path and ID
            obj.certificateImg = req.files.certificateImg[0].path;
            obj.publicImg_id = req.files.certificateImg[0].filename;
        }

        // 🔥 PDF UPDATE
        if (req.files?.certificatePdf) {
            // Delete old PDF from Cloudinary
            if (data.publicPdf_id) {
                await cloudinary.uploader.destroy(data.publicPdf_id, {
                    resource_type: "image" // Required for PDFs
                });
            }
            // Set new Cloudinary path and ID
            obj.certificatePdf = req.files.certificatePdf[0].path;
            obj.publicPdf_id = req.files.certificatePdf[0].filename;
        }

        let ResObj = await certificateModel.updateOne({ _id: id },
            { $set: obj }
        );

        res.send({
            status: true,
            message: "Certificate updated successfully...",
            ResObj
        });

    } catch (err) {
        res.send({ status: false, error: err.message });
    }
};


let deleteCertificate = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await certificateModel.findById(id);
        // console.log(data);

        if (!data) {
            return res.send({ status: true, message: "Id not found" });
        }

        // 🔥 DELETE IMAGE FROM CLOUDINARY
        if (data.publicImg_id) {
            await cloudinary.uploader.destroy(data.publicImg_id);
        }

        // 🔥 DELETE PDF FROM CLOUDINARY
        if (data.publicPdf_id) {
            await cloudinary.uploader.destroy(data.publicPdf_id, {
                resource_type: "image" // Because Cloudinary stores PDFs here
            });
        }

        // ✅ DELETE FROM DB
        await certificateModel.deleteOne({_id:id});

        res.send({
            status: true,
            message: "Certificate  deleted successfully"
        });

    } catch (err) {
        res.send({ status: false, error: err.message });
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