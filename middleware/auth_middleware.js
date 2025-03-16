const jwt = require("jsonwebtoken");


const authMiddleware = async (req, res, next) => {
    const token = req.headers?.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Access denied! Unauthorized user",
            success: false
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.AUTH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
        return res.status(500).json({
            message: "Internal Server Error in auth token",
            success: false
        });
    }
}

module.exports = authMiddleware;