const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sklad1Schema = new Schema(
  {
    vyazalId: {type: mongoose.ObjectId, ref: "Worker"},
    masterId: {type: mongoose.ObjectId, ref: "Worker"},
    machineId: {type: mongoose.ObjectId, ref: "Machine"},
    dilanka: Number,
    date_prixod: Date,
    date_rozsxodu: Date,

    mishok: {type: mongoose.ObjectId, ref: "Mishku"},
    changesId: {type: mongoose.ObjectId, ref: "Users"},
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

const Sklad1 = mongoose.model("Sklad1", Sklad1Schema, "sklad1");

module.exports = {Sklad1};
