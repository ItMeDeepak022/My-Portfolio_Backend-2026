const multer = require("multer");
const fs = require("fs");
const path = require("path");

const upload = (folder) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {

            // ✅ Render friendly path
            const dir = path.join(process.cwd(), `uploads/${folder}`);

            // ✅ create folder if not exist
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