const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad3Schema = new Schema(
    {
        formId: {type: mongoose.ObjectId, ref: "Machine"},
        date_prixod: Date,
        date_rozsxodu: Date,

        mishokId: {type: mongoose.ObjectId, ref: "Mishku"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Sklad3 = mongoose.model("Sklad3", Sklad3Schema, "sklad3");

module.exports = {Sklad3};
