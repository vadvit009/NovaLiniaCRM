const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema(
    {
        name: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const ProdType = mongoose.model("ProdType", TypeSchema, "prod_type");

module.exports = {ProdType};
