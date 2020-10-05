const {ProdRoztsinka} = require("../../roztsinka");
const {ProdArticle} = require("./article");
const {ProdSize} = require("./size");
const {ProdImage} = require("./image");
const {ProdSeason} = require("./season");
const {ProdClass} = require("./class");
const {ProdType} = require('./type');
const {ProdColor} = require('./color');
const {ProdAsortument} = require('./asortument');

module.exports = {
    ProdType,
    ProdColor,
    ProdAsortument,
    ProdClass,
    ProdSeason,
    ProdImage,
    ProdSize,
    ProdArticle,
    ProdRoztsinka
};
