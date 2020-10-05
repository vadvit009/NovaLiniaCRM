const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_color", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Production.ProdColor));

app.get("/prod_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Production.ProdColor));

app.post("/prod_color", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Production.ProdColor));

app.patch("/prod_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Production.ProdColor));

app.delete("/prod_color/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Production.ProdColor));

module.exports = app;
