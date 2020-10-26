const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoztsinkaSchema = new Schema(
    {
        startDate: Date,
        endDate: Date,
        price: Number,
        name: String,
        gatynok1: Number,
        gatynok2: Number,
        gatynok3: Number,
        operationId: {type: mongoose.ObjectId, ref: "Operations"},
        machineId: {type: mongoose.ObjectId, ref: "Machine"},
        typeId: {type: mongoose.ObjectId, ref: "ProdType"},
        colorId: {type: mongoose.ObjectId, ref: "ProdColor"},
        asortument: {type: mongoose.ObjectId, ref: "ProdAsortument"},
        classId: {type: mongoose.ObjectId, ref: "ProdClass"},
        seasonId: {type: mongoose.ObjectId, ref: "ProdSeason"},
        imageId: {type: mongoose.ObjectId, ref: "ProdImage"},
        sizeId: {type: mongoose.ObjectId, ref: "ProdSize"},
        articleId: {type: mongoose.ObjectId, ref: "ProdArticle"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Roztsinka = mongoose.model("Roztsinka", RoztsinkaSchema, "prod_roztsinka");

module.exports = {Roztsinka};
