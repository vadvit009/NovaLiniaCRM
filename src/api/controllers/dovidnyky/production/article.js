const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        name: String,
        status: String,
        typeId: {type: mongoose.ObjectId, ref: "ProdType"},
        asortumentId: {type: mongoose.ObjectId, ref: "ProdAsortument"},
        imageId: {type: mongoose.ObjectId, ref: "ProdImage"},
        colorId: {type: mongoose.ObjectId, ref: "ProdColor"},
        sizeId: {type: mongoose.ObjectId, ref: "ProdSize"},
        classId: {type: mongoose.ObjectId, ref: "ProdClass"},
        articleId: {type: mongoose.ObjectId, ref: "ProdArticle"},
        seasonId: {type: mongoose.ObjectId, ref: "ProdSeason"},
        changesId: {type: mongoose.ObjectId, ref: "Users"},
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const ProdArticle = mongoose.model("ProdArticle", ArticleSchema, "prod_article");

module.exports = {ProdArticle};
