const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OperationSchema = new Schema(
    {
        name: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Operations = mongoose.model("Operations", OperationSchema, "prodColor");

module.exports = {Operations};
