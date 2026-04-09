// const multer = require("multer")

// const upload = (folder) => {

//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, `uploads/${folder}`)
//         },

//         filename: (req, file, cb) => {
//             cb(null, Date.now() + "-" + file.originalname)
//         }
//     })

//     return multer({storage:storage})
// }

// module.exports = upload


const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = (folder) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            const dir = path.join(process.cwd(), `uploads/${folder}`);

            // ✅ auto create folder
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        },

        filename: (req, file, cb) => {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

    return multer({ storage });
};

module.exports = upload;