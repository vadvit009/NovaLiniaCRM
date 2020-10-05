const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/operations", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Operations.Operations));

app.get("/operations/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Operations.Operations));

app.post("/operations", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Operations.Operations));

app.patch("/operations/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Operations.Operations));

app.delete("/operations/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Operations.Operations));

module.exports = app;
