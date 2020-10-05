const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_article", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdArticle));

app.get("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdArticle));

app.post("/prod_article", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdArticle));

app.patch("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdArticle));

app.delete("/prod_article/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdArticle));

module.exports = app;
