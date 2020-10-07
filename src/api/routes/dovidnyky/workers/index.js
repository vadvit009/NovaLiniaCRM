const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, createHelper, deleteHelper, patchHelper} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/workers", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Workers.Worker));

app.get("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Workers.Worker));
//TODO controller for workers
app.post("/workers", verifyUserToken, roleAccess(["String2", "String1"]), createHelper(Dovidnyky.Workers.Worker));

app.patch("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchHelper(Dovidnyky.Workers.Worker));

app.delete("/workers/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Workers.Worker));

module.exports = app;
