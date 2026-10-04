const jwt = require("jsonwebtoken");
const authModel = require("../model/auth.model");

const verifyToken = async (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.includes(" ")) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        const token = authHeader.split(" ")[1];

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

        // Important check
        const user = await authModel.findById(decoded.userId);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        // logout from all devices check
        const isLogoutRoute = req.originalUrl?.includes("logout-all-devices") || req.baseUrl?.includes("logout-all-devices") || req.path?.includes("logout-all-devices");

        if (!isLogoutRoute) {
            if (decoded.tokenVersion !== undefined) {
                const dbVersion = user.tokenVersion || 0;
                if (decoded.tokenVersion !== dbVersion) {
                    return res.status(401).json({
                        status: false,
                        message: "Session expired. Please login again."
                    });
                }
            }
        }

        req.user = decoded;
        req.userId = decoded.userId;
        next();


    }
    catch (error) {
        console.error("verifyToken error:", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                status: false,
                message: "Token has expired. Please login again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                status: false,
                message: "Invalid token: " + error.message,
            });
        }

        return res.status(401).json({
            status: false,
            message: "Authentication failed: " + (error.message || error),
        });
    }
};

module.exports = verifyToken;