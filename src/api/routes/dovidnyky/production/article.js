const {createArticle, patchArticle, getArticle, getArticles} = require("../../../controllers/dovidnyky/production/article");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {deleteHelper,} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_article", verifyUserToken, roleAccess(["String2", "String1"]), getArticles);

app.get("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), getArticle);

app.post("/prod_article", verifyUserToken, roleAccess(["String2", "String1"]), createArticle);

app.patch("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchArticle);

app.delete("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdArticle));

module.exports = app;
