const jwt = require("jsonwebtoken");

const verifyCookieToken = (req, res, next) => {
    const token = req.cookies.token;
    console.log("Cookie Atoken === ", token);

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        console.error("DECODED === ", decoded);
        if (err) {
            console.error("ERROR WITH TOKEN === ", err);
            return res.sendStatus(403);
        }
        req.body.user = decoded.user;
        next();
    });
};

const verifyUserToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }
        req.body.user = decoded.user;
        next()
    });
};

module.exports = {
    verifyCookieToken,
    verifyUserToken
};
