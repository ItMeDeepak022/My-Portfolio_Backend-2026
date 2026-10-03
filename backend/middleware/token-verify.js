const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {

        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.tokenKey
        );

        req.user = decoded;

        next();

    }
    // catch (error) {
    //     return res.status(401).json({
    //         success: false,
    //         message: "Invalid Token "
    //     });
    // }
    catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: false,
                message: "Token has expired. Please login again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: false,
                message: "Invalid token.",
            });
        }

        return res.status(401).json({
            status: false,
            message: "Authentication failed." || error,
        });
    }
};

module.exports = verifyToken;