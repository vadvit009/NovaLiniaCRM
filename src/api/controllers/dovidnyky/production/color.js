const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ColorSchema = new Schema(
    {
        name: String,
        code: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const ProdColor = mongoose.model("ProdColor", ColorSchema, "prod_color");

module.exports = {ProdColor};
