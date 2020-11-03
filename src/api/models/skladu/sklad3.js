const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad3Schema = new Schema(
  {
    formId: {type: mongoose.ObjectId, ref: "Worker"},
    date_prixod: Date,
    date_rozsxodu: Date,
    dilanka: Number,
    skladId: {type: mongoose.ObjectId},

    mishok: {type: mongoose.ObjectId, ref: "Mishku"},
    changesId: {type: mongoose.ObjectId, ref: "Users"},
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

const Sklad3 = mongoose.model("Sklad3", Sklad3Schema, "sklad3");

module.exports = {Sklad3};
