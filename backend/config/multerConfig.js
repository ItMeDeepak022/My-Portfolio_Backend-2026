
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const upload = (folder) => {

//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {

//             const dir = path.join(process.cwd(), `uploads/${folder}`);

//             // ✅ auto create folder
//             if (!fs.existsSync(dir)) {
//                 fs.mkdirSync(dir, { recursive: true });
//             }

//             cb(null, dir);
//         },

//         filename: (req, file, cb) => {
//             cb(null, Date.now() + "-" + file.originalname);
//         }
//     });

//     return multer({ storage });
// };

// module.exports = upload;

const multer = require("multer");
const fs = require("fs");

const upload = (folder) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            // ✅ Vercel compatible temp path
            const dir = `/tmp/uploads/${folder}`;

            // ✅ folder create if not exist
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        },

        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    });

    return multer({ storage });
};

module.exports = upload;
