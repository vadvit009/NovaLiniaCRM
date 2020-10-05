const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad2Schema = new Schema(
    {
        shveyaId: {type: mongoose.ObjectId, ref: "Workers"},
        sortId: {type: mongoose.ObjectId, ref: "Machine"},
        date_prizod: Date,
        date_rozsxodu: Date,

        mishokId: {type: mongoose.ObjectId, ref: "Mishku"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Sklad2 = mongoose.model("Sklad2", Sklad2Schema, "sklad2");

module.exports = {Sklad2};
