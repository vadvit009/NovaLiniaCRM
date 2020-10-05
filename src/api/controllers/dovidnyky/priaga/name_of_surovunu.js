const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurovunaSchema = new Schema(
    {
        name: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const PriagaSurovuna = mongoose.model("PriagaSurovuna", SurovunaSchema, "priaga_name_surovunu");

module.exports = {PriagaSurovuna};
