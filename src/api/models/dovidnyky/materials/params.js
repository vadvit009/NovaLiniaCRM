const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParamsSchema = new Schema(
    {
        name: String,
        typeId: {type: mongoose.ObjectId, ref: "MaterialsType"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const MaterialsParams = mongoose.model("MaterialsParams", ParamsSchema, "materials_params");

module.exports = {MaterialsParams};
