const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
    {
        name: String,
        code: String,
        vendorId: {type: mongoose.ObjectId, ref:"PriagaVendor"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const PriagaColor = mongoose.model("PriagaColor", ColorSchema, "priaga_color");

module.exports = {PriagaColor};
