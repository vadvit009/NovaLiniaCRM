const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        fatherName: String,
        role: String,
        email: String,
        password: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Users = mongoose.model("Users", UserSchema, "users");

module.exports = {Users};
