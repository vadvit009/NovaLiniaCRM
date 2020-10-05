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

const PriagaType = mongoose.model("PriagaType", TypeSchema, "priaga_type");

module.exports = {PriagaType};
