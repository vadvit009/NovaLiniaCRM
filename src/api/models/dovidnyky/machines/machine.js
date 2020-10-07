const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MachineSchema = new Schema(
    {
        name: String,
        modelId: {type: mongoose.ObjectId, ref: "MachineModel"},
        golkuId: {type: mongoose.ObjectId, ref: "MachineGolku"},
        duymuId: {type: mongoose.ObjectId, ref: "MachineDuymu"},
        vyazalniId: {type: mongoose.ObjectId, ref: "MachineVyazalni"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Machine = mongoose.model("Machine", MachineSchema, "machine");

module.exports = {Machine};
