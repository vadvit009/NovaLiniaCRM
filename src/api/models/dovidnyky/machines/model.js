const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModelSchema = new Schema(
    {
        name: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const MachineModel = mongoose.model("MachineModel", ModelSchema, "machine_model");

module.exports = {MachineModel};
