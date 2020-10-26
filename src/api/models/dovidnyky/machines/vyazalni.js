const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VyazalniSchema = new Schema(
    {
        name: String,
        number: Number,
        status: {type: String, enum: ['work', 'stop'], default: 'work'},
        modelId: {type: mongoose.ObjectId, ref: "MachineModel"},
        duymyId: {type: mongoose.ObjectId, ref: "MachineDuymu"},
        golkuId: {type: mongoose.ObjectId, ref: "MachineGolku"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const MachineVyazalni = mongoose.model("MachineVyazalni", VyazalniSchema, "machine_vyazalni");

module.exports = {MachineVyazalni};
