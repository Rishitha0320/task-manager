// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied!" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token!" });
//   }
// };
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access Denied! No Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user info to request
        next();  // Continue to the next middleware
    } catch (err) {
        return res.status(403).json({ error: "Invalid token!" });
    }
};

module.exports = verifyToken;
