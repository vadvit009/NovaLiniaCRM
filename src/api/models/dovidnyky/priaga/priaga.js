const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriagaSchema = new Schema(
  {
    surovunaId: {type: mongoose.ObjectId, ref: "PriagaSurovuna"},
    typeId: {type: mongoose.ObjectId, ref: "PriagaType"},
    tovtshinaId: {type: mongoose.ObjectId, ref: "PriagaTovtshina"},
    vendorId: {type: mongoose.ObjectId, ref: "PriagaVendor"},
    dilankaRozxodyId: {type: mongoose.ObjectId, ref: "PriagaDilankaRozxody"},
    colorId: {type: mongoose.ObjectId, ref: "PriagaColor"},
    quantity: Number,
    price: Number,
    date_prixod: Date,
    date_rozxodu: Date,
    changesId: {type: mongoose.ObjectId, ref: "Users"},
    deletedAt: Date
  },
  {
    timestamps: true
  }
);

const Priaga = mongoose.model("Priaga", PriagaSchema, "priaga");

module.exports = {Priaga};
