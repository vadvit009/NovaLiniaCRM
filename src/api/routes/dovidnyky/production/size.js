const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_size", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdSize));

app.get("/prod_size/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdSize));

app.post("/prod_size", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdSize));

app.patch("/prod_size/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdSize));

app.delete("/prod_size/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdSize));

module.exports = app;
