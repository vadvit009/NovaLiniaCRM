const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MishkuSchema = new Schema(
    {
        gatynok1: Number,
        gatynok2: Number,
        gatynok3: Number,
        barcode: Number,
        typeId: {type: mongoose.ObjectId, ref: "ProdType"},
        asortumentId: {type: mongoose.ObjectId, ref: "ProdAsortument"},
        imageId: {type: mongoose.ObjectId, ref: "ProdImage"},
        colorId: {type: mongoose.ObjectId, ref: "ProdColor"},
        sizeId: {type: mongoose.ObjectId, ref: "ProdSize"},
        classId: {type: mongoose.ObjectId, ref: "ProdClass"},
        articleId: {type: mongoose.ObjectId, ref: "ProdArticle"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Mishku = mongoose.model("Mishku", MishkuSchema, "bag");

module.exports = {Mishku};
