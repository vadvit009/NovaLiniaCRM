const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VendorSchema = new Schema(
    {
        name: String,
        country: String,
        city: String,
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const MaterialsVendor = mongoose.model("MaterialsVendor", VendorSchema, "materials_vendor");

module.exports = {MaterialsVendor};
