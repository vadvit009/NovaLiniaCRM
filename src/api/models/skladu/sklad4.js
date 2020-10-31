const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad4Schema = new Schema(
    {
        packId: {type: mongoose.ObjectId, ref: "Machine"},
        date_prixod: Date,
        date_rozsxodu: Date,
        dilanka: Number,

        mishokId: {type: mongoose.ObjectId, ref: "Mishku"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Sklad4 = mongoose.model("Sklad4", Sklad4Schema, "sklad4");

module.exports = {Sklad4};
