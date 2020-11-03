const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad4Schema = new Schema(
  {
    packId: {type: mongoose.ObjectId, ref: "Worker"},
    date_prixod: Date,
    date_rozsxodu: Date,
    dilanka: Number,

    mishok: {type: mongoose.ObjectId, ref: "Mishku"},
    skladId: {type: mongoose.ObjectId},
    changesId: {type: mongoose.ObjectId, ref: "Users"},
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

const Sklad4 = mongoose.model("Sklad4", Sklad4Schema, "sklad4");

module.exports = {Sklad4};
