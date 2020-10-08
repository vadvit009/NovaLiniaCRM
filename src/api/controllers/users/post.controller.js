const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {Users} = require('../../models/users')

module.exports = {
    login: (req, res) => {
        const {email, password} = req.body;
        const key = crypto.createHash("md5").update(password).digest("hex");
        return Users.findOne({email: email, password: password})
            .then((user) => {
                if (!user) {
                    const token = jwt.sign({user: user}, process.env.SECRET);
                    res.send({user, token});
                } else {
                    res.sendStatus(409)
                }
            })
            .catch((err) => {
                console.log("Err === ", err);
                res.sendStatus(403);
            });
    },

    register: async (req, res) => {
        const {fName, lName, phone, email, password} = req.body;
        const key = crypto.createHash("md5").update(password).digest("hex");
        return await Users.findOne({email: email}).then((user) => {
            if (!user) {
                User.create({
                    fName,
                    lName,
                    phone,
                    email,
                    password: key,
                    role: false,
                })
                    .then((user) => {
                        const token = jwt.sign({user: user}, process.env.SECRET, {
                            expiresIn: "1h",
                        });
                        res.send({token, user});
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(400)
                    });
            } else {
                res.sendStatus(409);
            }
        });
    },

    changePassword: async (req, res) => {
        const {email, password} = req.body;
        const key = crypto.createHash("md5").update(password).digest("hex");
        return await Users.findOne({email: email}, {password: key})
            .then((user) => {
                // jwt.verify()
                res.send("pass changed successfully");
            })
            .catch((err) => res.send(err));
    },

    restorePassword: async (req, res) => {
        const {email} = req.body;
        return await Users.findOne({email: email})
            .then((user) => {
                if (user) {
                    // restorePassword(email);
                    // jwt.sign()
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            })
            .catch((err) => err && res.sendStatus(409));
    },
}
