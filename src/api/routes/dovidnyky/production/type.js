const app = require("express").Router();
const {Dovidnyky: {Production: {ProdType}}} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/prod_type", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(ProdType));

app.get("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(ProdType));

app.post("/prod_type", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(ProdType));

app.patch("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(ProdType));

app.delete("/prod_type/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(ProdType));

module.exports = app;
