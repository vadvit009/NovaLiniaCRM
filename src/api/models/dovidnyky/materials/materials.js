const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
    {
        name: String,
        price: Number,
        quantity: Number,
        vendorId: {type: mongoose.ObjectId, ref: "MaterialsVendor"},
        typeId: {type: mongoose.ObjectId, ref: "MaterialsType"},
        dilankaId: {type: mongoose.ObjectId, ref: "MaterialsDilankaRozxody"},
        paramsId: {type: mongoose.ObjectId, ref: "MaterialsParams"},
        paramsValueId: {type: mongoose.ObjectId, ref: "MaterialsParamsValue"},
        date_prixod: Date,
        date_rozxodu: Date,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Materials = mongoose.model("Materials", schema, "materials");

module.exports = {Materials};
