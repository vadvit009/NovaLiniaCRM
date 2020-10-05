const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_asortument", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdAsortument));

app.get("/prod_asortument/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdAsortument));

app.post("/prod_asortument", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdAsortument));

app.patch("/prod_asortument/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdAsortument));

app.delete("/prod_asortument/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdAsortument));

module.exports = app;
