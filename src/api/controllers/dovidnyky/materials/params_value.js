const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParamsSchema = new Schema(
    {
        name: String,
        paramId: {type: mongoose.ObjectId, ref: "MaterialsParams"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const MaterialsParamsValue = mongoose.model("MaterialsParamsValue", ParamsSchema, "materials_params_values");

module.exports = {MaterialsParamsValue};
