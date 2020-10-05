const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_class", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdClass));

app.get("/prod_class/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdClass));

app.post("/prod_class", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdClass));

app.patch("/prod_class/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdClass));

app.delete("/prod_class/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdClass));

module.exports = app;
