const {patchMachine, createMachine} = require("../../../controllers/dovidnyky/machines/machines");
const app = require("express").Router();
const {Dovidnyky} = require('../../../models')
const {
    verifyUserToken
} = require("../../../middleware/jwtAuth");

const {readHelper, readByIdHelper, deleteHelper,} = require('../../../utils/CRUDhelper');
const {roleAccess} = require('../../../utils/RoleHelper');

app.get("/machines", verifyUserToken, roleAccess(["String2", "String1"]), readHelper(Dovidnyky.Machines.Machine));

app.get("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]), readByIdHelper(Dovidnyky.Machines.Machine));

app.post("/machines", verifyUserToken, roleAccess(["String2", "String1"]), createMachine);

app.patch("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]), patchMachine);

app.delete("/machines/:id", verifyUserToken, roleAccess(["String2", "String1"]), deleteHelper(Dovidnyky.Machines.Machine));

module.exports = app;
