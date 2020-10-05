const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_type", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdType));

app.get("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdType));

app.post("/prod_type", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdType));

app.patch("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdType));

app.delete("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdType));

module.exports = app;
