const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkerSchema = new Schema(
    {
        fName: String,
        fatherName: String,
        sName: String,
        status: String,
        operationId: [{type: mongoose.ObjectId, ref: "Operations"}],
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Worker = mongoose.model("Worker", WorkerSchema, "workers");

module.exports = {Worker};
