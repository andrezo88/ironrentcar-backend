const jwt = require('jsonwebtoken');
const User = require("../models/User");

const authorization = (req, res, next) => {
    const token = req.get("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Request without token" });
    }

    const tokenWithoutBearer = token.split(" ")[1];
    try {
        const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT);
        req.user = { ...decodedToken }
        const findUser = User.findById(req.user.id);
        req.user.adm = findUser.adm;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized", error: error.message });
    }
}

module.exports = authorization;