const jwt = require("jsonwebtoken");

const auth = (request, response, next) => {
    try {
        const authHeader = request.headers["authorization"]; // Bearer <token>
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) return response.status(401).send({ msg: "Please login first" });
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return response.status(401).send({ msg: "Invalid token" });
            request.user = user;
            next();
        });
    } catch (error) {
        return response.status(500).send({ msg: error.message });
    }

};
module.exports = auth;