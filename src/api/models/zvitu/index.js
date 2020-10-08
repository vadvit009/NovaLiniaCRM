const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ZvituSchema = new Schema(
    {
        operationId: {type: mongoose.ObjectId, ref: "Operations"},
        workerId: {type: mongoose.ObjectId, ref: "Worker"},
        gatynok1: Number,
        gatynok2: Number,
        gatynok3: Number,
        date_rozxodu: Date,
        date_prixodu: Date,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Zvitu = mongoose.model("Zvitu", ZvituSchema, "zvitu");

module.exports = {Zvitu};
